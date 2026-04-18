/* 命令验证引擎 - Linux命令学习页面 */

class CommandValidator {
    constructor(fileSystem = null) {
        this.fs = fileSystem;
        
        this.commandAliases = {
            'ls': ['ls', 'dir'],
            'pwd': ['pwd'],
            'cd': ['cd'],
            'mkdir': ['mkdir'],
            'touch': ['touch'],
            'cat': ['cat'],
            'rm': ['rm'],
            'rmdir': ['rmdir'],
            'cp': ['cp'],
            'mv': ['mv'],
            'grep': ['grep'],
            'chmod': ['chmod'],
            'find': ['find'],
            'whereis': ['whereis'],
            'head': ['head'],
            'tail': ['tail'],
            'more': ['more'],
            'less': ['less'],
            'tar': ['tar'],
            'gzip': ['gzip'],
            'bzip2': ['bzip2'],
            'git': ['git'],
            'docker': ['docker'],
            'vim': ['vim', 'vi'],
            'vi': ['vim', 'vi'],
            'systemctl': ['systemctl'],
            'journalctl': ['journalctl']
        };

        this.optionAliases = {
            'ls': {
                '-a': ['-a', '--all'],
                '-l': ['-l', '--format=long'],
                '-h': ['-h', '--human-readable']
            },
            'grep': {
                '-i': ['-i', '--ignore-case'],
                '-n': ['-n', '--line-number'],
                '-r': ['-r', '-R', '--recursive']
            },
            'head': {
                '-n': ['-n', '--lines']
            },
            'tail': {
                '-n': ['-n', '--lines'],
                '-f': ['-f', '--follow']
            },
            'tar': {
                '-c': ['-c', '--create'],
                '-x': ['-x', '--extract'],
                '-v': ['-v', '--verbose'],
                '-f': ['-f', '--file'],
                '-z': ['-z', '--gzip'],
                '-j': ['-j', '--bzip2']
            },
            'chmod': {
                '-R': ['-R', '--recursive']
            },
            'find': {
                '-name': ['-name'],
                '-type': ['-type']
            }
        };
    }

    parseCommand(input) {
        const parts = input.trim().split(/\s+/);
        const command = parts[0];
        const options = [];
        const args = [];

        for (let i = 1; i < parts.length; i++) {
            const part = parts[i];
            if (part.startsWith('-')) {
                options.push(part);
            } else {
                args.push(part);
            }
        }

        return {
            command: command,
            options: options,
            args: args,
            raw: input
        };
    }

    validate(userInput, validationRule, context = {}) {
        const parsed = this.parseCommand(userInput);
        const currentPath = context.currentPath || '/home/user';
        const fs = context.fileSystem || this.fs;

        if (validationRule.requiredPath) {
            const normalizedRequired = this.normalizePath(validationRule.requiredPath);
            const normalizedCurrent = this.normalizePath(currentPath);
            if (normalizedCurrent !== normalizedRequired) {
                return {
                    success: false,
                    message: `请在正确的目录下执行此命令。\n当前目录: ${currentPath}\n需要目录: ${validationRule.requiredPath}`,
                    hint: `先使用 cd ${validationRule.requiredPath} 切换到目标目录`
                };
            }
        }

        if (fs && validationRule.args && validationRule.args.length > 0) {
            for (const arg of validationRule.args) {
                if (arg.startsWith('/') || arg.startsWith('~') || arg === '..' || arg === '.') continue;
                if (arg.includes('*')) continue;
                if (arg.match(/^\d+$/)) continue;
                if (arg.match(/^[a-zA-Z0-9_\-\.]+$/)) {
                    const resolvedPath = this.resolveArgPath(arg, currentPath);
                    if (!fs.exists(resolvedPath)) {
                        const shouldExist = validationRule.checkExists !== false;
                        if (shouldExist && validationRule.type !== 'contains') {
                            return {
                                success: false,
                                message: `文件或目录 '${arg}' 不存在于当前目录。\n当前目录: ${currentPath}`,
                                hint: `请确认文件路径是否正确，或先创建该文件/目录`
                            };
                        }
                    }
                }
            }
        }

        const smartValidation = this.smartValidate(parsed, validationRule, context);
        if (smartValidation) {
            return smartValidation;
        }

        switch (validationRule.type) {
            case 'exact':
                return this.validateExact(parsed, validationRule);
            case 'contains':
                return this.validateContains(parsed, validationRule);
            case 'command':
                return this.validateCommand(parsed, validationRule);
            case 'options':
                return this.validateOptions(parsed, validationRule);
            case 'args':
                return this.validateArgs(parsed, validationRule);
            default:
                return {
                    success: false,
                    message: '未知的验证类型'
                };
        }
    }

    resolveArgPath(arg, currentPath) {
        if (arg.startsWith('/')) return arg;
        if (arg.startsWith('~')) return '/home/user' + arg.substring(1);
        if (arg === '..') {
            const parts = currentPath.split('/');
            parts.pop();
            return parts.join('/') || '/';
        }
        if (arg === '.') return currentPath;
        return currentPath + '/' + arg;
    }

    normalizePath(path) {
        const parts = path.split('/').filter(p => p);
        const result = [];
        for (const part of parts) {
            if (part === '..') {
                result.pop();
            } else if (part !== '.') {
                result.push(part);
            }
        }
        return '/' + result.join('/');
    }

    setFileSystem(fs) {
        this.fs = fs;
    }

    smartValidate(parsed, rule, context = {}) {
        const currentPath = context.currentPath || '/home/user';
        const fs = context.fileSystem || this.fs;
        
        if (parsed.command !== rule.command) {
            return null;
        }

        if (rule.command === 'pwd') {
            return {
                success: true,
                message: '命令正确！'
            };
        }

        if (rule.command === 'ls') {
            if (rule.options && rule.options.length > 0) {
                const hasOption = this.hasRequiredOptions(parsed.command, parsed.options, rule.options);
                if (hasOption) {
                    return {
                        success: true,
                        message: '命令正确！'
                    };
                }
                return {
                    success: false,
                    message: `缺少必要的选项。\n正确答案：${rule.command} ${rule.options[0]}`,
                    hint: this.getHint(rule.command + ' ' + rule.options[0])
                };
            }
            return {
                success: true,
                message: '命令正确！'
            };
        }

        if (rule.command === 'cd') {
            if (parsed.args.length === 0) {
                return {
                    success: false,
                    message: `缺少必要的参数。\n正确答案：${rule.command} ${rule.args ? rule.args[0] : '路径'}`,
                    hint: this.getHint(rule.command)
                };
            }
            if (rule.args && rule.args.length > 0) {
                const hasArg = this.hasRequiredArgs(parsed.args, rule.args);
                if (hasArg) {
                    return {
                        success: true,
                        message: '命令正确！'
                    };
                }
            } else {
                return {
                    success: true,
                    message: '命令正确！'
                };
            }
        }

        if (rule.command === 'cat' || rule.command === 'more' || rule.command === 'less') {
            if (parsed.args.length === 0) {
                return {
                    success: false,
                    message: `缺少必要的参数。\n正确答案：${rule.command} ${rule.args ? rule.args[0] : '文件名'}`,
                    hint: this.getHint(rule.command)
                };
            }
            if (rule.args && rule.args.length > 0) {
                const hasArg = this.hasRequiredArgs(parsed.args, rule.args);
                if (hasArg) {
                    return {
                        success: true,
                        message: '命令正确！'
                    };
                }
            } else {
                return {
                    success: true,
                    message: '命令正确！'
                };
            }
        }

        if (rule.command === 'head' || rule.command === 'tail') {
            if (rule.options && rule.options.length > 0) {
                const hasOption = this.hasRequiredOptions(parsed.command, parsed.options, rule.options);
                if (!hasOption) {
                    return {
                        success: false,
                        message: `缺少必要的选项。\n正确答案：${rule.command} ${rule.options[0]} ${rule.args ? rule.args[rule.args.length - 1] : ''}`,
                        hint: this.getHint(rule.command)
                    };
                }
            }
            if (parsed.args.length === 0) {
                return {
                    success: false,
                    message: `缺少必要的参数。\n正确答案：${rule.command} ${rule.args ? rule.args.join(' ') : '文件名'}`,
                    hint: this.getHint(rule.command)
                };
            }
            return {
                success: true,
                message: '命令正确！'
            };
        }

        if (rule.command === 'grep') {
            if (parsed.args.length < 2) {
                return {
                    success: false,
                    message: `缺少必要的参数。\n正确答案：${rule.command} 搜索模式 文件名`,
                    hint: this.getHint(rule.command)
                };
            }
            return {
                success: true,
                message: '命令正确！'
            };
        }

        if (rule.command === 'chmod') {
            if (parsed.args.length < 2) {
                return {
                    success: false,
                    message: `缺少必要的参数。\n正确答案：${rule.command} 权限 文件名`,
                    hint: this.getHint(rule.command)
                };
            }
            return {
                success: true,
                message: '命令正确！'
            };
        }

        if (rule.command === 'find') {
            if (parsed.args.length === 0) {
                return {
                    success: false,
                    message: `缺少必要的参数。\n正确答案：${rule.command} 路径`,
                    hint: this.getHint(rule.command)
                };
            }
            return {
                success: true,
                message: '命令正确！'
            };
        }

        if (rule.command === 'mkdir' || rule.command === 'touch' || rule.command === 'rm' || rule.command === 'rmdir') {
            if (parsed.args.length === 0) {
                return {
                    success: false,
                    message: `缺少必要的参数。\n正确答案：${rule.command} ${rule.args ? rule.args[0] : '名称'}`,
                    hint: this.getHint(rule.command)
                };
            }
            if (rule.args && rule.args.length > 0) {
                const hasArg = this.hasRequiredArgs(parsed.args, rule.args);
                if (hasArg) {
                    return {
                        success: true,
                        message: '命令正确！'
                    };
                }
            } else {
                return {
                    success: true,
                    message: '命令正确！'
                };
            }
        }

        if (rule.command === 'cp' || rule.command === 'mv') {
            if (parsed.args.length < 2) {
                return {
                    success: false,
                    message: `缺少必要的参数。\n正确答案：${rule.command} ${rule.args ? rule.args.join(' ') : '源 目标'}`,
                    hint: this.getHint(rule.command)
                };
            }
            return {
                success: true,
                message: '命令正确！'
            };
        }

        if (rule.command === 'tar') {
            if (parsed.args.length === 0) {
                return {
                    success: false,
                    message: `缺少必要的参数。\n正确答案：${rule.command} ${rule.args ? rule.args.join(' ') : '选项 文件名'}`,
                    hint: this.getHint(rule.command)
                };
            }
            return {
                success: true,
                message: '命令正确！'
            };
        }

        return null;
    }

    validateExact(parsed, rule) {
        const expected = this.parseCommand(rule.command);
        const normalizedUser = parsed.raw.trim().toLowerCase();
        const normalizedExpected = expected.raw.trim().toLowerCase();

        if (normalizedUser === normalizedExpected) {
            return {
                success: true,
                message: '命令正确！'
            };
        }

        return {
            success: false,
            message: `命令不正确。\n正确答案：${rule.command}`,
            hint: this.getHint(rule.command)
        };
    }

    validateContains(parsed, rule) {
        if (!this.isCommandValid(parsed.command, rule.command)) {
            return {
                success: false,
                message: `命令不正确。\n正确答案：${rule.command}${rule.options && rule.options.length > 0 ? ' ' + rule.options[0] : ''}${rule.args && rule.args.length > 0 ? ' ' + rule.args.join(' ') : ''}`,
                hint: this.getHint(rule.command)
            };
        }

        return {
            success: true,
            message: '命令正确！'
        };
    }

    validateCommand(parsed, rule) {
        if (!this.isCommandValid(parsed.command, rule.command)) {
            return {
                success: false,
                message: `命令不正确。\n正确答案：${rule.command}`,
                hint: this.getHint(rule.command)
            };
        }

        return {
            success: true,
            message: '命令正确！'
        };
    }

    validateOptions(parsed, rule) {
        if (!this.isCommandValid(parsed.command, rule.command)) {
            return {
                success: false,
                message: `命令不正确。\n正确答案：${rule.command}`,
                hint: this.getHint(rule.command)
            };
        }

        if (rule.options && rule.options.length > 0) {
            const hasRequiredOption = this.hasRequiredOptions(parsed.command, parsed.options, rule.options);
            if (!hasRequiredOption) {
                return {
                    success: false,
                    message: `缺少必要的选项。\n正确答案：${rule.command}`,
                    hint: this.getHint(rule.command)
                };
            }
        }

        return {
            success: true,
            message: '命令正确！'
        };
    }

    validateArgs(parsed, rule) {
        if (!this.isCommandValid(parsed.command, rule.command)) {
            return {
                success: false,
                message: `命令不正确。\n正确答案：${rule.command}`,
                hint: this.getHint(rule.command)
            };
        }

        if (rule.args && rule.args.length > 0) {
            const hasRequiredArgs = this.hasRequiredArgs(parsed.args, rule.args);
            if (!hasRequiredArgs) {
                return {
                    success: false,
                    message: `缺少必要的参数。\n正确答案：${rule.command}`,
                    hint: this.getHint(rule.command)
                };
            }
        }

        return {
            success: true,
            message: '命令正确！'
        };
    }

    isCommandValid(userCommand, expectedCommand) {
        const aliases = this.commandAliases[expectedCommand];
        if (aliases) {
            return aliases.includes(userCommand);
        }
        return userCommand === expectedCommand;
    }

    hasRequiredOptions(command, userOptions, requiredOptions) {
        const aliases = this.optionAliases[command] || {};

        const allAliases = [];
        for (const required of requiredOptions) {
            const optionAliases = aliases[required] || [required];
            allAliases.push(...optionAliases);
        }

        const hasOption = userOptions.some(opt => {
            if (allAliases.includes(opt)) {
                return true;
            }
            for (const required of requiredOptions) {
                if (opt.length > 1 && opt.includes(required)) {
                    return true;
                }
                if (opt === '-' + required.charAt(1) && required.startsWith('-')) {
                    return true;
                }
            }
            return false;
        });

        return hasOption;
    }

    hasRequiredArgs(userArgs, requiredArgs) {
        if (!requiredArgs || requiredArgs.length === 0) {
            return userArgs.length > 0;
        }

        if (!userArgs || userArgs.length === 0) {
            return false;
        }

        for (const required of requiredArgs) {
            const matched = userArgs.some(arg => {
                if (arg === required) return true;
                
                if (required === '~' && (arg === '~' || arg === '/home/user')) return true;
                if (arg === '~' && required === '/home/user') return true;
                
                if (required === '..' && arg === '..') return true;
                
                if (required.startsWith('*')) {
                    const pattern = required.replace(/\*/g, '');
                    return arg.includes(pattern);
                }
                
                if (required.endsWith('.txt') && arg.endsWith('.txt')) return true;
                if (required.endsWith('.log') && arg.endsWith('.log')) return true;
                if (required.endsWith('.tar') && arg.endsWith('.tar')) return true;
                if (required.endsWith('.gz') && arg.endsWith('.gz')) return true;
                
                if (required.includes('/') && arg.includes('/')) {
                    const reqParts = required.split('/');
                    const argParts = arg.split('/');
                    if (argParts[argParts.length - 1] === reqParts[reqParts.length - 1]) return true;
                }
                
                return false;
            });
            
            if (matched) return true;
        }

        return false;
    }

    getHint(command) {
        const hints = {
            'pwd': 'pwd命令显示当前工作目录',
            'ls': 'ls命令列出目录内容',
            'ls -a': '-a选项可以显示隐藏文件（以.开头的文件）',
            'ls -l': '-l选项以长格式显示详细信息',
            'cd': 'cd命令切换目录，..表示上一级目录',
            'cd ..': '..表示上一级目录',
            'mkdir': 'mkdir命令创建目录',
            'touch': 'touch命令创建空文件',
            'cat': 'cat命令显示文件内容',
            'rm': 'rm命令删除文件',
            'rmdir': 'rmdir命令删除空目录',
            'cp': 'cp命令复制文件',
            'mv': 'mv命令移动或重命名文件',
            'grep': 'grep命令搜索文本内容',
            'chmod': 'chmod命令改变文件权限',
            'find': 'find命令查找文件',
            'whereis': 'whereis命令查找命令位置',
            'head': 'head命令显示文件开头',
            'tail': 'tail命令显示文件末尾',
            'tar': 'tar命令打包文件',
            'git': 'git命令用于版本控制',
            'docker': 'docker命令用于容器管理',
            'vim': 'vim是文本编辑器',
            'vi': 'vi是文本编辑器',
            'systemctl': 'systemctl命令管理系统服务',
            'journalctl': 'journalctl命令查看系统日志'
        };

        return hints[command] || '请参考命令手册';
    }

    getEquivalentCommands(command) {
        const parsed = this.parseCommand(command);
        const equivalents = [];

        const aliases = this.commandAliases[parsed.command];
        if (aliases) {
            for (const alias of aliases) {
                if (alias !== parsed.command) {
                    equivalents.push(alias + ' ' + parsed.options.join(' ') + ' ' + parsed.args.join(' '));
                }
            }
        }

        const optionAliases = this.optionAliases[parsed.command] || {};
        for (const option of parsed.options) {
            const aliasesForOption = optionAliases[option];
            if (aliasesForOption) {
                for (const alias of aliasesForOption) {
                    if (alias !== option) {
                        const newOptions = parsed.options.map(o => o === option ? alias : o);
                        equivalents.push(parsed.command + ' ' + newOptions.join(' ') + ' ' + parsed.args.join(' '));
                    }
                }
            }
        }

        return equivalents;
    }

    normalizeCommand(command) {
        const parsed = this.parseCommand(command);
        const normalizedOptions = [];

        for (const option of parsed.options) {
            const aliases = this.optionAliases[parsed.command] || {};
            let normalized = option;

            for (const [key, values] of Object.entries(aliases)) {
                if (values.includes(option)) {
                    normalized = key;
                    break;
                }
            }

            normalizedOptions.push(normalized);
        }

        return {
            command: parsed.command,
            options: normalizedOptions.sort(),
            args: parsed.args,
            normalized: parsed.command + ' ' + normalizedOptions.join(' ') + ' ' + parsed.args.join(' ')
        };
    }

    compareCommands(command1, command2) {
        const normalized1 = this.normalizeCommand(command1);
        const normalized2 = this.normalizeCommand(command2);

        return normalized1.normalized === normalized2.normalized;
    }
}

window.CommandValidator = CommandValidator;
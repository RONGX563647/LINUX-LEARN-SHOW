/* 命令模拟库 - Linux命令学习页面 */

class VirtualFileSystem {
    constructor() {
        this.root = this.createDefaultFileSystem();
        this.currentPath = '/home/user';
        this.history = [];
    }

    createDefaultFileSystem() {
        return {
            '/': {
                type: 'dir',
                permissions: 'drwxr-xr-x',
                children: ['home', 'usr', 'var', 'tmp', 'etc']
            },
            '/home': {
                type: 'dir',
                permissions: 'drwxr-xr-x',
                children: ['user']
            },
            '/home/user': {
                type: 'dir',
                permissions: 'drwxr-xr-x',
                children: ['documents', 'projects', 'logs', '.bashrc', '.profile']
            },
            '/home/user/documents': {
                type: 'dir',
                permissions: 'drwxr-xr-x',
                children: ['readme.txt', 'notes.txt']
            },
            '/home/user/documents/readme.txt': {
                type: 'file',
                permissions: '-rw-r--r--',
                content: '欢迎使用Linux命令学习系统！\n这是一个交互式的学习环境。\n祝你学习愉快！'
            },
            '/home/user/documents/notes.txt': {
                type: 'file',
                permissions: '-rw-r--r--',
                content: '学习笔记：\n1. cd - 切换目录\n2. ls - 列出文件\n3. pwd - 显示当前路径'
            },
            '/home/user/projects': {
                type: 'dir',
                permissions: 'drwxr-xr-x',
                children: ['myapp', 'test']
            },
            '/home/user/projects/myapp': {
                type: 'dir',
                permissions: 'drwxr-xr-x',
                children: ['main.c', 'utils.c', 'Makefile']
            },
            '/home/user/projects/myapp/main.c': {
                type: 'file',
                permissions: '-rw-r--r--',
                content: '#include <stdio.h>\n\nint main() {\n    printf("Hello World!\\n");\n    return 0;\n}'
            },
            '/home/user/projects/myapp/utils.c': {
                type: 'file',
                permissions: '-rw-r--r--',
                content: '#include <stdio.h>\n\nvoid print_message(const char* msg) {\n    printf("%s\\n", msg);\n}'
            },
            '/home/user/projects/myapp/Makefile': {
                type: 'file',
                permissions: '-rw-r--r--',
                content: 'CC=gcc\nCFLAGS=-Wall\n\nall: myapp\n\nmyapp: main.o utils.o\n\t$(CC) $(CFLAGS) -o myapp main.o utils.o\n\nclean:\n\trm -f *.o myapp'
            },
            '/home/user/projects/test': {
                type: 'dir',
                permissions: 'drwxr-xr-x',
                children: ['test.txt']
            },
            '/home/user/projects/test/test.txt': {
                type: 'file',
                permissions: '-rw-r--r--',
                content: '这是一个测试文件\n用于练习Linux命令'
            },
            '/home/user/logs': {
                type: 'dir',
                permissions: 'drwxr-xr-x',
                children: ['app.log', 'error.log', 'system.log']
            },
            '/home/user/logs/app.log': {
                type: 'file',
                permissions: '-rw-r--r--',
                content: '[2026-04-17 10:00:00] INFO: Application started\n[2026-04-17 10:05:00] INFO: User logged in\n[2026-04-17 10:10:00] ERROR: Connection failed\n[2026-04-17 10:15:00] INFO: Retrying connection\n[2026-04-17 10:20:00] INFO: Connection restored\n[2026-04-17 10:25:00] WARNING: Memory usage high\n[2026-04-17 10:30:00] INFO: Application running normally'
            },
            '/home/user/logs/error.log': {
                type: 'file',
                permissions: '-rw-r--r--',
                content: '[2026-04-17 10:10:00] ERROR: Connection failed\n[2026-04-17 10:10:00] ERROR: Timeout waiting for response\n[2026-04-17 10:25:00] ERROR: Memory allocation failed'
            },
            '/home/user/logs/system.log': {
                type: 'file',
                permissions: '-rw-r--r--',
                content: '[2026-04-17 09:00:00] INFO: System boot\n[2026-04-17 09:05:00] INFO: Services started\n[2026-04-17 09:10:00] INFO: Network configured'
            },
            '/home/user/.bashrc': {
                type: 'file',
                permissions: '-rw-r--r--',
                content: '# Bash configuration\nexport PATH=$PATH:/usr/local/bin\nalias ll="ls -la"\nalias l="ls -l"'
            },
            '/home/user/.profile': {
                type: 'file',
                permissions: '-rw-r--r--',
                content: '# User profile\nexport LANG=en_US.UTF-8\nexport EDITOR=vim'
            },
            '/usr': {
                type: 'dir',
                permissions: 'drwxr-xr-x',
                children: ['bin', 'local', 'share']
            },
            '/usr/bin': {
                type: 'dir',
                permissions: 'drwxr-xr-x',
                children: ['ls', 'cd', 'pwd', 'cat', 'grep']
            },
            '/usr/local': {
                type: 'dir',
                permissions: 'drwxr-xr-x',
                children: ['bin', 'src']
            },
            '/usr/share': {
                type: 'dir',
                permissions: 'drwxr-xr-x',
                children: ['doc', 'man']
            },
            '/var': {
                type: 'dir',
                permissions: 'drwxr-xr-x',
                children: ['log', 'tmp']
            },
            '/var/log': {
                type: 'dir',
                permissions: 'drwxr-xr-x',
                children: ['syslog', 'auth.log']
            },
            '/var/log/syslog': {
                type: 'file',
                permissions: '-rw-r-----',
                content: 'System log content...'
            },
            '/var/log/auth.log': {
                type: 'file',
                permissions: '-rw-r-----',
                content: 'Authentication log content...'
            },
            '/var/tmp': {
                type: 'dir',
                permissions: 'drwxrwxrwt',
                children: []
            },
            '/tmp': {
                type: 'dir',
                permissions: 'drwxrwxrwt',
                children: []
            },
            '/etc': {
                type: 'dir',
                permissions: 'drwxr-xr-x',
                children: ['passwd', 'hosts', 'config']
            },
            '/etc/passwd': {
                type: 'file',
                permissions: '-rw-r--r--',
                content: 'root:x:0:0:root:/root:/bin/bash\nuser:x:1000:1000:user:/home/user:/bin/bash'
            },
            '/etc/hosts': {
                type: 'file',
                permissions: '-rw-r--r--',
                content: '127.0.0.1 localhost\n192.168.1.1 server'
            },
            '/etc/config': {
                type: 'file',
                permissions: '-rw-r--r--',
                content: 'Configuration file content...'
            }
        };
    }

    reset() {
        this.root = this.createDefaultFileSystem();
        this.currentPath = '/home/user';
        this.history = [];
    }

    resolvePath(path) {
        if (!path || path === '.') {
            return this.currentPath;
        }

        if (path === '..') {
            const parts = this.currentPath.split('/');
            parts.pop();
            return parts.join('/') || '/';
        }

        if (path === '~') {
            return '/home/user';
        }

        if (path.startsWith('/')) {
            return path;
        }

        if (path.startsWith('~')) {
            return '/home/user' + path.substring(1);
        }

        return this.currentPath + '/' + path;
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

    exists(path) {
        const normalized = this.normalizePath(path);
        return this.root.hasOwnProperty(normalized);
    }

    isDirectory(path) {
        const normalized = this.normalizePath(path);
        const item = this.root[normalized];
        return item && item.type === 'dir';
    }

    isFile(path) {
        const normalized = this.normalizePath(path);
        const item = this.root[normalized];
        return item && item.type === 'file';
    }

    getItem(path) {
        const normalized = this.normalizePath(path);
        return this.root[normalized];
    }

    getChildren(path) {
        const normalized = this.normalizePath(path);
        const item = this.root[normalized];
        if (!item || item.type !== 'dir') {
            return [];
        }
        return item.children || [];
    }

    createDirectory(path) {
        const normalized = this.normalizePath(path);
        const parentPath = normalized.split('/').slice(0, -1).join('/') || '/';
        const dirName = normalized.split('/').pop();

        if (!this.exists(parentPath) || !this.isDirectory(parentPath)) {
            return { success: false, error: `无法创建目录 '${dirName}': 父目录不存在` };
        }

        if (this.exists(normalized)) {
            return { success: false, error: `目录 '${dirName}' 已存在` };
        }

        this.root[normalized] = {
            type: 'dir',
            permissions: 'drwxr-xr-x',
            children: []
        };

        const parent = this.root[parentPath];
        if (!parent.children.includes(dirName)) {
            parent.children.push(dirName);
        }

        return { success: true };
    }

    createFile(path, content = '') {
        const normalized = this.normalizePath(path);
        const parentPath = normalized.split('/').slice(0, -1).join('/') || '/';
        const fileName = normalized.split('/').pop();

        if (!this.exists(parentPath) || !this.isDirectory(parentPath)) {
            return { success: false, error: `无法创建文件 '${fileName}': 父目录不存在` };
        }

        this.root[normalized] = {
            type: 'file',
            permissions: '-rw-r--r--',
            content: content
        };

        const parent = this.root[parentPath];
        if (!parent.children.includes(fileName)) {
            parent.children.push(fileName);
        }

        return { success: true };
    }

    deleteItem(path) {
        const normalized = this.normalizePath(path);
        const parentPath = normalized.split('/').slice(0, -1).join('/') || '/';
        const itemName = normalized.split('/').pop();

        if (!this.exists(normalized)) {
            return { success: false, error: `无法删除 '${itemName}': 不存在` };
        }

        const item = this.root[normalized];
        if (item.type === 'dir' && item.children && item.children.length > 0) {
            return { success: false, error: `无法删除 '${itemName}': 目录不为空` };
        }

        delete this.root[normalized];

        const parent = this.root[parentPath];
        if (parent && parent.children) {
            parent.children = parent.children.filter(c => c !== itemName);
        }

        return { success: true };
    }

    deleteDirectoryRecursive(path) {
        const normalized = this.normalizePath(path);

        if (!this.exists(normalized)) {
            return { success: false, error: `目录不存在` };
        }

        const item = this.root[normalized];
        if (item.type !== 'dir') {
            return { success: false, error: `不是目录` };
        }

        const children = this.getChildren(normalized);
        for (const child of children) {
            const childPath = normalized + '/' + child;
            const childItem = this.getItem(childPath);
            if (childItem.type === 'dir') {
                this.deleteDirectoryRecursive(childPath);
            } else {
                delete this.root[childPath];
            }
        }

        delete this.root[normalized];

        const parentPath = normalized.split('/').slice(0, -1).join('/') || '/';
        const dirName = normalized.split('/').pop();
        const parent = this.root[parentPath];
        if (parent && parent.children) {
            parent.children = parent.children.filter(c => c !== dirName);
        }

        return { success: true };
    }

    copyItem(source, destination) {
        const normalizedSource = this.normalizePath(source);
        const normalizedDest = this.normalizePath(destination);

        if (!this.exists(normalizedSource)) {
            return { success: false, error: `源文件不存在` };
        }

        const sourceItem = this.getItem(normalizedSource);
        const destParent = normalizedDest.split('/').slice(0, -1).join('/') || '/';
        const destName = normalizedDest.split('/').pop();

        if (!this.exists(destParent) || !this.isDirectory(destParent)) {
            return { success: false, error: `目标目录不存在` };
        }

        this.root[normalizedDest] = JSON.parse(JSON.stringify(sourceItem));

        const parent = this.root[destParent];
        if (!parent.children.includes(destName)) {
            parent.children.push(destName);
        }

        return { success: true };
    }

    moveItem(source, destination) {
        const result = this.copyItem(source, destination);
        if (!result.success) {
            return result;
        }

        return this.deleteItem(source);
    }

    changePermissions(path, permissions) {
        const normalized = this.normalizePath(path);

        if (!this.exists(normalized)) {
            return { success: false, error: `文件不存在` };
        }

        this.root[normalized].permissions = permissions;
        return { success: true };
    }

    getFileContent(path) {
        const normalized = this.normalizePath(path);
        const item = this.root[normalized];

        if (!item) {
            return { success: false, error: `文件不存在` };
        }

        if (item.type !== 'file') {
            return { success: false, error: `不是文件` };
        }

        return { success: true, content: item.content };
    }
}

class CommandSimulator {
    constructor(fs) {
        this.fs = fs;
    }

    execute(command) {
        const parts = command.trim().split(/\s+/);
        const cmd = parts[0];
        const args = parts.slice(1);

        if (args.includes('--help') || args.includes('-h')) {
            return this.showHelp(cmd);
        }

        this.fs.history.push(command);

        switch (cmd) {
            case 'ls':
                return this.ls(args);
            case 'pwd':
                return this.pwd(args);
            case 'cd':
                return this.cd(args);
            case 'mkdir':
                return this.mkdir(args);
            case 'touch':
                return this.touch(args);
            case 'cat':
                return this.cat(args);
            case 'rm':
                return this.rm(args);
            case 'rmdir':
                return this.rmdir(args);
            case 'cp':
                return this.cp(args);
            case 'mv':
                return this.mv(args);
            case 'grep':
                return this.grep(args);
            case 'chmod':
                return this.chmod(args);
            case 'find':
                return this.find(args);
            case 'whereis':
                return this.whereis(args);
            case 'head':
                return this.head(args);
            case 'tail':
                return this.tail(args);
            case 'more':
                return this.more(args);
            case 'less':
                return this.less(args);
            case 'tar':
                return this.tar(args);
            case 'gzip':
                return this.gzip(args);
            case 'bzip2':
                return this.bzip2(args);
            case 'clear':
                return this.clear(args);
            case 'help':
                return this.help(args);
            case 'exit':
                return this.exit(args);
            case 'git':
                return this.git(args);
            case 'docker':
                return this.docker(args);
            case 'vim':
            case 'vi':
                return this.vim(args);
            case 'systemctl':
                return this.systemctl(args);
            case 'journalctl':
                return this.journalctl(args);
            case 'npm':
                return this.npm(args);
            case 'node':
                return this.node(args);
            case 'vue':
                return this.vue(args);
            case 'curl':
                return this.curl(args);
            case 'sed':
                return this.sed(args);
            case 'awk':
                return this.awk(args);
            case 'mail':
                return this.mail(args);
            case 'bash':
                return this.bash(args);
            case 'crontab':
                return this.crontab(args);
            case 'echo':
                return this.echo(args);
            case 'export':
                return this.exportCmd(args);
            case 'env':
                return this.env(args);
            case 'ps':
                return this.ps(args);
            case 'top':
                return this.top(args);
            case 'kill':
                return this.kill(args);
            case 'nice':
                return this.nice(args);
            case 'renice':
                return this.renice(args);
            case 'free':
                return this.free(args);
            case 'df':
                return this.df(args);
            case 'du':
                return this.du(args);
            case 'uptime':
                return this.uptime(args);
            case 'netstat':
                return this.netstat(args);
            case 'gcc':
                return this.gcc(args);
            case 'java':
                return this.java(args);
            case 'javac':
                return this.javac(args);
            case 'mvn':
                return this.mvn(args);
            case 'gh':
                return this.gh(args);
            case 'claude':
                return this.claude(args);
            case 'openclaw':
                return this.openclaw(args);
            case 'iostat':
                return this.iostat(args);
            case 'sudo':
                return this.sudo(args);
            case 'last':
                return this.lastCmd(args);
            case 'lastb':
                return this.lastb(args);
            case 'mysqldump':
                return this.mysqldump(args);
            case 'mysql':
                return this.mysql(args);
            case 'gunzip':
                return this.gunzip(args);
            case 'scp':
                return this.scp(args);
            case 'rsync':
                return this.rsync(args);
            default:
                if (cmd.startsWith('./') || cmd.startsWith('/') || cmd.startsWith('~')) {
                    return this.executeScript(cmd, args);
                }
                return {
                    success: false,
                    output: `命令 '${cmd}' 未找到。输入 'help' 查看可用命令。`
                };
        }
    }

    executeScript(scriptPath, args) {
        const scriptName = scriptPath.split('/').pop();
        return {
            success: true,
            output: `执行脚本: ${scriptName}\n参数: ${args.join(' ')}\n\n脚本执行完成。\n输出: 备份已创建于 /backup/backup-${new Date().toISOString().split('T')[0]}.tar.gz`
        };
    }

    ls(args) {
        let path = this.fs.currentPath;
        let showAll = false;
        let longFormat = false;

        for (const arg of args) {
            if (arg === '-a' || arg === '--all') {
                showAll = true;
            } else if (arg === '-l') {
                longFormat = true;
            } else if (arg === '-la' || arg === '-al') {
                showAll = true;
                longFormat = true;
            } else if (!arg.startsWith('-')) {
                path = this.fs.resolvePath(arg);
            }
        }

        const normalized = this.fs.normalizePath(path);

        if (!this.fs.exists(normalized)) {
            return {
                success: false,
                output: `ls: 无法访问 '${path}': 没有那个文件或目录`
            };
        }

        if (!this.fs.isDirectory(normalized)) {
            const item = this.fs.getItem(normalized);
            if (longFormat) {
                return {
                    success: true,
                    output: `${item.permissions} 1 user user ${item.content ? item.content.length : 0} Apr 17 10:00 ${normalized.split('/').pop()}`
                };
            }
            return {
                success: true,
                output: normalized.split('/').pop()
            };
        }

        const children = this.fs.getChildren(normalized);
        let items = children;

        if (!showAll) {
            items = items.filter(item => !item.startsWith('.'));
        }

        if (longFormat) {
            let output = '';
            for (const item of items) {
                const itemPath = normalized + '/' + item;
                const itemData = this.fs.getItem(itemPath);
                if (itemData) {
                    const size = itemData.type === 'file' ? (itemData.content ? itemData.content.length : 0) : 4096;
                    output += `${itemData.permissions} 1 user user ${size} Apr 17 10:00 ${item}\n`;
                }
            }
            return { success: true, output: output.trim() };
        }

        return {
            success: true,
            output: items.join('  ')
        };
    }

    pwd(args) {
        return {
            success: true,
            output: this.fs.currentPath
        };
    }

    cd(args) {
        if (args.length === 0) {
            this.fs.currentPath = '/home/user';
            return { success: true, output: '' };
        }

        const path = args[0];
        const resolved = this.fs.resolvePath(path);
        const normalized = this.fs.normalizePath(resolved);

        if (!this.fs.exists(normalized)) {
            return {
                success: false,
                output: `cd: ${path}: 没有那个文件或目录`
            };
        }

        if (!this.fs.isDirectory(normalized)) {
            return {
                success: false,
                output: `cd: ${path}: 不是目录`
            };
        }

        this.fs.currentPath = normalized;
        return { success: true, output: '' };
    }

    mkdir(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'mkdir: 缺少操作数'
            };
        }

        let createParents = false;
        let dirs = [];

        for (const arg of args) {
            if (arg === '-p') {
                createParents = true;
            } else if (!arg.startsWith('-')) {
                dirs.push(arg);
            }
        }

        if (dirs.length === 0) {
            return {
                success: false,
                output: 'mkdir: 缺少操作数'
            };
        }

        let output = '';
        for (const dir of dirs) {
            const resolved = this.fs.resolvePath(dir);
            const normalized = this.fs.normalizePath(resolved);

            if (createParents) {
                const parts = normalized.split('/').filter(p => p);
                let currentPath = '';
                for (const part of parts) {
                    currentPath += '/' + part;
                    if (!this.fs.exists(currentPath)) {
                        const result = this.fs.createDirectory(currentPath);
                        if (!result.success) {
                            output += result.error + '\n';
                        }
                    }
                }
            } else {
                const result = this.fs.createDirectory(normalized);
                if (!result.success) {
                    output += result.error + '\n';
                }
            }
        }

        return {
            success: output === '',
            output: output.trim()
        };
    }

    touch(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'touch: 缺少文件参数'
            };
        }

        let output = '';
        for (const file of args) {
            if (file.startsWith('-')) continue;

            const resolved = this.fs.resolvePath(file);
            const normalized = this.fs.normalizePath(resolved);

            if (this.fs.exists(normalized)) {
                continue;
            }

            const result = this.fs.createFile(normalized);
            if (!result.success) {
                output += result.error + '\n';
            }
        }

        return {
            success: output === '',
            output: output.trim()
        };
    }

    cat(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'cat: 缺少文件参数'
            };
        }

        let output = '';
        let success = true;

        for (const file of args) {
            if (file.startsWith('-')) continue;

            const resolved = this.fs.resolvePath(file);
            const normalized = this.fs.normalizePath(resolved);

            const result = this.fs.getFileContent(normalized);
            if (!result.success) {
                output += `cat: ${file}: ${result.error}\n`;
                success = false;
            } else {
                output += result.content + '\n';
            }
        }

        return {
            success: success,
            output: output.trim()
        };
    }

    rm(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'rm: 缺少操作数'
            };
        }

        let recursive = false;
        let force = false;
        let files = [];

        for (const arg of args) {
            if (arg === '-r' || arg === '-R') {
                recursive = true;
            } else if (arg === '-f') {
                force = true;
            } else if (arg === '-rf' || arg === '-fr') {
                recursive = true;
                force = true;
            } else if (!arg.startsWith('-')) {
                files.push(arg);
            }
        }

        if (files.length === 0) {
            return {
                success: false,
                output: 'rm: 缺少操作数'
            };
        }

        let output = '';
        for (const file of files) {
            const resolved = this.fs.resolvePath(file);
            const normalized = this.fs.normalizePath(resolved);

            if (!this.fs.exists(normalized)) {
                if (!force) {
                    output += `rm: 无法删除 '${file}': 没有那个文件或目录\n`;
                }
                continue;
            }

            const item = this.fs.getItem(normalized);
            if (item.type === 'dir') {
                if (!recursive) {
                    output += `rm: 无法删除 '${file}': 是一个目录\n`;
                    continue;
                }
                const result = this.fs.deleteDirectoryRecursive(normalized);
                if (!result.success) {
                    output += result.error + '\n';
                }
            } else {
                const result = this.fs.deleteItem(normalized);
                if (!result.success) {
                    output += result.error + '\n';
                }
            }
        }

        return {
            success: output === '',
            output: output.trim()
        };
    }

    rmdir(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'rmdir: 缺少操作数'
            };
        }

        let output = '';
        for (const dir of args) {
            if (dir.startsWith('-')) continue;

            const resolved = this.fs.resolvePath(dir);
            const normalized = this.fs.normalizePath(resolved);

            const result = this.fs.deleteItem(normalized);
            if (!result.success) {
                output += `rmdir: ${dir}: ${result.error}\n`;
            }
        }

        return {
            success: output === '',
            output: output.trim()
        };
    }

    cp(args) {
        if (args.length < 2) {
            return {
                success: false,
                output: 'cp: 缺少目标文件参数'
            };
        }

        let recursive = false;
        let sources = [];
        let destination = args[args.length - 1];

        for (let i = 0; i < args.length - 1; i++) {
            const arg = args[i];
            if (arg === '-r' || arg === '-R') {
                recursive = true;
            } else if (!arg.startsWith('-')) {
                sources.push(arg);
            }
        }

        if (sources.length === 0) {
            return {
                success: false,
                output: 'cp: 缺少源文件参数'
            };
        }

        let output = '';
        for (const source of sources) {
            const resolvedSource = this.fs.resolvePath(source);
            const normalizedSource = this.fs.normalizePath(resolvedSource);

            if (!this.fs.exists(normalizedSource)) {
                output += `cp: 无法统计 '${source}': 没有那个文件或目录\n`;
                continue;
            }

            const sourceItem = this.fs.getItem(normalizedSource);
            if (sourceItem.type === 'dir' && !recursive) {
                output += `cp: -r 未指定; 略过目录 '${source}'\n`;
                continue;
            }

            const resolvedDest = this.fs.resolvePath(destination);
            const normalizedDest = this.fs.normalizePath(resolvedDest);

            let destPath = normalizedDest;
            if (this.fs.isDirectory(normalizedDest)) {
                destPath = normalizedDest + '/' + normalizedSource.split('/').pop();
            }

            const result = this.fs.copyItem(normalizedSource, destPath);
            if (!result.success) {
                output += result.error + '\n';
            }
        }

        return {
            success: output === '',
            output: output.trim()
        };
    }

    mv(args) {
        if (args.length < 2) {
            return {
                success: false,
                output: 'mv: 缺少目标文件参数'
            };
        }

        let sources = [];
        let destination = args[args.length - 1];

        for (let i = 0; i < args.length - 1; i++) {
            const arg = args[i];
            if (!arg.startsWith('-')) {
                sources.push(arg);
            }
        }

        if (sources.length === 0) {
            return {
                success: false,
                output: 'mv: 缺少源文件参数'
            };
        }

        let output = '';
        for (const source of sources) {
            const resolvedSource = this.fs.resolvePath(source);
            const normalizedSource = this.fs.normalizePath(resolvedSource);

            if (!this.fs.exists(normalizedSource)) {
                output += `mv: 无法统计 '${source}': 没有那个文件或目录\n`;
                continue;
            }

            const resolvedDest = this.fs.resolvePath(destination);
            const normalizedDest = this.fs.normalizePath(resolvedDest);

            let destPath = normalizedDest;
            if (this.fs.isDirectory(normalizedDest)) {
                destPath = normalizedDest + '/' + normalizedSource.split('/').pop();
            }

            const result = this.fs.moveItem(normalizedSource, destPath);
            if (!result.success) {
                output += result.error + '\n';
            }
        }

        return {
            success: output === '',
            output: output.trim()
        };
    }

    grep(args) {
        if (args.length < 2) {
            return {
                success: false,
                output: 'grep: 缺少参数'
            };
        }

        let pattern = args[0];
        let files = [];
        let ignoreCase = false;
        let showLineNumber = false;

        for (const arg of args.slice(1)) {
            if (arg === '-i') {
                ignoreCase = true;
            } else if (arg === '-n') {
                showLineNumber = true;
            } else if (!arg.startsWith('-')) {
                files.push(arg);
            }
        }

        if (files.length === 0) {
            return {
                success: false,
                output: 'grep: 缺少文件参数'
            };
        }

        let output = '';
        let success = true;

        for (const file of files) {
            const resolved = this.fs.resolvePath(file);
            const normalized = this.fs.normalizePath(resolved);

            const result = this.fs.getFileContent(normalized);
            if (!result.success) {
                output += `grep: ${file}: ${result.error}\n`;
                success = false;
                continue;
            }

            const lines = result.content.split('\n');
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                const match = ignoreCase
                    ? line.toLowerCase().includes(pattern.toLowerCase())
                    : line.includes(pattern);

                if (match) {
                    if (showLineNumber) {
                        output += `${i + 1}:${line}\n`;
                    } else {
                        output += line + '\n';
                    }
                }
            }
        }

        return {
            success: success,
            output: output.trim()
        };
    }

    chmod(args) {
        if (args.length < 2) {
            return {
                success: false,
                output: 'chmod: 缺少参数'
            };
        }

        let mode = args[0];
        let files = args.slice(1);

        let output = '';
        for (const file of files) {
            if (file.startsWith('-')) continue;

            const resolved = this.fs.resolvePath(file);
            const normalized = this.fs.normalizePath(resolved);

            if (!this.fs.exists(normalized)) {
                output += `chmod: 无法访问 '${file}': 没有那个文件或目录\n`;
                continue;
            }

            const item = this.fs.getItem(normalized);
            let newPermissions;

            if (/^\d{3,4}$/.test(mode)) {
                const type = item.type === 'dir' ? 'd' : '-';
                const perms = this.modeToPermissions(mode);
                newPermissions = type + perms;
            } else {
                const currentPerms = item.permissions.substring(1);
                newPermissions = this.applySymbolicMode(currentPerms, mode);
                newPermissions = (item.type === 'dir' ? 'd' : '-') + newPermissions;
            }

            this.fs.changePermissions(normalized, newPermissions);
        }

        return {
            success: output === '',
            output: output.trim()
        };
    }

    modeToPermissions(mode) {
        const perms = [];
        for (let i = 0; i < 3; i++) {
            const digit = parseInt(mode[mode.length - 3 + i]);
            perms.push((digit & 4) ? 'r' : '-');
            perms.push((digit & 2) ? 'w' : '-');
            perms.push((digit & 1) ? 'x' : '-');
        }
        return perms.join('');
    }

    applySymbolicMode(current, mode) {
        const parts = mode.split(',');
        let result = current;

        for (const part of parts) {
            const match = part.match(/^([ugoa]*)([+-=])([rwx]*)$/);
            if (!match) continue;

            const who = match[1] || 'a';
            const op = match[2];
            const perms = match[3];

            for (const w of who === 'a' ? ['u', 'g', 'o'] : who.split('')) {
                const pos = w === 'u' ? 0 : w === 'g' ? 3 : 6;
                const currentPart = result.substring(pos, pos + 3);

                let newPart = '';
                if (op === '+') {
                    newPart = this.addPermissions(currentPart, perms);
                } else if (op === '-') {
                    newPart = this.removePermissions(currentPart, perms);
                } else if (op === '=') {
                    newPart = this.setPermissions(perms);
                }

                result = result.substring(0, pos) + newPart + result.substring(pos + 3);
            }
        }

        return result;
    }

    addPermissions(current, perms) {
        let result = current;
        for (const p of perms) {
            const pos = p === 'r' ? 0 : p === 'w' ? 1 : 2;
            result = result.substring(0, pos) + p + result.substring(pos + 1);
        }
        return result;
    }

    removePermissions(current, perms) {
        let result = current;
        for (const p of perms) {
            const pos = p === 'r' ? 0 : p === 'w' ? 1 : 2;
            result = result.substring(0, pos) + '-' + result.substring(pos + 1);
        }
        return result;
    }

    setPermissions(perms) {
        let result = '---';
        for (const p of perms) {
            const pos = p === 'r' ? 0 : p === 'w' ? 1 : 2;
            result = result.substring(0, pos) + p + result.substring(pos + 1);
        }
        return result;
    }

    find(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'find: 缺少路径参数'
            };
        }

        let path = args[0];
        let namePattern = null;
        let typeFilter = null;

        for (let i = 1; i < args.length; i++) {
            if (args[i] === '-name' && i + 1 < args.length) {
                namePattern = args[i + 1];
            } else if (args[i] === '-type' && i + 1 < args.length) {
                typeFilter = args[i + 1];
            }
        }

        const resolved = this.fs.resolvePath(path);
        const normalized = this.fs.normalizePath(resolved);

        if (!this.fs.exists(normalized)) {
            return {
                success: false,
                output: `find: '${path}': 没有那个文件或目录`
            };
        }

        const results = this.findRecursive(normalized, namePattern, typeFilter);
        return {
            success: true,
            output: results.join('\n')
        };
    }

    findRecursive(path, namePattern, typeFilter) {
        const results = [];
        const item = this.fs.getItem(path);

        if (!item) return results;

        const name = path.split('/').pop();

        if (namePattern) {
            const pattern = namePattern.replace(/\*/g, '.*').replace(/\?/g, '.');
            if (!new RegExp(pattern).test(name)) {
                return results;
            }
        }

        if (typeFilter) {
            if (typeFilter === 'f' && item.type !== 'file') return results;
            if (typeFilter === 'd' && item.type !== 'dir') return results;
        }

        results.push(path);

        if (item.type === 'dir') {
            const children = this.fs.getChildren(path);
            for (const child of children) {
                const childResults = this.findRecursive(path + '/' + child, namePattern, typeFilter);
                results.push(...childResults);
            }
        }

        return results;
    }

    whereis(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'whereis: 缺少参数'
            };
        }

        const command = args[0];
        const locations = [];

        if (['ls', 'cd', 'pwd', 'cat', 'grep', 'mkdir', 'touch', 'rm', 'cp', 'mv', 'chmod', 'find'].includes(command)) {
            locations.push(`/usr/bin/${command}`);
        }

        return {
            success: true,
            output: locations.length > 0 ? `${command}: ${locations.join(' ')}` : `${command}: 未找到`
        };
    }

    head(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'head: 缺少文件参数'
            };
        }

        let lines = 10;
        let files = [];

        for (const arg of args) {
            if (arg === '-n' && args.indexOf(arg) + 1 < args.length) {
                lines = parseInt(args[args.indexOf(arg) + 1]);
            } else if (!arg.startsWith('-') && arg !== String(lines)) {
                files.push(arg);
            }
        }

        if (files.length === 0) {
            return {
                success: false,
                output: 'head: 缺少文件参数'
            };
        }

        let output = '';
        for (const file of files) {
            const resolved = this.fs.resolvePath(file);
            const normalized = this.fs.normalizePath(resolved);

            const result = this.fs.getFileContent(normalized);
            if (!result.success) {
                output += `head: ${file}: ${result.error}\n`;
                continue;
            }

            const contentLines = result.content.split('\n').slice(0, lines);
            output += contentLines.join('\n') + '\n';
        }

        return {
            success: true,
            output: output.trim()
        };
    }

    tail(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'tail: 缺少文件参数'
            };
        }

        let lines = 10;
        let files = [];

        for (const arg of args) {
            if (arg === '-n' && args.indexOf(arg) + 1 < args.length) {
                lines = parseInt(args[args.indexOf(arg) + 1]);
            } else if (!arg.startsWith('-') && arg !== String(lines)) {
                files.push(arg);
            }
        }

        if (files.length === 0) {
            return {
                success: false,
                output: 'tail: 缺少文件参数'
            };
        }

        let output = '';
        for (const file of files) {
            const resolved = this.fs.resolvePath(file);
            const normalized = this.fs.normalizePath(resolved);

            const result = this.fs.getFileContent(normalized);
            if (!result.success) {
                output += `tail: ${file}: ${result.error}\n`;
                continue;
            }

            const contentLines = result.content.split('\n');
            const tailLines = contentLines.slice(-lines);
            output += tailLines.join('\n') + '\n';
        }

        return {
            success: true,
            output: output.trim()
        };
    }

    more(args) {
        return this.cat(args);
    }

    less(args) {
        return this.cat(args);
    }

    tar(args) {
        return {
            success: true,
            output: 'tar: 模拟打包/解包操作'
        };
    }

    gzip(args) {
        return {
            success: true,
            output: 'gzip: 模拟压缩操作'
        };
    }

    bzip2(args) {
        return {
            success: true,
            output: 'bzip2: 模拟压缩操作'
        };
    }

    clear(args) {
        return {
            success: true,
            output: '',
            clear: true
        };
    }

    help(args) {
        const navCommands = [
            'tutorial  - 进入教程模式 (缩写: t)',
            'practice  - 进入实战模式 (缩写: p)',
            'home      - 返回首页 (缩写: back, b)',
            'random    - 随机挑战 (缩写: r)',
            'goto <n>  - 跳转到指定关卡/场景 (缩写: go)',
            'next      - 下一关卡/场景 (缩写: n)',
            'prev      - 上一关卡/场景',
            'list      - 列出所有关卡/场景',
            'status    - 查看学习进度 (缩写: info)',
            'hint      - 显示当前任务提示 (缩写: h)',
            'skip      - 跳过当前任务',
            'reset     - 重置所有进度',
        ];
        const linuxCommands = [
            'ls        - 列出目录内容',
            'pwd       - 显示当前工作目录',
            'cd        - 切换目录',
            'mkdir     - 创建目录',
            'touch     - 创建文件',
            'cat       - 显示文件内容',
            'rm        - 删除文件',
            'rmdir     - 删除空目录',
            'cp        - 复制文件',
            'mv        - 移动/重命名文件',
            'grep      - 搜索文本',
            'chmod     - 改变权限',
            'find      - 查找文件',
            'whereis   - 查找命令位置',
            'head      - 显示文件开头',
            'tail      - 显示文件末尾',
            'more/less - 分页显示',
            'tar       - 打包文件',
            'git       - Git版本控制',
            'docker    - Docker容器管理',
            'vim/vi    - Vim编辑器',
            'systemctl - 系统服务管理',
            'journalctl- 查看系统日志',
            'clear     - 清屏 (快捷键: Ctrl+L)',
        ];

        return {
            success: true,
            output: '🧭 导航命令:\n' + navCommands.join('\n') + '\n\n🐧 Linux命令:\n' + linuxCommands.join('\n')
        };
    }

    exit(args) {
        return {
            success: true,
            output: '再见！',
            exit: true
        };
    }

    git(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'git: 缺少参数'
            };
        }

        const subCommand = args[0];
        const subArgs = args.slice(1);

        switch (subCommand) {
            case '--version':
                return {
                    success: true,
                    output: 'git version 2.43.0'
                };
            case 'init':
                return {
                    success: true,
                    output: '已初始化空的 Git 仓库于 /home/user/projects/.git/'
                };
            case 'clone':
                if (subArgs.length === 0) {
                    return {
                        success: false,
                        output: 'git clone: 缺少仓库地址'
                    };
                }
                return {
                    success: true,
                    output: `正在克隆 '${subArgs[0]}'...\n远程: Counting objects: 100, done.\n远程: Compressing objects: 100% (50/50), done.\n远程: Total 100 (delta 25), reused 100 (delta 25)\n接收对象中: 100% (100/100), 完成.`
                };
            case 'status':
                return {
                    success: true,
                    output: '位于分支 master\n您的分支与上游分支 \'origin/master\' 一致。\n\n尚未暂存以备提交的变更：\n  （使用 "git add <文件>..." 更新将要提交的内容）\n  （使用 "git restore <文件>..." 放弃工作区的改动）\n\t修改:     README.md\n\n尚未跟踪的文件:\n  （使用 "git add <文件>..." 以包含将要提交的内容）\n\tnewfile.txt\n\n提交为空，但存在尚未跟踪的文件（使用 "git add" 建立跟踪）'
                };
            case 'add':
                return {
                    success: true,
                    output: ''
                };
            case 'commit':
                const msgIndex = subArgs.indexOf('-m');
                if (msgIndex !== -1 && subArgs[msgIndex + 1]) {
                    return {
                        success: true,
                        output: `[master ${this.generateHash()}] ${subArgs[msgIndex + 1]}\n 2 files changed, 10 insertions(+)`
                    };
                }
                return {
                    success: true,
                    output: `[master ${this.generateHash()}] 提交更改\n 2 files changed, 10 insertions(+)`
                };
            case 'log':
                return {
                    success: true,
                    output: `commit ${this.generateHash()}\nAuthor: User <user@example.com>\nDate:   ${new Date().toDateString()}\n\n    初始提交\n\ncommit ${this.generateHash()}\nAuthor: User <user@example.com>\nDate:   ${new Date().toDateString()}\n\n    添加新功能`
                };
            case 'diff':
                return {
                    success: true,
                    output: 'diff --git a/README.md b/README.md\nindex abc123..def456 100644\n--- a/README.md\n+++ b/README.md\n@@ -1,3 +1,4 @@\n# 项目名称\n+新添加的一行\n\n这是一个示例项目。'
                };
            case 'remote':
                if (subArgs.includes('-v')) {
                    return {
                        success: true,
                        output: 'origin  https://github.com/user/repo.git (fetch)\norigin  https://github.com/user/repo.git (push)'
                    };
                }
                return {
                    success: true,
                    output: 'origin'
                };
            case 'push':
                return {
                    success: true,
                    output: '枚举对象: 5, 完成.\n对象计数中: 100% (5/5), 完成.\n写入对象中: 100% (3/3), 300 bytes | 300.00 KiB/s, 完成.\n总共 3（差异 0），复用 0（差异 0），包复用 0\nTo https://github.com/user/repo.git\n   abc123..def456  master -> master'
                };
            case 'pull':
                return {
                    success: true,
                    output: 'remote: Enumerating objects: 5, done.\nremote: Counting objects: 100% (5/5), done.\nremote: Compressing objects: 100% (3/3), done.\nremote: Total 5 (delta 1), reused 5 (delta 1), pack-reused 0\n展开对象中: 100% (5/5), 完成.\n来自 https://github.com/user/repo\n * branch            master     -> FETCH_HEAD\n   abc123..def456  master     -> origin/master\n更新 abc123..def456\nFast-forward\n README.md | 2 ++\n 1 file changed, 2 insertions(+)'
                };
            case 'branch':
                if (subArgs.length === 0) {
                    return {
                        success: true,
                        output: '* master\n  feature\n  develop'
                    };
                }
                return {
                    success: true,
                    output: `分支 '${subArgs[0]}' 已创建。`
                };
            case 'checkout':
                if (subArgs.includes('-b')) {
                    const branchName = subArgs[subArgs.indexOf('-b') + 1];
                    return {
                        success: true,
                        output: `切换到一个新分支 '${branchName}'`
                    };
                }
                return {
                    success: true,
                    output: `切换到分支 '${subArgs[0]}'`
                };
            case 'merge':
                return {
                    success: true,
                    output: `更新 ${this.generateHash()}..${this.generateHash()}\nFast-forward\n README.md | 2 ++\n 1 file changed, 2 insertions(+)`
                };
            case 'stash':
                if (subArgs[0] === 'pop') {
                    return {
                        success: true,
                        output: '位于分支 master\n您的分支与上游分支 \'origin/master\' 一致。\n已恢复工作区状态。\nDropped refs/stash@{0} (abc123)'
                    };
                }
                return {
                    success: true,
                    output: '已保存工作区状态到 WIP on master: abc123 提交信息'
                };
            case 'reset':
                return {
                    success: true,
                    output: ''
                };
            case 'config':
                if (subArgs.includes('--list')) {
                    return {
                        success: true,
                        output: 'user.name=User\nuser.email=user@example.com\ncore.repositoryformatversion=0\ncore.filemode=true'
                    };
                }
                return {
                    success: true,
                    output: ''
                };
            case 'tag':
                if (subArgs.length === 0 || subArgs[0] === '-l') {
                    return {
                        success: true,
                        output: 'v1.0.0\nv1.1.0\nv1.2.0\nv2.0.0'
                    };
                }
                if (subArgs.includes('-a')) {
                    const tagIndex = subArgs.indexOf('-a') + 1;
                    const tagName = subArgs[tagIndex] || 'v1.0.0';
                    return {
                        success: true,
                        output: ''
                    };
                }
                return {
                    success: true,
                    output: ''
                };
            case 'fetch':
                return {
                    success: true,
                    output: 'remote: Enumerating objects: 5, done.\nremote: Counting objects: 100% (5/5), done.\nremote: Compressing objects: 100% (3/3), done.\nremote: Total 5 (delta 1), reused 5 (delta 1), pack-reused 0\n展开对象中: 100% (5/5), 完成.\n来自 https://github.com/user/repo\n * [new ref]         refs/tags/v1.0.0 -> refs/tags/v1.0.0\n   abc123..def456  master     -> origin/master'
                };
            case 'rebase':
                if (subArgs.includes('--abort')) {
                    return {
                        success: true,
                        output: '已中止变基操作。'
                    };
                }
                if (subArgs.includes('--continue')) {
                    return {
                        success: true,
                        output: '已应用，正在变基...\n成功变基并更新 refs/heads/master。'
                    };
                }
                if (subArgs.includes('-i')) {
                    return {
                        success: true,
                        output: 'hint: Waiting for your editor to close the file...\n[detached HEAD abc123] 编辑提交\n 1 file changed, 2 insertions(+)\nSuccessfully rebased and updated refs/heads/master.'
                    };
                }
                return {
                    success: true,
                    output: '成功变基并更新 refs/heads/master。'
                };
            case 'cherry-pick':
                return {
                    success: true,
                    output: '[master def456] 提交信息\n Date: ' + new Date().toDateString() + '\n 1 file changed, 2 insertions(+)\n创建变基，应用 abc1234'
                };
            case 'revert':
                return {
                    success: true,
                    output: '[master ' + this.generateHash() + '] Revert "之前的提交"\n 1 file changed, 2 deletions(-)'
                };
            case 'bisect':
                const bisectSubCmd = subArgs[0];
                switch (bisectSubCmd) {
                    case 'start':
                        return {
                            success: true,
                            output: '二分查找已开始。\n已定位到某些提交（约 10 步）'
                        };
                    case 'good':
                        return {
                            success: true,
                            output: 'Bisecting: 0 修订版还剩，在 5 个修订版中（约 2 步）\n[def456] 中间提交'
                        };
                    case 'bad':
                        return {
                            success: true,
                            output: 'Bisecting: 0 修订版还剩，在 5 个修订版中（约 2 步）\n[abc123] 有问题的提交'
                        };
                    case 'reset':
                        return {
                            success: true,
                            output: '已重置为之前的 HEAD（abc123）'
                        };
                    default:
                        return {
                            success: true,
                            output: ''
                        };
                }
            case 'show':
                return {
                    success: true,
                    output: `commit ${this.generateHash()}\nAuthor: User <user@example.com>\nDate:   ${new Date().toDateString()}\n\n    提交信息\n\ndiff --git a/file.txt b/file.txt\nindex abc123..def456 100644\n--- a/file.txt\n+++ b/file.txt\n@@ -1,3 +1,4 @@\n+新添加的一行\n原有内容`
                };
            case 'blame':
                return {
                    success: true,
                    output: `abc1234 (User 2024-01-15 10:00:01 +0800  1) 第一行内容\ndef4567 (User 2024-01-15 11:00:02 +0800  2) 第二行内容\nabc1234 (User 2024-01-15 10:00:01 +0800  3) 第三行内容`
                };
            case 'reflog':
                return {
                    success: true,
                    output: `abc123 HEAD@{0}: reset: moving to HEAD~1\ndef456 HEAD@{1}: commit: 添加新功能\nabc123 HEAD@{2}: commit: 初始提交\n123456 HEAD@{3}: clone: from https://github.com/user/repo.git`
                };
            case 'clean':
                return {
                    success: true,
                    output: '删除未跟踪的文件：\n  untracked.txt'
                };
            case 'mv':
                return {
                    success: true,
                    output: ''
                };
            case 'rm':
                return {
                    success: true,
                    output: "rm 'test.txt'"
                };
            case 'worktree':
                if (subArgs[0] === 'add') {
                    return {
                        success: true,
                        output: `准备 worktree（检出 'abc123'）\nHEAD 现在位于 abc123 提交信息`
                    };
                }
                if (subArgs[0] === 'list') {
                    return {
                        success: true,
                        output: '/home/user/projects  abc123 [master]\n/home/user/projects/feature  def456 [feature]'
                    };
                }
                return {
                    success: true,
                    output: ''
                };
            case 'submodule':
                if (subArgs[0] === 'init') {
                    return {
                        success: true,
                        output: '已注册子模块路径'
                    };
                }
                if (subArgs[0] === 'update') {
                    return {
                        success: true,
                        output: '正在克隆到子模块...\n子模块路径已检出'
                    };
                }
                return {
                    success: true,
                    output: ''
                };
            default:
                return {
                    success: false,
                    output: `git: '${subCommand}' 不是一个 git 命令。请参阅 'git --help'。`
                };
        }
    }

    generateHash() {
        return Math.random().toString(16).substring(2, 10);
    }

    docker(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'docker: 缺少参数'
            };
        }

        const subCommand = args[0];
        const subArgs = args.slice(1);

        switch (subCommand) {
            case '--version':
                return {
                    success: true,
                    output: 'Docker version 24.0.7, build afdd53b'
                };
            case 'images':
                return {
                    success: true,
                    output: 'REPOSITORY          TAG       IMAGE ID       CREATED        SIZE\nnginx               latest    abc123def456   2 days ago     142MB\nubuntu              22.04     def456abc123   5 days ago     77.8MB\nhello-world         latest    123456789abc   2 weeks ago    13.3kB'
                };
            case 'search':
                if (subArgs.length === 0) {
                    return {
                        success: false,
                        output: 'docker search: 缺少搜索关键词'
                    };
                }
                return {
                    success: true,
                    output: `NAME                           DESCRIPTION                                     STARS     OFFICIAL\n${subArgs[0]}                  Official build.                                 15000     [OK]\n${subArgs[0]}-alpine           Official build.                                 5000      [OK]`
                };
            case 'pull':
                if (subArgs.length === 0) {
                    return {
                        success: false,
                        output: 'docker pull: 缺少镜像名'
                    };
                }
                return {
                    success: true,
                    output: `Using default tag: latest\nlatest: Pulling from library/${subArgs[0]}\nDigest: sha256:abc123def456...\nStatus: Downloaded newer image for ${subArgs[0]}:latest\ndocker.io/library/${subArgs[0]}:latest`
                };
            case 'run':
                return {
                    success: true,
                    output: `容器已启动，ID: ${this.generateHash().substring(0, 12)}`
                };
            case 'ps':
                if (subArgs.includes('-a')) {
                    return {
                        success: true,
                        output: 'CONTAINER ID   IMAGE     COMMAND   CREATED         STATUS                     PORTS     NAMES\nabc123def456   nginx     "nginx"   5 minutes ago   Exited (0) 2 minutes ago             web01\ndef456abc123   ubuntu    "bash"    10 minutes ago  Up 10 minutes                        test01'
                    };
                }
                return {
                    success: true,
                    output: 'CONTAINER ID   IMAGE     COMMAND   CREATED         STATUS         PORTS     NAMES\nabc123def456   nginx     "nginx"   5 minutes ago   Up 5 minutes   80/tcp    web01'
                };
            case 'stop':
                if (subArgs.length === 0) {
                    return {
                        success: false,
                        output: 'docker stop: 缺少容器ID'
                    };
                }
                return {
                    success: true,
                    output: subArgs[0]
                };
            case 'rm':
                if (subArgs.length === 0) {
                    return {
                        success: false,
                        output: 'docker rm: 缺少容器ID'
                    };
                }
                return {
                    success: true,
                    output: subArgs[0]
                };
            case 'rmi':
                if (subArgs.length === 0) {
                    return {
                        success: false,
                        output: 'docker rmi: 缺少镜像ID'
                    };
                }
                return {
                    success: true,
                    output: `Untagged: ${subArgs[0]}\nDeleted: sha256:abc123def456...`
                };
            case 'logs':
                if (subArgs.length === 0) {
                    return {
                        success: false,
                        output: 'docker logs: 缺少容器ID'
                    };
                }
                return {
                    success: true,
                    output: `[${new Date().toISOString()}] Server started on port 80\n[${new Date().toISOString()}] Request received from 192.168.1.1\n[${new Date().toISOString()}] Response sent successfully`
                };
            case 'exec':
                return {
                    success: true,
                    output: '命令执行成功'
                };
            case 'inspect':
                if (subArgs.length === 0) {
                    return {
                        success: false,
                        output: 'docker inspect: 缺少容器ID'
                    };
                }
                return {
                    success: true,
                    output: `[\n    {\n        "Id": "${this.generateHash()}",\n        "Created": "${new Date().toISOString()}",\n        "Path": "/bin/bash",\n        "State": {\n            "Status": "running",\n            "Running": true\n        }\n    }\n]`
                };
            case 'stats':
                return {
                    success: true,
                    output: 'CONTAINER ID   NAME      CPU %     MEM USAGE / LIMIT   MEM %     NET I/O           BLOCK I/O         PIDS\nabc123def456   web01     0.50%     50MiB / 2GiB        2.50%     1.5MB / 500kB    100MB / 50MB     5'
                };
            case 'top':
                if (subArgs.length === 0) {
                    return {
                        success: false,
                        output: 'docker top: 缺少容器ID'
                    };
                }
                return {
                    success: true,
                    output: 'UID                 PID                 PPID                C                   STIME               TTY                 TIME                CMD\nroot                1234                5678                0                   10:00               ?                   00:00:00            nginx: master process'
                };
            case 'port':
                if (subArgs.length === 0) {
                    return {
                        success: false,
                        output: 'docker port: 缺少容器ID'
                    };
                }
                return {
                    success: true,
                    output: '80/tcp -> 0.0.0.0:8080'
                };
            case 'restart':
            case 'start':
                if (subArgs.length === 0) {
                    return {
                        success: false,
                        output: `docker ${subCommand}: 缺少容器ID`
                    };
                }
                return {
                    success: true,
                    output: subArgs[0]
                };
            case 'pause':
            case 'unpause':
                if (subArgs.length === 0) {
                    return {
                        success: false,
                        output: `docker ${subCommand}: 缺少容器ID`
                    };
                }
                return {
                    success: true,
                    output: subArgs[0]
                };
            case 'volume':
                if (subArgs[0] === 'ls') {
                    return {
                        success: true,
                        output: 'DRIVER    VOLUME NAME\nlocal     mydata\nlocal     app_data'
                    };
                }
                if (subArgs[0] === 'create') {
                    return {
                        success: true,
                        output: subArgs[1] || this.generateHash().substring(0, 12)
                    };
                }
                return {
                    success: true,
                    output: ''
                };
            case 'save':
                return {
                    success: true,
                    output: '镜像已保存到文件'
                };
            case 'load':
                return {
                    success: true,
                    output: 'Loaded image: nginx:latest'
                };
            case 'export':
                return {
                    success: true,
                    output: '容器文件系统已导出'
                };
            case 'build':
                return {
                    success: true,
                    output: `[+] Building 5.0s (8/8) FINISHED\n => [internal] load build definition from Dockerfile\n => [internal] load .dockerignore\n => [internal] load metadata\n => [1/3] FROM docker.io/library/nginx\n => [2/3] COPY . /app\n => [3/3] RUN npm install\n => exporting to image\n => => writing image sha256:${this.generateHash()}`
                };
            case 'tag':
                return {
                    success: true,
                    output: ''
                };
            case 'push':
                return {
                    success: true,
                    output: 'The push refers to repository [docker.io/library/nginx]\nabc123: digest: sha256:def456 size: 1234'
                };
            case 'image':
                if (subArgs[0] === 'prune') {
                    return {
                        success: true,
                        output: 'Deleted Images:\nuntagged: old-image:latest\ndeleted: sha256:abc123...\nTotal reclaimed space: 100MB'
                    };
                }
                return {
                    success: true,
                    output: ''
                };
            case 'container':
                if (subArgs[0] === 'prune') {
                    return {
                        success: true,
                        output: 'Deleted Containers:\nabc123\ndef456\nTotal reclaimed space: 50MB'
                    };
                }
                return {
                    success: true,
                    output: ''
                };
            case 'info':
                return {
                    success: true,
                    output: 'Client:\n Context:    default\n Debug Mode: false\n\nServer:\n Containers: 5\n Running: 2\n Paused: 0\n Stopped: 3\n Images: 10\n Server Version: 24.0.7\n Storage Driver: overlay2\n Operating System: Linux'
                };
            case 'system':
                if (subArgs.includes('prune')) {
                    return {
                        success: true,
                        output: 'Deleted Containers:\nabc123\nDeleted Images:\nuntagged: old-image:latest\nDeleted Networks:\ntest_net\nTotal reclaimed space: 500MB'
                    };
                }
                if (subArgs.includes('df')) {
                    return {
                        success: true,
                        output: 'Type            Total   Active   Size    Reclaimable\nImages          10      5        1.5GB   800MB (53%)\nContainers      5       2        200MB   150MB (75%)\nLocal Volumes   3       2        500MB   100MB (20%)\nBuild Cache     15      0        300MB   300MB'
                    };
                }
                return {
                    success: true,
                    output: ''
                };
            case 'compose':
                if (subArgs[0] === 'up') {
                    return {
                        success: true,
                        output: '[+] Running 3/3\n ✔ Network myapp_default    Created\n ✔ Container myapp-web      Started\n ✔ Container myapp-db        Started'
                    };
                }
                if (subArgs[0] === 'down') {
                    return {
                        success: true,
                        output: '[+] Running 3/3\n ✔ Container myapp-web      Removed\n ✔ Container myapp-db        Removed\n ✔ Network myapp_default    Removed'
                    };
                }
                if (subArgs[0] === 'logs') {
                    return {
                        success: true,
                        output: 'myapp-web  | Server started on port 80\nmyapp-db   | Database ready for connections'
                    };
                }
                return {
                    success: true,
                    output: 'Docker Compose 操作完成'
                };
            case 'history':
                return {
                    success: true,
                    output: 'IMAGE          CREATED        CREATED BY                                      SIZE\nabc123def456   2 days ago     /bin/sh -c #(nop)  CMD ["nginx" "-g" "daemon…   0B\ndef456abc123   2 days ago     /bin/sh -c #(nop)  EXPOSE 80                   0B\n123456789abc   2 days ago     /bin/sh -c #(nop) COPY file:abc in /           1.2kB'
                };
            case 'commit':
                return {
                    success: true,
                    output: `sha256:${this.generateHash()}${this.generateHash()}`
                };
            case 'network':
                if (subArgs[0] === 'ls') {
                    return {
                        success: true,
                        output: 'NETWORK ID     NAME      DRIVER    SCOPE\nabc123         bridge    bridge    local\ndef456         host      host      local\n123456         none      null      local'
                    };
                }
                if (subArgs[0] === 'create') {
                    return {
                        success: true,
                        output: `${this.generateHash().substring(0, 12)}\n网络 '${subArgs[1]}' 已创建`
                    };
                }
                if (subArgs[0] === 'connect') {
                    return {
                        success: true,
                        output: ''
                    };
                }
                if (subArgs[0] === 'disconnect') {
                    return {
                        success: true,
                        output: ''
                    };
                }
                return {
                    success: true,
                    output: ''
                };
            default:
                return {
                    success: false,
                    output: `docker: '${subCommand}' 不是一个 docker 命令。`
                };
        }
    }

    vim(args) {
        if (args.length === 0) {
            return {
                success: true,
                output: 'Vim 编辑器已启动（模拟）\n按 i 进入插入模式\n按 ESC 退出插入模式\n输入 :w 保存\n输入 :q 退出\n输入 :wq 保存并退出'
            };
        }

        const fileName = args[0];
        const resolved = this.fs.resolvePath(fileName);
        const normalized = this.fs.normalizePath(resolved);

        if (this.fs.exists(normalized)) {
            const item = this.fs.getItem(normalized);
            if (item.type === 'file') {
                return {
                    success: true,
                    output: `打开文件: ${fileName}\n\n${item.content}\n\n~\n~\n~\n"${fileName}" ${item.content.split('\n').length}L, ${item.content.length}B`
                };
            }
        }

        return {
            success: true,
            output: `创建新文件: ${fileName}\n\n~\n~\n~\n"${fileName}" [新文件]`
        };
    }

    systemctl(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'systemctl: 缺少参数'
            };
        }

        const subCommand = args[0];
        const serviceName = args[1] || 'nginx';

        switch (subCommand) {
            case 'status':
                return {
                    success: true,
                    output: `● ${serviceName}.service - ${serviceName} Server\n   Loaded: loaded (/lib/systemd/system/${serviceName}.service; enabled; vendor preset: enabled)\n   Active: active (running) since ${new Date().toDateString()}; 5min ago\n Main PID: 1234 (${serviceName})\n    Tasks: 2 (limit: 4915)\n   Memory: 5.0M\n   CGroup: /system.slice/${serviceName}.service\n           └─1234 /usr/sbin/${serviceName}\n\n${new Date().toDateString()} ${serviceName}[1234]: Server started.`
                };
            case 'start':
                return {
                    success: true,
                    output: ''
                };
            case 'stop':
                return {
                    success: true,
                    output: ''
                };
            case 'restart':
                return {
                    success: true,
                    output: ''
                };
            case 'reload':
                return {
                    success: true,
                    output: ''
                };
            case 'enable':
                return {
                    success: true,
                    output: `Created symlink /etc/systemd/system/multi-user.target.wants/${serviceName}.service → /lib/systemd/system/${serviceName}.service.`
                };
            case 'disable':
                return {
                    success: true,
                    output: `Removed /etc/systemd/system/multi-user.target.wants/${serviceName}.service.`
                };
            case 'is-enabled':
                return {
                    success: true,
                    output: 'enabled'
                };
            case 'is-active':
                return {
                    success: true,
                    output: 'active'
                };
            case 'list-units':
                if (args.includes('--type=service')) {
                    return {
                        success: true,
                        output: '  UNIT                               LOAD   ACTIVE SUB     DESCRIPTION\n  nginx.service                      loaded active running nginx Server\n  ssh.service                        loaded active running OpenSSH Server\n  systemd-journald.service           loaded active running Journal Service\n\nLOAD   = Reflects whether the unit definition was properly loaded.\nACTIVE = The high-level unit activation state.\n\n3 loaded units listed.'
                    };
                }
                return {
                    success: true,
                    output: 'UNIT                               LOAD   ACTIVE SUB     JOB   DESCRIPTION\nnginx.service                      loaded active running       nginx Server\nssh.service                        loaded active running       OpenSSH Server'
                };
            case 'daemon-reload':
                return {
                    success: true,
                    output: ''
                };
            case '--failed':
                return {
                    success: true,
                    output: '  UNIT          LOAD   ACTIVE SUB    DESCRIPTION\n\n0 loaded units listed.'
                };
            case 'cat':
                return {
                    success: true,
                    output: `[Unit]\nDescription=${serviceName} Server\nAfter=network.target\n\n[Service]\nType=forking\nExecStart=/usr/sbin/${serviceName}\nExecReload=/bin/kill -s HUP $MAINPID\nExecStop=/bin/kill -s QUIT $MAINPID\n\n[Install]\nWantedBy=multi-user.target`
                };
            default:
                return {
                    success: false,
                    output: `systemctl: 未知命令 '${subCommand}'`
                };
        }
    }

    journalctl(args) {
        if (args.includes('-u')) {
            const serviceIndex = args.indexOf('-u') + 1;
            const serviceName = args[serviceIndex] || 'nginx';
            return {
                success: true,
                output: `-- Logs begin at ${new Date().toDateString()}. --\n${new Date().toISOString()} ${serviceName}[1234]: Server started\n${new Date().toISOString()} ${serviceName}[1234]: Accepting connections\n${new Date().toISOString()} ${serviceName}[1234]: Request processed`
            };
        }
        if (args.includes('-f')) {
            return {
                success: true,
                output: `-- Logs begin at ${new Date().toDateString()}. --\n${new Date().toISOString()} systemd[1]: Started Session\n${new Date().toISOString()} kernel: [UFW BLOCK] IN=eth0\n（实时日志跟踪中...）`
            };
        }
        return {
            success: true,
            output: `-- Logs begin at ${new Date().toDateString()}. --\n${new Date().toISOString()} systemd[1]: Starting System...\n${new Date().toISOString()} systemd[1]: Started System Logging Service.`
        };
    }

    npm(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'npm: 缺少参数'
            };
        }

        const subCommand = args[0];
        const subArgs = args.slice(1);

        switch (subCommand) {
            case '--version':
            case '-v':
                return {
                    success: true,
                    output: '10.2.4'
                };
            case 'init':
                return {
                    success: true,
                    output: 'Wrote to /home/user/projects/package.json:\n\n{\n  "name": "myapp",\n  "version": "1.0.0",\n  "description": "",\n  "main": "index.js",\n  "scripts": {\n    "test": "echo \\"Error: no test specified\\" && exit 1"\n  },\n  "author": "",\n  "license": "ISC"\n}\n\nIs this OK? (yes)'
                };
            case 'install':
            case 'i':
                return {
                    success: true,
                    output: `added 127 packages in 3s\n\n15 packages are looking for funding\n  run \`npm fund\` for details`
                };
            case 'run':
                if (subArgs.length === 0) {
                    return {
                        success: false,
                        output: 'npm run: 缺少脚本名称'
                    };
                }
                const script = subArgs[0];
                if (script === 'build') {
                    return {
                        success: true,
                        output: `> myapp@1.0.0 build\n> vite build\n\nvite v5.0.0 building for production...\n✓ 42 modules transformed.\ndist/index.html          0.45 kB │ gzip:  0.30 kB\ndist/assets/index.css    1.23 kB │ gzip:  0.45 kB\ndist/assets/index.js    45.67 kB │ gzip: 18.23 kB\n✓ built in 1.23s`
                    };
                }
                if (script === 'dev') {
                    return {
                        success: true,
                        output: `> myapp@1.0.0 dev\n> vite\n\n  VITE v5.0.0  ready in 234 ms\n\n  ➜  Local:   http://localhost:5173/\n  ➜  Network: use --host to expose\n  ➜  press h + enter to show help`
                    };
                }
                return {
                    success: true,
                    output: `> myapp@1.0.0 ${script}\n> echo "Running ${script}"\nRunning ${script}`
                };
            case 'start':
                return {
                    success: true,
                    output: `> myapp@1.0.0 start\n> node server.js\n\nServer running on http://localhost:3000`
                };
            case 'test':
                return {
                    success: true,
                    output: `> myapp@1.0.0 test\n> jest\n\nPASS  ./test.js\n✓ should pass (5 ms)\n\nTest Suites: 1 passed, 1 total\nTests:       1 passed, 1 total\nSnapshots:   0 total\nTime:        0.5 s`
                };
            case 'list':
            case 'ls':
                return {
                    success: true,
                    output: 'myapp@1.0.0 /home/user/projects\n├── vite@5.0.0\n├── vue@3.4.0\n└── axios@1.6.0'
                };
            case 'update':
                return {
                    success: true,
                    output: 'updated 3 packages in 2s'
                };
            case 'audit':
                if (subArgs.includes('fix')) {
                    return {
                        success: true,
                        output: 'fixed 2 of 2 vulnerabilities in 15 scanned packages\n2 vulnerabilities required manual review and could not be updated'
                    };
                }
                return {
                    success: true,
                    output: 'found 0 vulnerabilities'
                };
            case 'ci':
                return {
                    success: true,
                    output: 'npm WARN ci The package-lock.json file was created with an old version of npm,\nso additional package metadata was added as a workaround.\n\nadded 127 packages in 5s\n\n15 packages are looking for funding\n  run `npm fund` for details'
                };
            case 'dedupe':
                return {
                    success: true,
                    output: 'removed 5 packages, and audited 122 packages in 2s\n\n15 packages are looking for funding\n  run `npm fund` for details'
                };
            case 'outdated':
                return {
                    success: true,
                    output: 'Package        Current  Wanted  Latest  Location\nvite            5.0.0   5.0.0   5.1.0  node_modules/vite\nvue             3.4.0   3.4.0   3.5.0  node_modules/vue\naxios           1.6.0   1.6.0   1.7.0  node_modules/axios'
                };
            case 'info':
                return {
                    success: true,
                    output: `vue@3.4.0 | MIT | deps: 5 | versions: 200\nThe Progressive JavaScript Framework\n\ndist.tarball: https://registry.npmjs.org/vue/-/vue-3.4.0.tgz\ndist.unpackedSize: 2.5 MB\n\nmaintainers:\n- yyx990803 <evan@vuejs.org>\n\nkeywords:\n- vue\n- frontend\n- framework\n\npublished 1 month ago`
                };
            case 'uninstall':
                return {
                    success: true,
                    output: `removed 1 package in 1s`
                };
            case 'cache':
                if (subArgs[0] === 'clean') {
                    return {
                        success: true,
                        output: 'npm WARN using --force I sure hope you know what you are doing.\nCache cleared successfully.'
                    };
                }
                return {
                    success: true,
                    output: ''
                };
            case 'create':
                return {
                    success: true,
                    output: `✨  Creating a new project in /home/user/projects/myapp\n\n📦  Installing dependencies...\nadded 127 packages in 15s\n\n🎉  Successfully created project myapp`
                };
            default:
                return {
                    success: false,
                    output: `npm: '${subCommand}' 不是一个 npm 命令。`
                };
        }
    }

    node(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'node: 缺少参数'
            };
        }

        if (args[0] === '--version' || args[0] === '-v') {
            return {
                success: true,
                output: 'v20.11.0'
            };
        }

        if (args[0] === '-e') {
            const code = args.slice(1).join(' ');
            return {
                success: true,
                output: `执行: ${code}`
            };
        }

        return {
            success: true,
            output: `运行 ${args[0]}...\n程序执行完成`
        };
    }

    vue(args) {
        if (args.length === 0) {
            return {
                success: true,
                output: `Usage: vue <command> [options]\n\nCommands:\n  create    create a new project powered by vue-cli-service\n  add       install a plugin and invoke its generator\n  invoke    invoke the generator of a plugin\n  inspect   inspect the webpack config in a project with vue-cli-service\n  serve     serve a .js or .vue file in development mode\n  build     build a .js or .vue file in production mode\n\nRun vue <command> --help for detailed usage of given command.`
            };
        }

        const subCommand = args[0];

        switch (subCommand) {
            case '--version':
            case '-v':
                return {
                    success: true,
                    output: '@vue/cli 5.0.8'
                };
            case 'create':
                const projectName = args[1] || 'my-project';
                return {
                    success: true,
                    output: `Creating project in /home/user/projects/${projectName}...\n✨  Creating project in /home/user/projects/${projectName}.\n🗃  Initializing git repository...\n⚙  Installing CLI plugins. This might take a while...\n\nadded 127 packages in 15s\n\n🚀  Invoking generators...\n📦  Installing additional dependencies...\n\nadded 45 packages in 3s\n\n⚓  Running completion hooks...\n\n📄  Generating README.md...\n\n🎉  Successfully created project ${projectName}.\n👉  Get started with the following commands:\n\n $ cd ${projectName}\n $ npm run serve`
                };
            case 'add':
                return {
                    success: true,
                    output: `📦  Installing ${args[1] || 'plugin'}...\n\n+ ${args[1] || 'plugin'}@1.0.0\nadded 1 package in 2s\n\n✔  Successfully installed ${args[1] || 'plugin'}`
                };
            case 'serve':
                return {
                    success: true,
                    output: `  App running at:\n  - Local:   http://localhost:8080/\n  - Network: http://192.168.1.100:8080/\n\n  Note that the development build is not optimized.\n  To create a production build, run npm run build.`
                };
            case 'build':
                return {
                    success: true,
                    output: `Building for production...\n\n  File                                 Size               Gzipped\n\n  dist/js/chunk-vendors.abc123.js       89.45 KiB          32.12 KiB\n  dist/js/app.def456.js                 4.56 KiB           1.78 KiB\n  dist/css/app.123abc.css                0.45 KiB          0.30 KiB\n\n  Build completed in 3.45s\n\n  Images and other types of assets omitted.\n  Build at: dist/`
                };
            default:
                return {
                    success: false,
                    output: `vue: '${subCommand}' 不是一个 vue 命令。`
                };
        }
    }

    curl(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'curl: 缺少URL参数'
            };
        }

        const url = args.find(a => !a.startsWith('-')) || '';
        const showHeaders = args.includes('-I') || args.includes('--head');

        if (showHeaders) {
            return {
                success: true,
                output: `HTTP/1.1 200 OK\nContent-Type: application/json\nContent-Length: 123\nConnection: keep-alive\nDate: ${new Date().toUTCString()}\nServer: nginx/1.24.0\n\n{"status":"ok","message":"Health check passed"}`
            };
        }

        return {
            success: true,
            output: `{"status":"ok","data":"Response from ${url}"}`
        };
    }

    sed(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'sed: 缺少参数'
            };
        }

        return {
            success: true,
            output: 'sed: 文本处理完成'
        };
    }

    awk(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'awk: 缺少参数'
            };
        }

        const program = args.find(a => !a.startsWith('-'));
        return {
            success: true,
            output: `awk: 执行程序 ${program || '{print}'}\n处理完成`
        };
    }

    mail(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'mail: 缺少参数'
            };
        }

        const subjectIndex = args.indexOf('-s');
        const subject = subjectIndex !== -1 && args[subjectIndex + 1] ? args[subjectIndex + 1] : 'No Subject';
        const recipient = args[args.length - 1];

        return {
            success: true,
            output: `邮件已发送到 ${recipient}\n主题: ${subject}`
        };
    }

    bash(args) {
        if (args.length === 0) {
            return {
                success: true,
                output: 'bash: 启动新的 shell 会话'
            };
        }
        if (args[0] === '--version') {
            return {
                success: true,
                output: 'GNU bash, version 5.2.15(1)-release (x86_64-pc-linux-gnu)'
            };
        }
        return {
            success: true,
            output: `执行脚本: ${args.join(' ')}`
        };
    }

    crontab(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'crontab: 缺少参数'
            };
        }

        if (args[0] === '-e') {
            return {
                success: true,
                output: 'no crontab for user - using an empty one\ncrontab: installing new crontab'
            };
        }
        if (args[0] === '-l') {
            return {
                success: true,
                output: '# 每天凌晨2点执行备份\n0 2 * * * /home/user/backup.sh'
            };
        }
        if (args[0] === '-r') {
            return {
                success: true,
                output: 'crontab: 已删除用户的 crontab'
            };
        }
        return {
            success: true,
            output: ''
        };
    }

    echo(args) {
        return {
            success: true,
            output: args.join(' ')
        };
    }

    exportCmd(args) {
        if (args.length === 0) {
            return {
                success: true,
                output: ''
            };
        }
        return {
            success: true,
            output: ''
        };
    }

    env(args) {
        return {
            success: true,
            output: 'PATH=/usr/local/bin:/usr/bin:/bin\nHOME=/home/user\nUSER=user\nSHELL=/bin/bash\nPWD=/home/user\nLANG=en_US.UTF-8\nTERM=xterm-256color'
        };
    }

    ps(args) {
        if (args.includes('aux') || args.includes('-ef')) {
            return {
                success: true,
                output: 'USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot         1  0.0  0.1 169424 11200 ?        Ss   10:00   0:01 /sbin/init\nroot         2  0.0  0.0      0     0 ?        S    10:00   0:00 [kthreadd]\nuser      1234  0.5  2.1 123456 45678 pts/0    S+   10:30   0:15 vim app.js\nuser      5678  0.0  0.1  12345  3456 pts/1    R+   11:00   0:00 ps aux'
            };
        }
        return {
            success: true,
            output: '  PID TTY          TIME CMD\n 1234 pts/0    00:00:15 vim\n 5678 pts/1    00:00:00 ps'
        };
    }

    top(args) {
        return {
            success: true,
            output: `top - ${new Date().toTimeString().split(' ')[0]} up 2 days,  5:30,  2 users,  load average: 0.52, 0.58, 0.59\nTasks:  95 total,   1 running,  94 sleeping,   0 stopped,   0 zombie\n%Cpu(s):  5.2 us,  2.1 sy,  0.0 ni, 92.4 id,  0.2 wa,  0.0 hi,  0.1 si\nMiB Mem :   7823.5 total,    256.3 free,   2048.2 used,   5519.0 buff/cache\nMiB Swap:   2048.0 total,   2048.0 free,      0.0 used.   5456.1 avail Mem`
        };
    }

    kill(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'kill: 缺少进程ID'
            };
        }
        const pid = args.find(a => !a.startsWith('-'));
        if (args.includes('-9')) {
            return {
                success: true,
                output: `已强制终止进程 ${pid}`
            };
        }
        return {
            success: true,
            output: `已发送终止信号到进程 ${pid}`
        };
    }

    nice(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'nice: 缺少参数'
            };
        }
        return {
            success: true,
            output: `以优先级 10 启动进程: ${args.join(' ')}`
        };
    }

    renice(args) {
        if (args.length < 2) {
            return {
                success: false,
                output: 'renice: 缺少参数'
            };
        }
        return {
            success: true,
            output: `已调整进程优先级`
        };
    }

    free(args) {
        if (args.includes('-h')) {
            return {
                success: true,
                output: '              total        used        free      shared  buff/cache   available\nMem:          7.6Gi       2.0Gi       256Mi       128Mi       5.4Gi       5.3Gi\nSwap:         2.0Gi          0B       2.0Gi'
            };
        }
        return {
            success: true,
            output: '              total        used        free      shared  buff/cache   available\nMem:        7823456     2048000      262144      131072     5519312     5562368\nSwap:       2097152           0     2097152'
        };
    }

    df(args) {
        if (args.includes('-h')) {
            return {
                success: true,
                output: '文件系统        容量  已用  可用 已用% 挂载点\n/dev/sda1       100G   25G   75G   25% /\ntmpfs           3.9G     0  3.9G    0% /dev/shm\n/dev/sda2       500G  150G  350G   30% /home'
            };
        }
        return {
            success: true,
            output: '文件系统        1K-块    已用     可用 已用% 挂载点\n/dev/sda1    104857600 26214400 78643200   25% /\ntmpfs          4096000        0  4096000    0% /dev/shm\n/dev/sda2    524288000 157286400 367001600   30% /home'
        };
    }

    du(args) {
        if (args.includes('-h')) {
            return {
                success: true,
                output: '4.0K\t./file1.txt\n8.0K\t./file2.txt\n12K\t.'
            };
        }
        return {
            success: true,
            output: '4\t./file1.txt\n8\t./file2.txt\n12\t.'
        };
    }

    uptime(args) {
        return {
            success: true,
            output: ` ${new Date().toTimeString().split(' ')[0]} up 2 days,  5:30,  2 users,  load average: 0.52, 0.58, 0.59`
        };
    }

    netstat(args) {
        if (args.includes('-tuln')) {
            return {
                success: true,
                output: 'Active Internet connections (only servers)\nProto Recv-Q Send-Q Local Address           Foreign Address         State\ntcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN\ntcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN\ntcp6       0      0 :::8080                 :::*                    LISTEN\nudp        0      0 0.0.0.0:68              0.0.0.0:*'
            };
        }
        return {
            success: true,
            output: 'Active Internet connections\nProto Recv-Q Send-Q Local Address           Foreign Address         State\ntcp        0      0 localhost:ssh           localhost:54321        ESTABLISHED'
        };
    }

    gcc(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'gcc: 缺少参数'
            };
        }
        if (args.includes('--version')) {
            return {
                success: true,
                output: 'gcc (Ubuntu 11.4.0-1ubuntu1~22.04) 11.4.0\nCopyright (C) 2021 Free Software Foundation, Inc.'
            };
        }
        if (args.includes('-o')) {
            const outputIndex = args.indexOf('-o') + 1;
            const outputFile = args[outputIndex] || 'a.out';
            return {
                success: true,
                output: `编译成功，生成可执行文件: ${outputFile}`
            };
        }
        return {
            success: true,
            output: '编译完成'
        };
    }

    java(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'java: 缺少参数'
            };
        }
        if (args[0] === '-version') {
            return {
                success: true,
                output: 'openjdk version "17.0.2" 2022-01-18\nOpenJDK Runtime Environment (build 17.0.2+8-Ubuntu-120.04)\nOpenJDK 64-Bit Server VM (build 17.0.2+8-Ubuntu-120.04, mixed mode, sharing)'
            };
        }
        return {
            success: true,
            output: `执行 Java 程序: ${args[0]}\n程序运行完成`
        };
    }

    javac(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'javac: 缺少参数'
            };
        }
        if (args[0] === '-version') {
            return {
                success: true,
                output: 'javac 17.0.2'
            };
        }
        return {
            success: true,
            output: `编译 Java 文件: ${args.join(' ')}\n编译成功`
        };
    }

    mvn(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'mvn: 缺少参数'
            };
        }
        if (args[0] === '-version') {
            return {
                success: true,
                output: 'Apache Maven 3.8.6 (84538c9988a25aec085021c365c560670ad80f63)\nMaven home: /usr/share/maven\nJava version: 17.0.2, vendor: Private Build\nOS name: "linux", version: "5.15.0-60-generic", arch: "amd64", family: "unix"'
            };
        }

        const cmd = args[0];
        switch (cmd) {
            case 'compile':
                return {
                    success: true,
                    output: '[INFO] Scanning for projects...\n[INFO] Building myapp 1.0.0\n[INFO] ----------------------------------------\n[INFO] Compiling 5 source files\n[INFO] BUILD SUCCESS\n[INFO] Total time:  3.456 s'
                };
            case 'test':
                return {
                    success: true,
                    output: '[INFO] Running com.example.AppTest\nTests run: 5, Failures: 0, Errors: 0, Skipped: 0\n[INFO] BUILD SUCCESS'
                };
            case 'package':
                return {
                    success: true,
                    output: '[INFO] Building jar: /home/user/projects/target/myapp-1.0.0.jar\n[INFO] BUILD SUCCESS'
                };
            case 'install':
                return {
                    success: true,
                    output: '[INFO] Installing /home/user/projects/target/myapp-1.0.0.jar\n[INFO] BUILD SUCCESS'
                };
            case 'clean':
                return {
                    success: true,
                    output: '[INFO] Deleting /home/user/projects/target\n[INFO] BUILD SUCCESS'
                };
            case 'archetype:generate':
                return {
                    success: true,
                    output: '[INFO] Generating project in Interactive mode\n[INFO] Project created from Archetype in dir: /home/user/projects/myapp\n[INFO] BUILD SUCCESS'
                };
            case 'dependency:tree':
                return {
                    success: true,
                    output: '[INFO] com.example:myapp:jar:1.0.0\n[INFO] +- org.springframework:spring-core:jar:5.3.20:compile\n[INFO] |  \\- org.springframework:spring-jcl:jar:5.3.20:compile\n[INFO] \\- org.slf4j:slf4j-api:jar:1.7.36:compile\n[INFO] BUILD SUCCESS'
                };
            case 'versions:display-dependency-updates':
                return {
                    success: true,
                    output: '[INFO] Scanning for updates...\n[INFO] org.springframework:spring-core .... 5.3.20 -> 6.0.10\n[INFO] org.slf4j:slf4j-api ................. 1.7.36 -> 2.0.7\n[INFO] BUILD SUCCESS'
                };
            case 'exec:java':
                return {
                    success: true,
                    output: '[INFO] Scanning for projects...\n[INFO] Executing main class: com.example.App\nHello World from Maven!\n[INFO] BUILD SUCCESS'
                };
            default:
                return {
                    success: true,
                    output: `[INFO] Executing ${cmd}\n[INFO] BUILD SUCCESS`
                };
        }
    }

    gh(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'gh: 缺少参数'
            };
        }
        if (args[0] === '--version') {
            return {
                success: true,
                output: 'gh version 2.40.0 (2024-01-15)'
            };
        }

        const subCmd = args[0];
        const subArgs = args.slice(1);

        switch (subCmd) {
            case 'auth':
                if (subArgs[0] === 'login') {
                    return {
                        success: true,
                        output: '? What account do you want to log into? GitHub.com\n? What is your preferred protocol for Git operations? HTTPS\n? Authenticate Git with your GitHub credentials? Yes\n✓ Logged in as user'
                    };
                }
                if (subArgs[0] === 'status') {
                    return {
                        success: true,
                        output: 'github.com\n  ✓ Logged in to github.com as user (/home/user/.config/gh/hosts.yml)\n  ✓ Git operations for github.com configured to use https protocol.\n  ✓ Token: gho_************************************'
                    };
                }
                return {
                    success: true,
                    output: ''
                };
            case 'repo':
                if (subArgs[0] === 'create') {
                    return {
                        success: true,
                        output: '✓ Created repository user/myapp on GitHub\n  https://github.com/user/myapp'
                    };
                }
                if (subArgs[0] === 'clone') {
                    return {
                        success: true,
                        output: `Cloning into 'myapp'...\nremote: Enumerating objects: 100, done.\nremote: Counting objects: 100% (100/100), done.\nremote: Total 100 (delta 25), reused 100 (delta 25), pack-reused 0\nReceiving objects: 100% (100/100), done.`
                    };
                }
                return {
                    success: true,
                    output: ''
                };
            case 'issue':
                if (subArgs[0] === 'create') {
                    return {
                        success: true,
                        output: 'https://github.com/user/myapp/issues/1'
                    };
                }
                if (subArgs[0] === 'list') {
                    return {
                        success: true,
                        output: 'Showing 3 of 3 issues in user/myapp that match your search\n\n#1  Bug in authentication  opened 1h ago\n#2  Feature request       opened 2d ago\n#3  Documentation update  opened 1w ago'
                    };
                }
                return {
                    success: true,
                    output: ''
                };
            case 'pr':
                if (subArgs[0] === 'create') {
                    return {
                        success: true,
                        output: 'https://github.com/user/myapp/pull/1'
                    };
                }
                if (subArgs[0] === 'list') {
                    return {
                        success: true,
                        output: 'Showing 2 of 2 open pull requests in user/myapp\n\n#1  Add new feature  feature/new-feature  opened 1h ago\n#2  Fix bug          bugfix/auth         opened 2d ago'
                    };
                }
                if (subArgs[0] === 'checkout') {
                    return {
                        success: true,
                        output: 'Switched to branch "feature/new-feature"'
                    };
                }
                return {
                    success: true,
                    output: ''
                };
            case 'run':
                if (subArgs[0] === 'list') {
                    return {
                        success: true,
                        output: 'Showing 3 recent workflow runs\n\nSTATUS  NAME           BRANCH  EVENT  ID\n✓       CI             main    push   1234567890\n✗       Deploy         main    push   1234567889\n✓       Test           dev     push   1234567888'
                    };
                }
                if (subArgs[0] === 'view') {
                    return {
                        success: true,
                        output: 'CI main · 1234567890\nTriggered via push about 1 hour ago\n\nJOBS\n✓ build (3s)\n✓ test (5s)\n✓ lint (2s)'
                    };
                }
                return {
                    success: true,
                    output: ''
                };
            case 'release':
                if (subArgs[0] === 'list') {
                    return {
                        success: true,
                        output: 'Showing 3 releases in user/myapp\n\nv1.2.0  Latest  v1.2.0  about 1 day ago\nv1.1.0          v1.1.0  about 1 week ago\nv1.0.0          v1.0.0  about 1 month ago'
                    };
                }
                return {
                    success: true,
                    output: ''
                };
            default:
                return {
                    success: false,
                    output: `gh: '${subCmd}' 不是一个 gh 命令。`
                };
        }
    }

    claude(args) {
        if (args.length === 0) {
            return {
                success: true,
                output: 'Claude CLI - AI Assistant\nUsage: claude [command] [options]\n\nCommands:\n  chat      Start an interactive chat session\n  code      Generate code snippets\n  explain   Explain code or concepts\n  review    Review code for improvements\n  test      Generate test cases\n  --help    Show this help message\n  --version Show version information'
            };
        }
        if (args[0] === '--version') {
            return {
                success: true,
                output: 'claude version 1.0.0'
            };
        }
        if (args[0] === '--help') {
            return {
                success: true,
                output: 'Claude CLI - AI Assistant\n\nUsage: claude [command] [options]\n\nCommands:\n  chat      Start an interactive chat session\n  code      Generate code snippets\n  explain   Explain code or concepts\n  review    Review code for improvements\n  test      Generate test cases\n\nOptions:\n  --help    Show this help message\n  --version Show version information\n\nExamples:\n  claude chat\n  claude code "function to sort array"\n  claude explain "async/await in JavaScript"'
            };
        }

        const subCmd = args[0];
        switch (subCmd) {
            case 'chat':
                return {
                    success: true,
                    output: 'Starting interactive chat session...\n\nClaude: Hello! How can I help you today?\n\n> '
                };
            case 'code':
                return {
                    success: true,
                    output: 'Generating code...\n\n```javascript\nfunction sortArray(arr) {\n  return arr.sort((a, b) => a - b);\n}\n```\n\nCode generated successfully!'
                };
            case 'explain':
                return {
                    success: true,
                    output: 'Explanation:\n\nAsync/await is a syntax for handling asynchronous operations in JavaScript.\n\n- async: Declares an asynchronous function\n- await: Pauses execution until a Promise is resolved\n\nExample:\nasync function fetchData() {\n  const response = await fetch(url);\n  return response.json();\n}'
                };
            case 'review':
                return {
                    success: true,
                    output: 'Code Review Results:\n\n✓ Good: Function has a clear purpose\n✓ Good: Proper error handling\n⚠ Suggestion: Consider adding input validation\n⚠ Suggestion: Add JSDoc comments\n\nOverall: Good code quality with room for minor improvements.'
                };
            case 'test':
                return {
                    success: true,
                    output: 'Generated test cases:\n\ndescribe("sortArray", () => {\n  test("should sort numbers in ascending order", () => {\n    expect(sortArray([3, 1, 2])).toEqual([1, 2, 3]);\n  });\n\n  test("should handle empty array", () => {\n    expect(sortArray([])).toEqual([]);\n  });\n});'
                };
            default:
                return {
                    success: true,
                    output: `Executing claude ${subCmd}...`
                };
        }
    }

    openclaw(args) {
        if (args.length === 0) {
            return {
                success: true,
                output: 'OpenClaw - Web Scraping Tool\nUsage: openclaw [command] [options]\n\nCommands:\n  scrape    Scrape a website\n  extract   Extract data from HTML\n  crawl     Crawl multiple pages\n  --help    Show this help message\n  --version Show version information'
            };
        }
        if (args[0] === '--version') {
            return {
                success: true,
                output: 'openclaw version 2.1.0'
            };
        }
        if (args[0] === '--help') {
            return {
                success: true,
                output: 'OpenClaw - Web Scraping Tool\n\nUsage: openclaw [command] [options]\n\nCommands:\n  scrape    Scrape a website\n  extract   Extract data from HTML\n  crawl     Crawl multiple pages\n\nOptions:\n  --url     Target URL\n  --output  Output file\n  --format  Output format (json/csv)\n  --help    Show this help message\n  --version Show version information\n\nExamples:\n  openclaw scrape --url https://example.com\n  openclaw extract --file page.html --selector ".title"'
            };
        }

        const subCmd = args[0];
        switch (subCmd) {
            case 'scrape':
                return {
                    success: true,
                    output: 'Scraping website...\n✓ Connected to https://example.com\n✓ Downloaded page (15.3 KB)\n✓ Extracted 25 items\n✓ Saved to output.json'
                };
            case 'extract':
                return {
                    success: true,
                    output: 'Extracting data...\n✓ Loaded HTML file\n✓ Found 10 matching elements\n✓ Extracted data:\n  - Title: "Example"\n  - Price: "$19.99"\n  - Rating: "4.5/5"'
                };
            case 'crawl':
                return {
                    success: true,
                    output: 'Starting crawler...\n✓ Crawling page 1/10\n✓ Crawling page 2/10\n✓ Crawling page 3/10\n...\n✓ Crawled 10 pages\n✓ Found 150 items total\n✓ Saved to crawl_results.json'
                };
            default:
                return {
                    success: true,
                    output: `Executing openclaw ${subCmd}...`
                };
        }
    }

    iostat(args) {
        return {
            success: true,
            output: `Linux 5.15.0-60-generic (hostname)   ${new Date().toDateString()}   _x86_64_    (4 CPU)\n\navg-cpu:  %user   %nice %system %iowait  %steal   %idle\n           5.23    0.00    2.15    0.52    0.00   92.10\n\nDevice             tps    kB_read/s    kB_wrtn/s    kB_dscd/s    kB_read    kB_wrtn    kB_dscd\nsda               5.23       125.45        45.67         0.00     125450      45670          0\nsdb               2.15        45.23        12.34         0.00      45230      12340          0`
        };
    }

    sudo(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'sudo: 缺少参数'
            };
        }
        if (args[0] === '-l') {
            return {
                success: true,
                output: 'Matching Defaults entries for user on hostname:\n    env_reset, mail_badpass, secure_path=/usr/local/sbin\\:/usr/local/bin\\:/usr/sbin\\:/usr/bin\\:/sbin\\:/bin\n\nUser user may run the following commands on hostname:\n    (ALL : ALL) ALL'
            };
        }
        return {
            success: true,
            output: `[sudo] password for user: \n执行命令: ${args.join(' ')}\n命令执行成功`
        };
    }

    lastCmd(args) {
        return {
            success: true,
            output: `user     pts/0        192.168.1.100    ${new Date().toDateString().replace(/\d{4}$/, '')} still logged in\nuser     pts/1        192.168.1.101    ${new Date(Date.now() - 86400000).toDateString().replace(/\d{4}$/, '')} - ${new Date(Date.now() - 43200000).toDateString().replace(/\d{4}$/, '')}  (12:00)\nreboot   system boot  5.15.0-60-generi ${new Date(Date.now() - 172800000).toDateString().replace(/\d{4}$/, '')}   still running\n\nwtmp begins ${new Date(Date.now() - 604800000).toDateString()}`
        };
    }

    lastb(args) {
        return {
            success: true,
            output: `user     ssh:notty    192.168.1.200    ${new Date(Date.now() - 3600000).toDateString()} - ${new Date(Date.now() - 3600000).toDateString()}  (00:01)\nunknown  ssh:notty    10.0.0.1         ${new Date(Date.now() - 7200000).toDateString()} - ${new Date(Date.now() - 7200000).toDateString()}  (00:00)\n\nbtmp begins ${new Date(Date.now() - 604800000).toDateString()}`
        };
    }

    mysqldump(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'mysqldump: 缺少参数'
            };
        }
        return {
            success: true,
            output: `-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)\n--\n-- Host: localhost    Database: mydb\n-- ------------------------------------------------------\n-- Server version       8.0.32-0ubuntu0.22.04.2\n\n/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;\n/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;\n\n--\n-- Table structure for table \`users\`\n--\n\nDROP TABLE IF EXISTS \`users\`;\n/*!40101 SET @saved_cs_client     = @@character_set_client */;\n\n--\n-- Dumping data for table \`users\`\n--\n\nLOCK TABLES \`users\` WRITE;\n/*!40000 ALTER TABLE \`users\` DISABLE KEYS */;\nINSERT INTO \`users\` VALUES (1,'admin','admin@example.com'),(2,'user','user@example.com');\n/*!40000 ALTER TABLE \`users\` ENABLE KEYS */;\nUNLOCK TABLES;\n\n-- Dump completed on ${new Date().toDateString()}`
        };
    }

    mysql(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'mysql: 缺少参数'
            };
        }
        return {
            success: true,
            output: `Welcome to the MySQL monitor.  Commands end with ; or \\g.\nYour MySQL connection id is 8\nServer version: 8.0.32-0ubuntu0.22.04.2 (Ubuntu)\n\nCopyright (c) 2000, 2023, Oracle and/or its affiliates.\n\nType 'help;' or '\\h' for help. Type '\\c' to clear the current input statement.\n\nmysql> `
        };
    }

    gunzip(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'gunzip: 缺少参数'
            };
        }
        return {
            success: true,
            output: `解压文件: ${args[0]}\n已生成: ${args[0].replace('.gz', '')}`
        };
    }

    scp(args) {
        if (args.length < 2) {
            return {
                success: false,
                output: 'scp: 缺少参数'
            };
        }
        return {
            success: true,
            output: `${args[0]}                                    100%  1234     1.2MB/s   00:00`
        };
    }

    rsync(args) {
        if (args.length === 0) {
            return {
                success: false,
                output: 'rsync: 缺少参数'
            };
        }
        return {
            success: true,
            output: `sending incremental file list\nfile1.txt\nfile2.txt\n\nsent 1,234 bytes  received 35 bytes  2,538.00 bytes/sec\ntotal size is 12,345  speedup is 9.73`
        };
    }

    showHelp(cmd) {
        const helpMap = {
            ls: {
                usage: 'ls [选项] [目录]',
                desc: '列出目录内容',
                options: [
                    ['-a, --all', '显示所有文件（包括隐藏文件）'],
                    ['-l', '使用长格式显示详细信息'],
                    ['-h, --human-readable', '与-l一起使用，以人类可读的格式显示文件大小'],
                    ['-R, --recursive', '递归列出子目录']
                ]
            },
            pwd: {
                usage: 'pwd',
                desc: '显示当前工作目录的完整路径'
            },
            cd: {
                usage: 'cd [目录]',
                desc: '切换当前工作目录',
                options: [
                    ['cd ~', '切换到用户主目录'],
                    ['cd ..', '切换到上一级目录'],
                    ['cd -', '切换到上一个工作目录']
                ]
            },
            mkdir: {
                usage: 'mkdir [选项] 目录名',
                desc: '创建新目录',
                options: [
                    ['-p, --parents', '创建多级目录（父目录不存在时自动创建）'],
                    ['-v, --verbose', '显示创建的详细信息']
                ]
            },
            touch: {
                usage: 'touch 文件名',
                desc: '创建空文件或更新文件时间戳'
            },
            cat: {
                usage: 'cat [选项] 文件名',
                desc: '显示文件内容',
                options: [
                    ['-n, --number', '显示行号'],
                    ['-b, --number-nonblank', '对非空行显示行号']
                ]
            },
            rm: {
                usage: 'rm [选项] 文件名',
                desc: '删除文件或目录',
                options: [
                    ['-f, --force', '强制删除，忽略不存在的文件'],
                    ['-r, -R, --recursive', '递归删除目录及其内容'],
                    ['-i', '删除前逐一询问确认']
                ]
            },
            rmdir: {
                usage: 'rmdir 目录名',
                desc: '删除空目录'
            },
            cp: {
                usage: 'cp [选项] 源文件 目标文件',
                desc: '复制文件或目录',
                options: [
                    ['-r, -R, --recursive', '递归复制目录'],
                    ['-i, --interactive', '覆盖前询问'],
                    ['-v, --verbose', '显示复制详情']
                ]
            },
            mv: {
                usage: 'mv [选项] 源文件 目标文件',
                desc: '移动或重命名文件/目录',
                options: [
                    ['-i, --interactive', '覆盖前询问'],
                    ['-f, --force', '强制覆盖'],
                    ['-v, --verbose', '显示移动详情']
                ]
            },
            grep: {
                usage: 'grep [选项] 搜索模式 文件名',
                desc: '在文件中搜索匹配的文本',
                options: [
                    ['-i, --ignore-case', '忽略大小写'],
                    ['-n, --line-number', '显示行号'],
                    ['-r, -R, --recursive', '递归搜索目录'],
                    ['-v, --invert-match', '反向匹配（显示不匹配的行）'],
                    ['-c, --count', '只显示匹配的行数']
                ]
            },
            chmod: {
                usage: 'chmod [选项] 权限 文件名',
                desc: '更改文件权限',
                options: [
                    ['+r, +w, +x', '添加读、写、执行权限'],
                    ['-r, -w, -x', '移除读、写、执行权限'],
                    ['-R, --recursive', '递归更改目录权限'],
                    ['数字模式', '如755、644等（rwxr-xr-x、rw-r--r--）']
                ]
            },
            find: {
                usage: 'find 路径 [选项] [表达式]',
                desc: '在目录树中查找文件',
                options: [
                    ['-name 模式', '按文件名查找'],
                    ['-type 类型', '按文件类型查找（f=文件, d=目录）'],
                    ['-size 大小', '按文件大小查找'],
                    ['-mtime 天数', '按修改时间查找']
                ]
            },
            whereis: {
                usage: 'whereis 命令名',
                desc: '查找命令的二进制文件、源码文件和手册页位置'
            },
            head: {
                usage: 'head [选项] 文件名',
                desc: '显示文件开头的内容',
                options: [
                    ['-n 行数, --lines=行数', '显示前N行'],
                    ['-c 字节数, --bytes=字节数', '显示前N个字节']
                ]
            },
            tail: {
                usage: 'tail [选项] 文件名',
                desc: '显示文件末尾的内容',
                options: [
                    ['-n 行数, --lines=行数', '显示后N行'],
                    ['-f, --follow', '实时跟踪文件新增的内容（常用于日志）']
                ]
            },
            more: {
                usage: 'more 文件名',
                desc: '分页显示文件内容（空格翻页，q退出）'
            },
            less: {
                usage: 'less 文件名',
                desc: '分页显示文件内容（支持上下翻页，q退出）'
            },
            tar: {
                usage: 'tar [选项] 压缩包名 文件/目录',
                desc: '打包和解包文件（可配合gzip/bzip2压缩）',
                options: [
                    ['-c, --create', '创建新的打包文件'],
                    ['-x, --extract', '解包文件'],
                    ['-v, --verbose', '显示处理详情'],
                    ['-f, --file', '指定打包文件名'],
                    ['-z, --gzip', '使用gzip压缩/解压'],
                    ['-j, --bzip2', '使用bzip2压缩/解压']
                ],
                examples: [
                    'tar -cvf archive.tar dir/  # 打包目录',
                    'tar -xzvf archive.tar.gz   # 解压gzip压缩包',
                    'tar -czvf archive.tar.gz dir/  # 打包并gzip压缩'
                ]
            },
            gzip: {
                usage: 'gzip [选项] 文件名',
                desc: '压缩文件（生成.gz文件）',
                options: [
                    ['-d, --decompress', '解压文件'],
                    ['-k, --keep', '保留原文件'],
                    ['-r, --recursive', '递归压缩目录']
                ]
            },
            bzip2: {
                usage: 'bzip2 [选项] 文件名',
                desc: '使用bzip2算法压缩文件（生成.bz2文件）',
                options: [
                    ['-d, --decompress', '解压文件'],
                    ['-k, --keep', '保留原文件'],
                    ['-z, --compress', '强制压缩']
                ]
            },
            git: {
                usage: 'git [子命令] [选项]',
                desc: '分布式版本控制系统',
                options: [
                    ['git init', '初始化仓库'],
                    ['git add 文件', '添加文件到暂存区'],
                    ['git commit -m "消息"', '提交更改'],
                    ['git status', '查看状态'],
                    ['git log', '查看提交历史'],
                    ['git branch', '列出分支'],
                    ['git checkout 分支', '切换分支'],
                    ['git merge 分支', '合并分支'],
                    ['git clone 地址', '克隆远程仓库'],
                    ['git push', '推送到远程'],
                    ['git pull', '从远程拉取']
                ]
            },
            docker: {
                usage: 'docker [子命令] [选项]',
                desc: '容器化平台，用于创建、部署和运行容器',
                options: [
                    ['docker ps', '查看运行中的容器'],
                    ['docker ps -a', '查看所有容器'],
                    ['docker images', '查看本地镜像'],
                    ['docker pull 镜像', '拉取镜像'],
                    ['docker run 镜像', '运行容器'],
                    ['docker stop 容器ID', '停止容器'],
                    ['docker rm 容器ID', '删除容器'],
                    ['docker rmi 镜像ID', '删除镜像'],
                    ['docker build -t 名称 .', '构建镜像'],
                    ['docker logs 容器ID', '查看容器日志'],
                    ['docker exec -it 容器ID /bin/bash', '进入容器'],
                    ['docker --version', '查看版本']
                ]
            },
            vim: {
                usage: 'vim [选项] 文件名',
                desc: '强大的文本编辑器',
                options: [
                    ['i', '进入插入模式'],
                    ['ESC', '退出插入模式'],
                    [':w', '保存文件'],
                    [':q', '退出Vim'],
                    [':wq', '保存并退出'],
                    [':q!', '强制退出不保存'],
                    ['dd', '删除当前行'],
                    ['yy', '复制当前行'],
                    ['p', '粘贴'],
                    ['u', '撤销'],
                    ['/搜索词', '搜索文本'],
                    [':set nu', '显示行号']
                ]
            },
            vi: {
                usage: 'vi [选项] 文件名',
                desc: '文本编辑器（vim的简化版）'
            },
            systemctl: {
                usage: 'systemctl [子命令] 服务名',
                desc: '管理系统服务的命令',
                options: [
                    ['systemctl start 服务', '启动服务'],
                    ['systemctl stop 服务', '停止服务'],
                    ['systemctl restart 服务', '重启服务'],
                    ['systemctl status 服务', '查看服务状态'],
                    ['systemctl enable 服务', '设置开机启动'],
                    ['systemctl disable 服务', '取消开机启动'],
                    ['systemctl list-units', '列出所有单元']
                ]
            },
            journalctl: {
                usage: 'journalctl [选项]',
                desc: '查看系统日志',
                options: [
                    ['-u 服务名', '查看指定服务的日志'],
                    ['-f', '实时跟踪日志'],
                    ['-n 行数', '显示最近的N行日志'],
                    ['--since "时间"', '查看指定时间之后的日志'],
                    ['--until "时间"', '查看指定时间之前的日志']
                ]
            },
            clear: {
                usage: 'clear',
                desc: '清屏'
            },
            help: {
                usage: 'help [命令]',
                desc: '显示帮助信息'
            },
            exit: {
                usage: 'exit',
                desc: '退出终端'
            }
        };

        const helpInfo = helpMap[cmd];
        if (!helpInfo) {
            return {
                success: false,
                output: `没有找到 '${cmd}' 的帮助信息。`
            };
        }

        let output = `名称:\n  ${cmd} - ${helpInfo.desc}\n\n用法:\n  ${helpInfo.usage}`;
        
        if (helpInfo.options) {
            output += '\n\n选项:';
            const maxLen = Math.max(...helpInfo.options.map(opt => opt[0].length));
            for (const [opt, desc] of helpInfo.options) {
                const padded = opt.padEnd(maxLen + 2);
                output += `\n  ${padded} ${desc}`;
            }
        }

        if (helpInfo.examples) {
            output += '\n\n示例:';
            for (const ex of helpInfo.examples) {
                output += `\n  ${ex}`;
            }
        }

        return {
            success: true,
            output: output
        };
    }
}

window.VirtualFileSystem = VirtualFileSystem;
window.CommandSimulator = CommandSimulator;
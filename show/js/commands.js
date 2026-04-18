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
            default:
                return {
                    success: false,
                    output: `命令 '${cmd}' 未找到。输入 'help' 查看可用命令。`
                };
        }
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
                return {
                    success: true,
                    output: ''
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
}

window.VirtualFileSystem = VirtualFileSystem;
window.CommandSimulator = CommandSimulator;
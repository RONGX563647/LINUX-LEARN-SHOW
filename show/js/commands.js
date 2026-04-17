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
        const commands = [
            'ls      - 列出目录内容',
            'pwd     - 显示当前工作目录',
            'cd      - 切换目录',
            'mkdir   - 创建目录',
            'touch   - 创建文件',
            'cat     - 显示文件内容',
            'rm      - 删除文件',
            'rmdir   - 删除空目录',
            'cp      - 复制文件',
            'mv      - 移动/重命名文件',
            'grep    - 搜索文本',
            'chmod   - 改变权限',
            'find    - 查找文件',
            'whereis - 查找命令位置',
            'head    - 显示文件开头',
            'tail    - 显示文件末尾',
            'more    - 分页显示',
            'less    - 分页显示',
            'clear   - 清屏',
            'help    - 显示帮助',
            'exit    - 退出'
        ];

        return {
            success: true,
            output: '可用命令:\n' + commands.join('\n')
        };
    }

    exit(args) {
        return {
            success: true,
            output: '再见！',
            exit: true
        };
    }
}

window.VirtualFileSystem = VirtualFileSystem;
window.CommandSimulator = CommandSimulator;
/* 终端模拟器 - Linux命令学习页面 */

class Terminal {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            prompt: 'user@linux:~$ ',
            theme: 'classic',
            ...options
        };

        this.fs = new VirtualFileSystem();
        this.simulator = new CommandSimulator(this.fs);
        this.validator = new CommandValidator();

        this.history = [];
        this.historyIndex = -1;
        this.outputBuffer = [];

        this.onCommandExecuted = null;
        this.onCommandValidated = null;

        this.init();
    }

    init() {
        this.createTerminalUI();
        this.bindEvents();
        this.updatePrompt();
    }

    createTerminalUI() {
        this.container.innerHTML = `
            <div class="terminal">
                <div class="terminal-header">
                    <div class="terminal-dot red"></div>
                    <div class="terminal-dot yellow"></div>
                    <div class="terminal-dot green"></div>
                </div>
                <div class="terminal-output" id="terminalOutput"></div>
                <div class="terminal-input-line">
                    <span class="terminal-prompt" id="terminalPrompt">${this.options.prompt}</span>
                    <input type="text" class="terminal-input" id="terminalInput" 
                           placeholder="输入命令..." autocomplete="off" autofocus>
                </div>
            </div>
        `;

        this.outputElement = document.getElementById('terminalOutput');
        this.inputElement = document.getElementById('terminalInput');
        this.promptElement = document.getElementById('terminalPrompt');
    }

    bindEvents() {
        this.inputElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.executeCommand();
            } else if (e.key === 'ArrowUp') {
                this.navigateHistory(-1);
                e.preventDefault();
            } else if (e.key === 'ArrowDown') {
                this.navigateHistory(1);
                e.preventDefault();
            } else if (e.key === 'Tab') {
                this.autoComplete();
                e.preventDefault();
            } else if (e.key === 'l' && e.ctrlKey) {
                this.clear();
                e.preventDefault();
            }
        });

        this.inputElement.addEventListener('focus', () => {
            this.container.querySelector('.terminal').classList.add('focused');
        });

        this.inputElement.addEventListener('blur', () => {
            this.container.querySelector('.terminal').classList.remove('focused');
        });

        this.container.addEventListener('click', () => {
            this.inputElement.focus();
        });
    }

    executeCommand() {
        const command = this.inputElement.value.trim();

        if (!command) {
            this.printOutput('');
            this.inputElement.value = '';
            return;
        }

        this.history.push(command);
        this.historyIndex = this.history.length;

        this.printOutput(`${this.options.prompt}${command}`);

        const result = this.simulator.execute(command);

        if (result.clear) {
            this.clear();
        } else if (result.output) {
            this.printOutput(result.output, result.success ? 'success' : 'error');
        }

        if (result.exit) {
            this.printOutput('再见！', 'info');
        }

        this.updatePrompt();

        this.inputElement.value = '';

        if (this.onCommandExecuted) {
            this.onCommandExecuted(command, result);
        }
    }

    validateCommand(command, validationRule) {
        const result = this.validator.validate(command, validationRule);

        if (this.onCommandValidated) {
            this.onCommandValidated(command, result);
        }

        return result;
    }

    printOutput(text, type = '') {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.textContent = text;
        this.outputElement.appendChild(line);
        this.scrollToBottom();
    }

    printHTML(html) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = html;
        this.outputElement.appendChild(line);
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.outputElement.scrollTop = this.outputElement.scrollHeight;
    }

    clear() {
        this.outputElement.innerHTML = '';
    }

    updatePrompt() {
        const currentDir = this.fs.currentPath;
        const displayPath = currentDir === '/home/user' ? '~' : currentDir;
        this.options.prompt = `user@linux:${displayPath}$ `;
        this.promptElement.textContent = this.options.prompt;
    }

    navigateHistory(direction) {
        if (this.history.length === 0) return;

        this.historyIndex += direction;

        if (this.historyIndex < 0) {
            this.historyIndex = 0;
        } else if (this.historyIndex >= this.history.length) {
            this.historyIndex = this.history.length;
            this.inputElement.value = '';
            return;
        }

        this.inputElement.value = this.history[this.historyIndex];
    }

    autoComplete() {
        const input = this.inputElement.value;
        const parts = input.split(' ');
        const lastPart = parts[parts.length - 1];

        if (parts.length === 1) {
            const commands = ['ls', 'pwd', 'cd', 'mkdir', 'touch', 'cat', 'rm', 'rmdir', 
                             'cp', 'mv', 'grep', 'chmod', 'find', 'whereis', 'head', 
                             'tail', 'more', 'less', 'tar', 'gzip', 'bzip2', 'clear', 'help'];
            const matches = commands.filter(cmd => cmd.startsWith(lastPart));
            if (matches.length === 1) {
                this.inputElement.value = matches[0] + ' ';
            } else if (matches.length > 1) {
                this.printOutput(matches.join('  '));
            }
        } else {
            const currentDir = this.fs.currentPath;
            const children = this.fs.getChildren(currentDir);
            const matches = children.filter(child => child.startsWith(lastPart));
            if (matches.length === 1) {
                parts[parts.length - 1] = matches[0];
                this.inputElement.value = parts.join(' ');
            } else if (matches.length > 1) {
                this.printOutput(matches.join('  '));
            }
        }
    }

    reset() {
        this.fs.reset();
        this.history = [];
        this.historyIndex = -1;
        this.clear();
        this.updatePrompt();
        this.printOutput('系统已重置', 'info');
    }

    setFileSystem(fsData) {
        this.fs.root = fsData;
        this.fs.currentPath = '/home/user';
        this.updatePrompt();
    }

    getFileSystem() {
        return this.fs;
    }

    getSimulator() {
        return this.simulator;
    }

    getValidator() {
        return this.validator;
    }

    showWelcome() {
        this.printOutput('');
        this.printOutput('欢迎使用 Linux 命令学习系统！', 'info');
        this.printOutput('');
        this.printOutput('输入 help 查看可用命令', 'info');
        this.printOutput('');
    }

    showHint(hint) {
        this.printOutput('');
        this.printOutput(`提示: ${hint}`, 'info');
        this.printOutput('');
    }

    showSuccess(message) {
        this.printOutput('');
        this.printOutput(`✓ ${message}`, 'success');
        this.printOutput('');
    }

    showError(message) {
        this.printOutput('');
        this.printOutput(`✗ ${message}`, 'error');
        this.printOutput('');
    }

    showFeedback(result) {
        if (result.success) {
            this.showSuccess(result.message);
        } else {
            this.showError(result.message);
            if (result.hint) {
                this.showHint(result.hint);
            }
        }
    }

    focus() {
        this.inputElement.focus();
    }

    setPrompt(prompt) {
        this.options.prompt = prompt;
        this.promptElement.textContent = prompt;
    }

    disable() {
        this.inputElement.disabled = true;
    }

    enable() {
        this.inputElement.disabled = false;
        this.inputElement.focus();
    }

    executeAndValidate(command, validationRule) {
        this.inputElement.value = command;
        this.executeCommand();
        return this.validateCommand(command, validationRule);
    }

    getHistory() {
        return this.history;
    }

    setHistory(history) {
        this.history = history || [];
        this.historyIndex = this.history.length;
    }
}

window.Terminal = Terminal;
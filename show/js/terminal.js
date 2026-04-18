/* 终端模拟器 - 纯终端 */

class Terminal {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            prompt: 'user@linux:~$ ',
            theme: 'github-dark',
            ...options
        };

        this.fs = new VirtualFileSystem();
        this.simulator = new CommandSimulator(this.fs);
        this.validator = new CommandValidator();

        this.history = [];
        this.historyIndex = -1;

        this.onCommandExecuted = null;
        this.onCommandValidated = null;

        this.vimMode = false;
        this.vimModeIndicator = null;

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
                <div class="terminal-output-wrapper" id="outputWrapper">
                    <div class="terminal-output" id="terminalOutput"></div>
                </div>
                <div class="terminal-input-line" id="inputLine">
                    <span class="terminal-prompt" id="terminalPrompt"></span>
                    <input type="text" class="terminal-input" id="terminalInput"
                           placeholder="输入命令..." autocomplete="off" autofocus spellcheck="false">
                </div>
                <div class="terminal-status-bar" id="terminalStatusBar"></div>
            </div>
        `;

        this.outputElement = document.getElementById('terminalOutput');
        this.inputElement = document.getElementById('terminalInput');
        this.promptElement = document.getElementById('terminalPrompt');
        this.statusBarElement = document.getElementById('terminalStatusBar');
        this.inputLineElement = document.getElementById('inputLine');
        this.outputWrapper = document.getElementById('outputWrapper');
    }

    bindEvents() {
        this.inputElement.addEventListener('keydown', (e) => {
            if (this.vimMode) {
                this.handleVimModeKeydown(e);
                return;
            }

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

        this.container.addEventListener('click', () => {
            this.inputElement.focus();
        });

        document.addEventListener('keydown', (e) => {
            if (this.vimMode && this.container.contains(document.activeElement)) {
                this.handleVimModeKeydown(e);
            }
        });
    }

    handleVimModeKeydown(e) {
        e.preventDefault();
        e.stopPropagation();

        const keyCombo = this.getKeyCombo(e);
        
        if (keyCombo === 'Escape' || keyCombo === 'Ctrl+c') {
            this.exitVimMode();
            return;
        }

        if (keyCombo === 'Enter') {
            const command = this.inputElement.value.trim();
            if (command) {
                this.executeCommand();
            }
            return;
        }

        if (keyCombo.startsWith('Ctrl+')) {
            this.inputElement.value = keyCombo;
            this.executeCommand();
            return;
        }

        if (e.key.length === 1) {
            this.inputElement.value += e.key;
        } else if (e.key === 'Backspace') {
            this.inputElement.value = this.inputElement.value.slice(0, -1);
        }
    }

    getKeyCombo(e) {
        const parts = [];
        if (e.ctrlKey && e.key.toLowerCase() !== 'control') parts.push('Ctrl');
        if (e.altKey && e.key.toLowerCase() !== 'alt') parts.push('Alt');
        if (e.shiftKey && e.key.length === 1) parts.push('Shift');
        
        let key = e.key;
        if (key === ' ') key = 'Space';
        if (key === 'Escape') key = 'Escape';
        
        if (parts.length > 0 && key.length === 1) {
            return parts.join('+') + '+' + key.toLowerCase();
        } else if (parts.length > 0) {
            return parts.join('+') + '+' + key;
        }
        return key;
    }

    enterVimMode() {
        this.vimMode = true;
        this.inputElement.value = '';
        this.inputElement.placeholder = 'Vim模式 - 输入快捷键或命令，ESC退出';
        
        if (!this.vimModeIndicator) {
            this.vimModeIndicator = document.createElement('div');
            this.vimModeIndicator.className = 'vim-mode-indicator';
            this.vimModeIndicator.innerHTML = '<span class="vim-badge">VIM</span> 模式已启用';
            this.inputLineElement.insertBefore(this.vimModeIndicator, this.inputElement);
        }
        this.vimModeIndicator.style.display = 'block';
        
        this.showStatusBar('<span class="status-item mode" style="color:var(--cyan)">VIM模式</span><span class="status-sep">|</span><span class="status-item">按ESC退出</span>');
        this.focus();
    }

    exitVimMode() {
        this.vimMode = false;
        this.inputElement.value = '';
        this.inputElement.placeholder = '输入命令...';
        
        if (this.vimModeIndicator) {
            this.vimModeIndicator.style.display = 'none';
        }
        
        this.updatePrompt();
        this.focus();
    }

    isVimMode() {
        return this.vimMode;
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

        // 打印命令行 (带彩色提示符)
        const promptHTML = this.getPromptHTML();
        this.printHTML(`<div class="terminal-line command-line">${promptHTML}${this.escapeHTML(command)}</div>`);

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

    getPromptHTML() {
        const currentDir = this.fs.currentPath;
        const displayPath = currentDir === '/home/user' ? '~' : currentDir.replace('/home/user', '~');
        return `<span class="prompt-user">user</span><span class="prompt-at">@</span><span class="prompt-host">linux</span><span class="prompt-colon">:</span><span class="prompt-path">${this.escapeHTML(displayPath)}</span><span class="prompt-symbol">$ </span>`;
    }

    validateCommand(command, validationRule) {
        const result = this.validator.validate(command, validationRule);
        if (this.onCommandValidated) {
            this.onCommandValidated(command, result);
        }
        return result;
    }

    printOutput(text, type = '') {
        if (text === '' || text === undefined || text === null) {
            const line = document.createElement('div');
            line.className = 'terminal-line empty';
            this.outputElement.appendChild(line);
            this.scrollToBottom();
            return;
        }

        const lines = String(text).split('\n');
        for (const lineText of lines) {
            const line = document.createElement('div');
            line.className = `terminal-line output ${type}`;
            line.textContent = lineText;
            this.outputElement.appendChild(line);
        }
        this.scrollToBottom();
    }

    printHTML(html) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = html;
        while (wrapper.firstChild) {
            this.outputElement.appendChild(wrapper.firstChild);
        }
        this.scrollToBottom();
    }

    printLine(text, type = '') {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.textContent = text;
        this.outputElement.appendChild(line);
        this.scrollToBottom();
    }

    printStyledLine(html, type = '') {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.innerHTML = html;
        this.outputElement.appendChild(line);
        this.scrollToBottom();
    }

    scrollToBottom() {
        requestAnimationFrame(() => {
            if (this.outputWrapper) {
                this.outputWrapper.scrollTop = this.outputWrapper.scrollHeight;
            }
        });
    }

    clear() {
        this.outputElement.innerHTML = '';
    }

    printSeparator(label) {
        const line = document.createElement('div');
        line.className = 'terminal-line separator';
        line.innerHTML = `<span class="sep-line">─</span> <span class="sep-label">${this.escapeHTML(label)}</span> <span class="sep-line">─</span>`;
        this.outputElement.appendChild(line);
        this.scrollToBottom();
    }

    updatePrompt() {
        const currentDir = this.fs.currentPath;
        const displayPath = currentDir === '/home/user' ? '~' : currentDir.replace('/home/user', '~');
        this.options.prompt = `user@linux:${displayPath}$ `;
        this.promptElement.innerHTML = this.getPromptHTML();
    }

    navigateHistory(direction) {
        if (this.history.length === 0) return;
        this.historyIndex += direction;
        if (this.historyIndex < 0) this.historyIndex = 0;
        if (this.historyIndex >= this.history.length) {
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
                             'tail', 'more', 'less', 'tar', 'gzip', 'bzip2', 'clear', 'help',
                             'list', 'goto', 'back', 'next', 'menu', 'status',
                             'git', 'docker', 'vim', 'vi', 'systemctl', 'journalctl',
                             'tutorial', 'practice', 'home', 'random', 'hint', 'skip', 'reset'];
            const matches = commands.filter(cmd => cmd.startsWith(lastPart));
            if (matches.length === 1) {
                this.inputElement.value = matches[0] + ' ';
            } else if (matches.length > 1) {
                this.printOutput(matches.join('  '), 'dim');
            }
        } else {
            const currentDir = this.fs.currentPath;
            const children = this.fs.getChildren(currentDir);
            const matches = children.filter(child => child.startsWith(lastPart));
            if (matches.length === 1) {
                parts[parts.length - 1] = matches[0];
                this.inputElement.value = parts.join(' ');
            } else if (matches.length > 1) {
                this.printOutput(matches.join('  '), 'dim');
            }
        }
    }

    reset() {
        this.fs.reset();
        this.history = [];
        this.historyIndex = -1;
        this.clear();
        this.updatePrompt();
        this.printOutput('系统已重置', 'system');
    }

    setFileSystem(fsData) {
        this.fs.root = fsData;
        this.fs.currentPath = '/home/user';
        this.updatePrompt();
    }

    getFileSystem() { return this.fs; }
    getSimulator() { return this.simulator; }
    getValidator() { return this.validator; }

    showWelcome() {
        this.printLine('');
        this.printStyledLine('  <span style="color:var(--green);font-weight:700">欢迎来到 Linux 命令学习系统！</span>', '');
        this.printLine('');
        this.printLine('  输入 help 查看可用命令', 'dim');
        this.printLine('');
    }

    showHint(hint) {
        this.printLine('');
        this.printStyledLine(
            `  <span style="color:var(--yellow)">💡 提示:</span> <span style="color:var(--text-dim)">${this.escapeHTML(hint)}</span>`,
            ''
        );
        this.printLine('');
    }

    showSuccess(message) {
        this.printLine('');
        this.printStyledLine(
            `  <span style="color:var(--green)">✓</span> ${this.escapeHTML(message)}`,
            'success'
        );
        this.printLine('');
    }

    showError(message) {
        this.printLine('');
        this.printStyledLine(
            `  <span style="color:var(--red)">✗</span> ${this.escapeHTML(message)}`,
            'error'
        );
        this.printLine('');
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

    showStatusBar(info) {
        if (this.statusBarElement) {
            this.statusBarElement.innerHTML = info;
        }
    }

    focus() {
        this.inputElement.focus();
    }

    setPrompt(prompt) {
        this.options.prompt = prompt;
        this.promptElement.innerHTML = this.getPromptHTML();
    }

    setCurrentPath(path) {
        if (this.fs.exists(path) && this.fs.isDirectory(path)) {
            this.fs.currentPath = path;
            this.updatePrompt();
            return true;
        }
        return false;
    }

    disable() { this.inputElement.disabled = true; }
    enable() { this.inputElement.disabled = false; this.inputElement.focus(); }

    getHistory() { return this.history; }
    setHistory(history) {
        this.history = history || [];
        this.historyIndex = this.history.length;
    }

    escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}

window.Terminal = Terminal;

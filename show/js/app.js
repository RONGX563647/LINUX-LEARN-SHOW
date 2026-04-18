/* 主逻辑 - Linux命令学习页面 */

class App {
    constructor() {
        this.mode = 'tutorial';
        this.currentLevel = null;
        this.currentTask = null;
        this.currentTaskIndex = 0;
        this.currentScenario = null;

        this.terminal = null;
        this.validator = null;

        this.progress = this.loadProgress();

        this.init();
    }

    init() {
        this.detectMode();
        this.initTerminal();
        this.initValidator();
        this.renderUI();
        this.bindEvents();
    }

    detectMode() {
        const path = window.location.pathname;
        if (path.includes('tutorial.html')) {
            this.mode = 'tutorial';
        } else if (path.includes('practice.html')) {
            this.mode = 'practice';
        } else {
            this.mode = 'home';
        }
    }

    initTerminal() {
        if (this.mode !== 'home') {
            this.terminal = new Terminal('terminalContainer', {
                prompt: 'user@linux:~$ '
            });

            this.terminal.showWelcome();

            this.terminal.onCommandExecuted = (command, result) => {
                this.handleCommandExecuted(command, result);
            };
        }
    }

    initValidator() {
        this.validator = new CommandValidator();
    }

    loadProgress() {
        const saved = localStorage.getItem('linuxLearn_progress');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return this.getDefaultProgress();
            }
        }
        return this.getDefaultProgress();
    }

    getDefaultProgress() {
        return {
            version: '1.0',
            tutorial: {
                currentLevel: 1,
                completedLevels: [],
                levelScores: {}
            },
            practice: {
                currentScenario: 1,
                completedScenarios: [],
                scenarioProgress: {}
            },
            settings: {
                terminalTheme: 'classic',
                lastVisit: new Date().toISOString().split('T')[0]
            }
        };
    }

    saveProgress() {
        this.progress.settings.lastVisit = new Date().toISOString().split('T')[0];
        localStorage.setItem('linuxLearn_progress', JSON.stringify(this.progress));
    }

    resetProgress() {
        this.progress = this.getDefaultProgress();
        this.saveProgress();
        this.renderUI();
        if (this.terminal) {
            this.terminal.reset();
        }
    }

    renderUI() {
        if (this.mode === 'home') {
            this.renderHome();
        } else if (this.mode === 'tutorial') {
            this.renderTutorial();
        } else if (this.mode === 'practice') {
            this.renderPractice();
        }
    }

    renderHome() {
        const tutorialCompleted = this.progress.tutorial.completedLevels.length;
        const practiceCompleted = this.progress.practice.completedScenarios.length;

        const progressInfo = document.getElementById('progressInfo');
        if (progressInfo) {
            progressInfo.innerHTML = `
                <div class="progress-title">学习进度</div>
                <div class="progress-stats">
                    <div class="progress-stat">
                        <div class="progress-stat-value">${tutorialCompleted}/${tutorialLevels.length}</div>
                        <div class="progress-stat-label">教程关卡</div>
                    </div>
                    <div class="progress-stat">
                        <div class="progress-stat-value">${practiceCompleted}/${practiceScenarios.length}</div>
                        <div class="progress-stat-label">实战场景</div>
                    </div>
                </div>
            `;
        }
    }

    renderTutorial() {
        this.renderLevelList();
        this.loadLevel(this.progress.tutorial.currentLevel);
    }

    renderPractice() {
        this.renderScenarioList();
        this.loadScenario(this.progress.practice.currentScenario);
    }

    renderLevelList() {
        const levelList = document.getElementById('levelList');
        if (!levelList) return;

        levelList.innerHTML = '';

        tutorialLevels.forEach((level, index) => {
            const isCompleted = this.progress.tutorial.completedLevels.includes(level.id);
            const isCurrent = level.id === this.progress.tutorial.currentLevel;
            const isLocked = false;

            const levelItem = document.createElement('div');
            levelItem.className = `level-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'active' : ''} ${isLocked ? 'locked' : ''}`;
            levelItem.innerHTML = `
                <div class="level-icon">${isCompleted ? '✓' : index + 1}</div>
                <div class="level-name">${level.name}</div>
            `;

            if (!isLocked) {
                levelItem.addEventListener('click', () => {
                    this.selectLevel(level.id);
                });
            }

            levelList.appendChild(levelItem);
        });
    }

    renderScenarioList() {
        const scenarioList = document.getElementById('levelList');
        if (!scenarioList) return;

        scenarioList.innerHTML = '';

        practiceScenarios.forEach((scenario, index) => {
            const isCompleted = this.progress.practice.completedScenarios.includes(scenario.id);
            const isCurrent = scenario.id === this.progress.practice.currentScenario;
            const isLocked = false;

            const scenarioItem = document.createElement('div');
            scenarioItem.className = `level-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'active' : ''} ${isLocked ? 'locked' : ''}`;
            scenarioItem.innerHTML = `
                <div class="level-icon">${isCompleted ? '✓' : index + 1}</div>
                <div class="level-name">${scenario.name}</div>
            `;

            if (!isLocked) {
                scenarioItem.addEventListener('click', () => {
                    this.selectScenario(scenario.id);
                });
            }

            scenarioList.appendChild(scenarioItem);
        });
    }

    isScenarioLocked(scenario) {
        return false;
    }

    selectLevel(levelId) {
        this.progress.tutorial.currentLevel = levelId;
        this.saveProgress();
        this.loadLevel(levelId);
        this.renderLevelList();
    }

    loadLevel(levelId) {
        const level = tutorialLevels.find(l => l.id === levelId);
        if (!level) return;

        this.currentLevel = level;
        this.currentTask = null;

        if (level.startPath && this.terminal) {
            this.terminal.setCurrentPath(level.startPath);
        }

        const levelScore = this.progress.tutorial.levelScores[levelId] || { completed: 0, total: level.tasks.length };
        this.currentTaskIndex = levelScore.completed;

        if (this.currentTaskIndex < level.tasks.length) {
            this.currentTask = level.tasks[this.currentTaskIndex];
        }

        this.renderTask();
        this.navigateToTaskPath();
    }

    selectScenario(scenarioId) {
        this.progress.practice.currentScenario = scenarioId;
        this.saveProgress();
        this.loadScenario(scenarioId);
        this.renderScenarioList();
    }

    loadScenario(scenarioId) {
        const scenario = practiceScenarios.find(s => s.id === scenarioId);
        if (!scenario) return;

        this.currentScenario = scenario;
        this.currentTask = null;

        if (scenario.startPath && this.terminal) {
            this.terminal.setCurrentPath(scenario.startPath);
        }

        const scenarioProgress = this.progress.practice.scenarioProgress[scenarioId] || { completedTasks: 0, totalTasks: scenario.tasks.length };
        this.currentTaskIndex = scenarioProgress.completedTasks;

        if (this.currentTaskIndex < scenario.tasks.length) {
            this.currentTask = scenario.tasks[this.currentTaskIndex];
        }

        this.renderTask();
        this.navigateToTaskPath();
    }

    prevTask() {
        const tasks = this.mode === 'tutorial' ? this.currentLevel?.tasks : this.currentScenario?.tasks;
        if (!tasks || this.currentTaskIndex <= 0) return;

        this.currentTaskIndex--;
        this.currentTask = tasks[this.currentTaskIndex];
        this.renderTask();
        this.clearFeedback();
    }

    nextTask() {
        const tasks = this.mode === 'tutorial' ? this.currentLevel?.tasks : this.currentScenario?.tasks;
        if (!tasks || this.currentTaskIndex >= tasks.length - 1) return;

        this.currentTaskIndex++;
        this.currentTask = tasks[this.currentTaskIndex];
        this.renderTask();
        this.clearFeedback();
    }

    clearFeedback() {
        if (this.terminal) {
            // Remove any feedback lines from terminal output
            const feedbackLines = this.terminal.outputElement.querySelectorAll('.terminal-line.success, .terminal-line.error, .terminal-line.info');
            feedbackLines.forEach(line => {
                if (line.textContent.includes('通过') || line.textContent.includes('失败') || line.textContent.includes('提示:')) {
                    line.remove();
                }
            });
        }
    }

    renderTask() {
        if (!this.terminal) return;

        if (!this.currentTask) {
            const isLevelComplete = this.currentLevel && this.progress.tutorial.completedLevels.includes(this.currentLevel.id);
            const isScenarioComplete = this.currentScenario && this.progress.practice.completedScenarios.includes(this.currentScenario.id);

            this.terminal.clear();
            if (isLevelComplete || isScenarioComplete) {
                this.terminal.printHTML(`
                    <div class="terminal-task-wrapper">
                        <div class="terminal-task-info">
                            <span class="terminal-task-title" style="color:#51cf66;">🎉 已完成！</span>
                        </div>
                    </div>
                `);
            } else {
                this.terminal.showTaskInfo(null);
            }
            return;
        }

        const task = this.currentTask;
        const tasks = this.mode === 'tutorial' ? this.currentLevel.tasks : this.currentScenario.tasks;
        const totalTasks = tasks.length;
        const currentIndex = this.currentTaskIndex + 1;
        const hasPrev = this.currentTaskIndex > 0;
        const hasNext = this.currentTaskIndex < tasks.length - 1;

        this.terminal.clear();
        this.terminal.showTaskInfo(task, currentIndex, totalTasks, hasPrev, hasNext);
    }

    navigateToTaskPath() {
        if (!this.currentTask || !this.terminal) return;

        const validation = this.currentTask.validation;
        if (validation && validation.requiredPath) {
            this.terminal.setCurrentPath(validation.requiredPath);
        }
    }

    handleCommandExecuted(command, result) {
        if (!this.currentTask) return;

        const context = {
            currentPath: this.terminal.getFileSystem().currentPath,
            fileSystem: this.terminal.getFileSystem()
        };

        const validationResult = this.validator.validate(command, this.currentTask.validation, context);

        this.showFeedback(validationResult);

        if (validationResult.success) {
            this.completeTask();
        }
    }

    completeTask() {
        if (this.mode === 'tutorial') {
            const levelId = this.currentLevel.id;
            const levelScore = this.progress.tutorial.levelScores[levelId] || { completed: 0, total: this.currentLevel.tasks.length };
            levelScore.completed++;

            this.progress.tutorial.levelScores[levelId] = levelScore;

            if (levelScore.completed >= this.currentLevel.tasks.length) {
                this.progress.tutorial.completedLevels.push(levelId);
                this.progress.tutorial.currentLevel = Math.min(levelId + 1, tutorialLevels.length);
            }

            this.saveProgress();
            this.loadLevel(this.progress.tutorial.currentLevel);
            this.renderLevelList();
        } else if (this.mode === 'practice') {
            const scenarioId = this.currentScenario.id;
            const scenarioProgress = this.progress.practice.scenarioProgress[scenarioId] || { completedTasks: 0, totalTasks: this.currentScenario.tasks.length };
            scenarioProgress.completedTasks++;

            this.progress.practice.scenarioProgress[scenarioId] = scenarioProgress;

            if (scenarioProgress.completedTasks >= this.currentScenario.tasks.length) {
                this.progress.practice.completedScenarios.push(scenarioId);
                this.progress.practice.currentScenario = Math.min(scenarioId + 1, practiceScenarios.length);
            }

            this.saveProgress();
            this.loadScenario(this.progress.practice.currentScenario);
            this.renderScenarioList();
        }
        
        if (this.terminal) {
            this.terminal.focus();
        }
    }

    showFeedback(result) {
        if (this.terminal) {
            this.terminal.showFeedback(result);
            if (!result.success && result.hint) {
                this.terminal.showHint(result.hint);
            }
        }
    }

    retryTask() {
        this.renderTask();
        if (this.terminal) {
            this.terminal.focus();
        }
    }

    bindEvents() {
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm('确定要重置所有进度吗？')) {
                    this.resetProgress();
                }
            });
        }

        const helpBtn = document.getElementById('helpBtn');
        if (helpBtn) {
            helpBtn.addEventListener('click', () => {
                if (this.terminal) {
                    this.terminal.executeCommand('help');
                }
            });
        }

        const randomBtn = document.getElementById('randomBtn');
        if (randomBtn) {
            randomBtn.addEventListener('click', () => {
                this.randomSelectLevel();
            });
        }
    }

    randomSelectLevel() {
        if (this.mode === 'tutorial') {
            const availableLevels = tutorialLevels.filter(level => {
                return !this.progress.tutorial.completedLevels.includes(level.id);
            });

            if (availableLevels.length === 0) {
                alert('恭喜！你已完成所有教程关卡！');
                return;
            }

            const randomLevel = availableLevels[Math.floor(Math.random() * availableLevels.length)];
            this.selectLevel(randomLevel.id);
            alert(`随机选择：关卡 ${randomLevel.id} - ${randomLevel.name}`);
        } else if (this.mode === 'practice') {
            const availableScenarios = practiceScenarios.filter(scenario => {
                if (this.progress.practice.completedScenarios.includes(scenario.id)) {
                    return false;
                }
                if (scenario.requiredLevels && scenario.requiredLevels.length > 0) {
                    for (const levelId of scenario.requiredLevels) {
                        if (!this.progress.tutorial.completedLevels.includes(levelId)) {
                            return false;
                        }
                    }
                }
                return true;
            });

            if (availableScenarios.length === 0) {
                alert('没有可用的实战场景！请先完成相关教程关卡。');
                return;
            }

            const randomScenario = availableScenarios[Math.floor(Math.random() * availableScenarios.length)];
            this.selectScenario(randomScenario.id);
            alert(`随机选择：场景 ${randomScenario.id} - ${randomScenario.name}`);
        }
    }

    getProgress() {
        return this.progress;
    }

    setMode(mode) {
        this.mode = mode;
        this.saveProgress();
    }
}

window.App = App;

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
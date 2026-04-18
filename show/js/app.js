/* 主逻辑 - Linux命令学习系统 (两列布局版) */

class App {
  constructor() {
    this.mode = "home";
    this.currentLevel = null;
    this.currentTask = null;
    this.currentTaskIndex = 0;
    this.currentScenario = null;

    this.terminal = null;
    this.validator = null;

    // 每个任务的错误计数 { "scenarioId-taskIndex": errorCount }
    this.taskErrorCounts = {};

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
    if (path.includes("tutorial.html")) {
      this.mode = "tutorial";
    } else if (path.includes("practice.html")) {
      this.mode = "practice";
    } else {
      this.mode = "home";
    }
  }

  initTerminal() {
    this.terminal = new Terminal("terminalContainer", {
      prompt: "user@linux:~$ ",
    });

    this.terminal.onCommandExecuted = (command, result) => {
      this.handleCommandExecuted(command, result);
    };
  }

  initValidator() {
    this.validator = new CommandValidator();
  }

  loadProgress() {
    const saved = localStorage.getItem("linuxLearn_progress");
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
      version: "1.0",
      tutorial: {
        currentLevel: 1,
        completedLevels: [],
        levelScores: {},
      },
      practice: {
        currentScenario: 1,
        completedScenarios: [],
        scenarioProgress: {},
      },
      settings: {
        terminalTheme: "github-dark",
        lastVisit: new Date().toISOString().split("T")[0],
      },
    };
  }

  saveProgress() {
    this.progress.settings.lastVisit = new Date().toISOString().split("T")[0];
    localStorage.setItem("linuxLearn_progress", JSON.stringify(this.progress));
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
    if (this.mode === "home") {
      this.renderHome();
    } else if (this.mode === "tutorial") {
      this.renderTutorial();
    } else if (this.mode === "practice") {
      this.renderPractice();
    }
    this.updateProgressBadge();
  }

  updateProgressBadge() {
    const badge = document.getElementById("progressBadge");
    if (!badge) return;
    const tutDone = this.progress.tutorial.completedLevels.length;
    const pracDone = this.progress.practice.completedScenarios.length;
    const total = tutorialLevels.length + practiceScenarios.length;
    const done = tutDone + pracDone;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    badge.textContent = pct + "%";
  }

  // ===== 左侧面板内容更新 =====
  getSidebarContent() {
    return document.getElementById("sidebarContent");
  }

  // ===== 首页渲染 =====
  renderHome() {
    const t = this.terminal;

    const tutCompleted = this.progress.tutorial.completedLevels.length;
    const pracCompleted = this.progress.practice.completedScenarios.length;
    const totalProgress = tutorialLevels.length + practiceScenarios.length;
    const done = tutCompleted + pracCompleted;
    const pct =
      totalProgress > 0 ? Math.round((done / totalProgress) * 100) : 0;

    t.printSeparator("🏠 首页");

    // 状态栏
    t.showStatusBar(`
      <span class="status-item mode">🏠 首页</span>
      <span class="status-sep">|</span>
      <span class="status-item">教程 ${tutCompleted}/${tutorialLevels.length}</span>
      <span class="status-sep">|</span>
      <span class="status-item">实战 ${pracCompleted}/${practiceScenarios.length}</span>
    `);

    // 左侧面板 — 首页概览
    const sb = this.getSidebarContent();
    if (!sb) return;

    const barWidth = 20;
    const filled = Math.round((pct / 100) * barWidth);
    const bar = "█".repeat(filled) + "░".repeat(barWidth - filled);

    let html = "";

    // 总进度
    html += `<div class="sidebar-progress">`;
    html += `<div class="sidebar-progress-title"><span>总体进度</span><span class="pct">${pct}%</span></div>`;
    html += `<div class="progress-bar-track"><div class="progress-bar-fill" style="width:${pct}%"></div></div>`;
    html += `</div>`;

    // 教程关卡
    html += `<div class="sidebar-section">`;
    html += `<div class="sidebar-section-title">📖 教程关卡 (${tutCompleted}/${tutorialLevels.length})</div>`;
    for (const level of tutorialLevels) {
      const isCompleted = this.progress.tutorial.completedLevels.includes(
        level.id,
      );
      const iconClass = isCompleted ? "done" : "pending";
      const icon = isCompleted ? "✓" : "○";
      const itemClass = isCompleted ? "completed" : "";
      html += `<div class="sidebar-level-item ${itemClass}" onclick="app.selectLevel(${level.id})">`;
      html += `<span class="icon ${iconClass}">${icon}</span>`;
      html += `<span class="name">${level.id}. ${this.terminal.escapeHTML(level.name)}</span>`;
      html += `</div>`;
    }
    html += `</div>`;

    // 实战场景
    html += `<div class="sidebar-section">`;
    html += `<div class="sidebar-section-title">🎯 实战场景 (${pracCompleted}/${practiceScenarios.length})</div>`;
    for (const scenario of practiceScenarios) {
      const isCompleted = this.progress.practice.completedScenarios.includes(
        scenario.id,
      );
      const iconClass = isCompleted ? "done" : "pending";
      const icon = isCompleted ? "✓" : "○";
      const itemClass = isCompleted ? "completed" : "";
      html += `<div class="sidebar-level-item ${itemClass}" onclick="app.selectScenario(${scenario.id})">`;
      html += `<span class="icon ${iconClass}">${icon}</span>`;
      html += `<span class="name">${scenario.id}. ${this.terminal.escapeHTML(scenario.name)}</span>`;
      html += `</div>`;
    }
    html += `</div>`;

    sb.innerHTML = html;
  }

  // ===== 教程模式渲染 =====
  renderTutorial() {
    this.loadLevel(this.progress.tutorial.currentLevel);
  }

  // ===== 实战模式渲染 =====
  renderPractice() {
    this.loadScenario(this.progress.practice.currentScenario);
  }

  // ===== 加载关卡 =====
  loadLevel(levelId) {
    const level = tutorialLevels.find((l) => l.id === levelId);
    if (!level) return;

    this.currentLevel = level;
    this.currentTask = null;

    if (level.startPath && this.terminal) {
      this.terminal.setCurrentPath(level.startPath);
    }

    const levelScore = this.progress.tutorial.levelScores[levelId] || {
      completed: 0,
      total: level.tasks.length,
    };
    this.currentTaskIndex = levelScore.completed;

    if (this.currentTaskIndex < level.tasks.length) {
      this.currentTask = level.tasks[this.currentTaskIndex];
    }

    this.setupTask();
    this.navigateToTaskPath();
    this.renderLevelInfo();
  }

  renderLevelInfo() {
    if (!this.currentLevel) return;
    const t = this.terminal;
    const level = this.currentLevel;

    // 打印分隔线而非清屏
    t.printSeparator(`📖 关卡 ${level.id}: ${level.name}`);

    // 打印当前任务详情
    if (this.currentTask) {
      this.printTaskDetail(this.currentTask);
    }

    // 更新左侧面板
    this.renderSidebar();

    // 更新状态栏
    this.updateStatusBar();
  }

  // ===== 加载场景 =====
  loadScenario(scenarioId) {
    const scenario = practiceScenarios.find((s) => s.id === scenarioId);
    if (!scenario) return;

    this.currentScenario = scenario;
    this.currentTask = null;

    if (scenario.startPath && this.terminal) {
      this.terminal.setCurrentPath(scenario.startPath);
    }

    const scenarioProgress = this.progress.practice.scenarioProgress[
      scenarioId
    ] || {
      completedTasks: 0,
      totalTasks: scenario.tasks.length,
    };
    this.currentTaskIndex = scenarioProgress.completedTasks;

    if (this.currentTaskIndex < scenario.tasks.length) {
      this.currentTask = scenario.tasks[this.currentTaskIndex];
    }

    this.setupTask();
    this.navigateToTaskPath();
    this.renderScenarioInfo();
  }

  renderScenarioInfo() {
    if (!this.currentScenario) return;
    const t = this.terminal;
    const scenario = this.currentScenario;

    // 打印分隔线而非清屏
    t.printSeparator(`🎯 场景 ${scenario.id}: ${scenario.name}`);

    // 打印当前任务详情
    if (this.currentTask) {
      this.printTaskDetail(this.currentTask);
    }

    // 更新左侧面板
    this.renderSidebar();

    // 更新状态栏
    this.updateStatusBar();
  }

  // ===== 左侧面板渲染 (场景/任务模式) =====
  renderSidebar() {
    const sb = this.getSidebarContent();
    if (!sb) return;

    const isTutorial = this.mode === "tutorial";
    const scenario = isTutorial ? this.currentLevel : this.currentScenario;
    if (!scenario) return;

    const allScenarios = isTutorial ? tutorialLevels : practiceScenarios;
    const currentIdx = allScenarios.findIndex((s) => s.id === scenario.id);
    const hasPrev = currentIdx > 0;
    const hasNext = currentIdx < allScenarios.length - 1;

    const tasks = scenario.tasks;
    const totalTasks = tasks.length;
    const currentIndex = this.currentTaskIndex;

    const completedCount = isTutorial
      ? this.progress.tutorial.levelScores[scenario.id]?.completed || 0
      : this.progress.practice.scenarioProgress[scenario.id]?.completedTasks ||
        0;
    const pct =
      totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

    const hasPrevTask = currentIndex > 0;
    const hasNextTask = currentIndex < totalTasks - 1;

    let html = "";

    // 场景切换区 (上方)
    html += `<div class="sidebar-scene-nav">`;
    html += `<button class="scene-nav-btn" onclick="app.prevScenario()" ${!hasPrev ? "disabled" : ""}>◀</button>`;
    html += `<div class="scene-nav-label">`;
    html += `<span class="scene-icon">${isTutorial ? "📖" : "🎯"}</span>`;
    html += `<span class="scene-name">${this.terminal.escapeHTML(scenario.name)}</span>`;
    html += `<span class="scene-id">${scenario.id}/${allScenarios.length}</span>`;
    html += `</div>`;
    html += `<button class="scene-nav-btn" onclick="app.nextScenario()" ${!hasNext ? "disabled" : ""}>▶</button>`;
    html += `</div>`;

    // 故事/描述
    if (scenario.story || scenario.description) {
      html += `<div class="sidebar-story">${this.terminal.escapeHTML(scenario.story || scenario.description)}</div>`;
    }

    // 进度
    html += `<div class="sidebar-progress">`;
    html += `<div class="sidebar-progress-title"><span>任务进度</span><span class="pct">${completedCount}/${totalTasks} (${pct}%)</span></div>`;
    html += `<div class="progress-bar-track"><div class="progress-bar-fill" style="width:${pct}%"></div></div>`;
    html += `</div>`;

    // 任务列表 (下方, 含任务切换)
    html += `<div class="sidebar-tasks-header">`;
    html += `<span class="label">任务列表</span>`;
    html += `<div class="sidebar-task-nav">`;
    html += `<button class="task-nav-btn" onclick="app.prevTask()" ${!hasPrevTask ? "disabled" : ""}>◀</button>`;
    html += `<span style="font-size:11px;color:var(--text-dim);padding:0 4px;">${currentIndex + 1}/${totalTasks}</span>`;
    html += `<button class="task-nav-btn" onclick="app.nextTask()" ${!hasNextTask ? "disabled" : ""}>▶</button>`;
    html += `</div>`;
    html += `</div>`;

    html += `<div class="sidebar-tasks">`;
    for (let i = 0; i < tasks.length; i++) {
      const done = i < completedCount;
      const current = i === currentIndex;
      const iconClass = done ? "done" : current ? "current" : "pending";
      const icon = done ? "✓" : current ? "▸" : "○";
      const itemClass = done ? "completed" : current ? "active" : "";

      html += `<div class="task-item ${itemClass}" onclick="app.jumpToTask(${i})">`;
      html += `<span class="task-item-icon ${iconClass}">${icon}</span>`;
      html += `<div class="task-item-content">`;
      html += `<div class="task-item-title">${i + 1}. ${this.terminal.escapeHTML(tasks[i].title)}</div>`;
      if (tasks[i].goal) {
        html += `<div class="task-item-goal">▸ ${this.terminal.escapeHTML(tasks[i].goal)}</div>`;
      }
      html += `</div>`;
      html += `</div>`;
    }
    html += `</div>`;

    sb.innerHTML = html;

    // 滚动当前任务到可见
    const activeTask = sb.querySelector(".task-item.active");
    if (activeTask) {
      activeTask.scrollIntoView({ block: "nearest" });
    }
  }

  jumpToTask(index) {
    const tasks =
      this.mode === "tutorial"
        ? this.currentLevel?.tasks
        : this.currentScenario?.tasks;
    if (!tasks || index < 0 || index >= tasks.length) return;
    this.currentTaskIndex = index;
    this.currentTask = tasks[index];
    this.navigateToTaskPath();
    this.printTaskDetail(this.currentTask);
    this.renderSidebar();
    this.updateStatusBar();
  }

  // 获取当前任务的错误计数 key
  getTaskErrorKey() {
    const scenario =
      this.mode === "tutorial" ? this.currentLevel : this.currentScenario;
    if (!scenario) return null;
    return `${scenario.id}-${this.currentTaskIndex}`;
  }

  // 获取当前任务的错误次数
  getTaskErrorCount() {
    const key = this.getTaskErrorKey();
    return key ? this.taskErrorCounts[key] || 0 : 0;
  }

  // 增加当前任务的错误次数
  incrementTaskError() {
    const key = this.getTaskErrorKey();
    if (key) {
      this.taskErrorCounts[key] = (this.taskErrorCounts[key] || 0) + 1;
    }
  }

  // 重置当前任务的错误次数（成功后）
  resetTaskError() {
    const key = this.getTaskErrorKey();
    if (key) {
      delete this.taskErrorCounts[key];
    }
  }

  // 在终端打印任务详情
  printTaskDetail(task) {
    if (!task) return;
    const t = this.terminal;

    t.printLine("");
    t.printStyledLine("  ┌─────────────────────────────────────", "highlight");
    t.printStyledLine(
      `  │ <span style="color:var(--cyan);font-weight:700">📋 ${t.escapeHTML(task.title)}</span>`,
      "",
    );
    t.printStyledLine("  ├─────────────────────────────────────", "highlight");

    if (task.description) {
      t.printStyledLine(
        `  │ <span style="color:var(--text)">📄 ${t.escapeHTML(task.description)}</span>`,
        "",
      );
    }
    if (task.goal) {
      t.printStyledLine(
        `  │ <span style="color:var(--green)">🎯 目标: ${t.escapeHTML(task.goal)}</span>`,
        "",
      );
    }

    // 显示当前错误次数和对应提示
    const errCount = this.getTaskErrorCount();
    if (errCount >= 1 && task.hint) {
      t.printStyledLine(
        "  ├─────────────────────────────────────",
        "highlight",
      );
      t.printStyledLine(
        `  │ <span style="color:var(--yellow)">💡 提示: ${t.escapeHTML(task.hint)}</span>`,
        "",
      );
    }
    if (errCount >= 2 && task.validation) {
      const cmdHint = this.buildDetailedHint(task);
      t.printStyledLine(
        `  │ <span style="color:var(--orange)">💡 更多提示: ${cmdHint}</span>`,
        "",
      );
    }
    if (errCount >= 3 && task.expectedCommand) {
      t.printStyledLine(
        "  ├─────────────────────────────────────",
        "highlight",
      );
      t.printStyledLine(
        `  │ <span style="color:var(--red)">📝 答案: <span style="color:var(--text-bright);font-weight:700">${t.escapeHTML(task.expectedCommand)}</span></span>`,
        "",
      );
    }

    t.printStyledLine("  └─────────────────────────────────────", "highlight");
    t.printLine("");
  }

  // 根据验证规则构建更详细的提示
  buildDetailedHint(task) {
    const v = task.validation;
    if (!v) return "";
    const parts = [v.command];
    if (v.options && v.options.length > 0) {
      parts.push(v.options[0]);
    }
    if (v.args && v.args.length > 0) {
      parts.push(v.args.join(" "));
    }
    return `需要使用 ${parts.join(" ")} 相关的命令`;
  }

  updateStatusBar() {
    const t = this.terminal;
    const scenario =
      this.mode === "tutorial" ? this.currentLevel : this.currentScenario;
    if (!scenario) return;

    const isTutorial = this.mode === "tutorial";
    const directoryPath =
      this.currentTask?.validation?.requiredPath ||
      this.terminal.getFileSystem().currentPath;
    const displayPath = directoryPath.replace("/home/user", "~");

    t.showStatusBar(`
      <span class="status-item mode">${isTutorial ? "📖 教程" : "🎯 实战"}</span>
      <span class="status-sep">|</span>
      <span class="status-item path">📁 ${displayPath}</span>
      <span class="status-sep">|</span>
      <span class="status-item">输入 <span style="color:var(--green)">help</span> 查看命令</span>
    `);
  }

  // ===== 导航方法 =====
  startTutorial() {
    this.mode = "tutorial";
    this.saveProgress();
    if (this.currentLevel) {
      this.renderLevelInfo();
    } else {
      this.loadLevel(this.progress.tutorial.currentLevel);
    }
  }

  startPractice() {
    this.mode = "practice";
    this.saveProgress();
    if (this.currentScenario) {
      this.renderScenarioInfo();
    } else {
      this.loadScenario(this.progress.practice.currentScenario);
    }
  }

  goHome() {
    this.mode = "home";
    this.saveProgress();
    this.currentLevel = null;
    this.currentScenario = null;
    this.currentTask = null;
    this.terminal.setCurrentPath("/home/user");
    this.renderHome();
  }

  randomChallenge() {
    const isTutorial = Math.random() > 0.5;
    if (isTutorial) {
      const available = tutorialLevels.filter(
        (l) => !this.progress.tutorial.completedLevels.includes(l.id),
      );
      if (available.length === 0) {
        this.terminal.printLine("  🎉 恭喜！你已完成所有教程关卡！", "success");
        return;
      }
      const random = available[Math.floor(Math.random() * available.length)];
      this.mode = "tutorial";
      this.selectLevel(random.id);
      this.terminal.printLine(
        `  🎲 随机选择: 教程关卡 ${random.id} - ${random.name}`,
        "info",
      );
    } else {
      const available = practiceScenarios.filter(
        (s) => !this.progress.practice.completedScenarios.includes(s.id),
      );
      if (available.length === 0) {
        this.terminal.printLine("  🎉 恭喜！你已完成所有实战场景！", "success");
        return;
      }
      const random = available[Math.floor(Math.random() * available.length)];
      this.mode = "practice";
      this.selectScenario(random.id);
      this.terminal.printLine(
        `  🎲 随机选择: 实战场景 ${random.id} - ${random.name}`,
        "info",
      );
    }
  }

  // ===== 任务管理 =====
  selectLevel(levelId) {
    this.progress.tutorial.currentLevel = levelId;
    this.mode = "tutorial";
    this.saveProgress();
    this.loadLevel(levelId);
  }

  selectScenario(scenarioId) {
    this.progress.practice.currentScenario = scenarioId;
    this.mode = "practice";
    this.saveProgress();
    this.loadScenario(scenarioId);
  }

  prevTask() {
    const tasks =
      this.mode === "tutorial"
        ? this.currentLevel?.tasks
        : this.currentScenario?.tasks;
    if (!tasks || this.currentTaskIndex <= 0) return;
    this.currentTaskIndex--;
    this.currentTask = tasks[this.currentTaskIndex];
    this.navigateToTaskPath();
    this.printTaskDetail(this.currentTask);
    this.renderSidebar();
    this.updateStatusBar();
  }

  nextTask() {
    const tasks =
      this.mode === "tutorial"
        ? this.currentLevel?.tasks
        : this.currentScenario?.tasks;
    if (!tasks || this.currentTaskIndex >= tasks.length - 1) return;
    this.currentTaskIndex++;
    this.currentTask = tasks[this.currentTaskIndex];
    this.navigateToTaskPath();
    this.printTaskDetail(this.currentTask);
    this.renderSidebar();
    this.updateStatusBar();
  }

  setupTask() {
    if (!this.terminal) return;
    if (!this.currentTask) {
      this.terminal.showStatusBar(
        '<span style="color:var(--text-dim)">请选择场景</span>',
      );
      this.terminal.exitVimMode();
      return;
    }

    const scenario =
      this.mode === "tutorial" ? this.currentLevel : this.currentScenario;
    if (scenario && scenario.commands && scenario.commands.includes("vim")) {
      const validation = this.currentTask.validation;
      if (validation && validation.command) {
        const cmd = validation.command;
        if (
          cmd.startsWith("Ctrl+") ||
          cmd === "i" ||
          cmd === "a" ||
          cmd === "o" ||
          cmd === "O" ||
          cmd === "A" ||
          cmd === "I" ||
          cmd === "dd" ||
          cmd === "yy" ||
          cmd === "p" ||
          cmd === "P" ||
          cmd === "u" ||
          cmd === "0" ||
          cmd === "$" ||
          cmd === "gg" ||
          cmd === "G" ||
          cmd === "w" ||
          cmd === "b" ||
          cmd === "dw" ||
          cmd === "D" ||
          cmd === "x" ||
          cmd === "n" ||
          cmd === "N" ||
          cmd === "J" ||
          cmd === "H" ||
          cmd === "M" ||
          cmd === "L"
        ) {
          this.terminal.enterVimMode();
        } else if (cmd.startsWith(":") || cmd.startsWith("/")) {
          this.terminal.exitVimMode();
        } else {
          this.terminal.exitVimMode();
        }
      }
    } else {
      this.terminal.exitVimMode();
    }
  }

  updateTaskUI() {
    if (!this.terminal) return;
    if (this.mode === "tutorial") {
      this.renderLevelInfo();
    } else {
      this.renderScenarioInfo();
    }
  }

  navigateToTaskPath() {
    if (!this.currentTask || !this.terminal) return;
    const validation = this.currentTask.validation;
    if (validation && validation.requiredPath) {
      this.terminal.setCurrentPath(validation.requiredPath);
    }
  }

  prevScenario() {
    const allScenarios =
      this.mode === "tutorial" ? tutorialLevels : practiceScenarios;
    const currentScenario =
      this.mode === "tutorial" ? this.currentLevel : this.currentScenario;
    if (!currentScenario) return;
    const currentIndex = allScenarios.findIndex(
      (s) => s.id === currentScenario.id,
    );
    if (currentIndex <= 0) return;
    if (this.mode === "tutorial") {
      this.loadLevel(allScenarios[currentIndex - 1].id);
    } else {
      this.loadScenario(allScenarios[currentIndex - 1].id);
    }
  }

  nextScenario() {
    const allScenarios =
      this.mode === "tutorial" ? tutorialLevels : practiceScenarios;
    const currentScenario =
      this.mode === "tutorial" ? this.currentLevel : this.currentScenario;
    if (!currentScenario) return;
    const currentIndex = allScenarios.findIndex(
      (s) => s.id === currentScenario.id,
    );
    if (currentIndex >= allScenarios.length - 1) return;
    if (this.mode === "tutorial") {
      this.loadLevel(allScenarios[currentIndex + 1].id);
    } else {
      this.loadScenario(allScenarios[currentIndex + 1].id);
    }
  }

  clearFeedback() {
    // handled by re-rendering
  }

  renderTask() {
    this.setupTask();
  }

  // ===== 命令处理 =====
  handleCommandExecuted(command, result) {
    const cmd = command.trim().toLowerCase();
    const parts = cmd.split(/\s+/);
    const baseCmd = parts[0];

    // 内置导航命令
    if (baseCmd === "tutorial" || baseCmd === "t") {
      this.startTutorial();
      return;
    }
    if (baseCmd === "practice" || baseCmd === "p") {
      this.startPractice();
      return;
    }
    if (
      baseCmd === "home" ||
      baseCmd === "menu" ||
      baseCmd === "back" ||
      baseCmd === "b"
    ) {
      this.goHome();
      return;
    }
    if (baseCmd === "random" || baseCmd === "r") {
      this.randomChallenge();
      return;
    }
    if (baseCmd === "status" || baseCmd === "info") {
      this.showStatus();
      return;
    }
    if (baseCmd === "reset") {
      this.confirmReset();
      return;
    }
    if (baseCmd === "list" || baseCmd === "ls-levels") {
      this.listScenarios();
      return;
    }
    if (baseCmd === "goto" || baseCmd === "go") {
      const id = parseInt(parts[1]);
      if (!isNaN(id)) {
        if (this.mode === "tutorial") {
          if (tutorialLevels.find((l) => l.id === id)) {
            this.selectLevel(id);
            return;
          }
        } else if (this.mode === "practice") {
          if (practiceScenarios.find((s) => s.id === id)) {
            this.selectScenario(id);
            return;
          }
        }
        this.terminal.printLine(`  未找到编号为 ${id} 的关卡/场景`, "error");
      } else {
        this.terminal.printLine("  用法: goto <编号>", "dim");
      }
      return;
    }
    if (baseCmd === "next" || baseCmd === "n") {
      this.nextScenario();
      return;
    }
    if (baseCmd === "prev") {
      this.prevScenario();
      return;
    }
    if (baseCmd === "hint" || baseCmd === "h") {
      this.showTaskHint();
      return;
    }
    if (baseCmd === "skip") {
      this.skipCurrentTask();
      return;
    }

    // 如果在首页模式，不验证任务
    if (this.mode === "home") return;

    // 验证命令
    if (!this.currentTask) return;

    const context = {
      currentPath: this.terminal.getFileSystem().currentPath,
      fileSystem: this.terminal.getFileSystem(),
    };

    const validationResult = this.validator.validate(
      command,
      this.currentTask.validation,
      context,
    );

    if (validationResult.success) {
      this.resetTaskError();
      const t = this.terminal;
      t.printLine("");
      t.printStyledLine(
        '  <span style="color:var(--green);font-weight:700">✓ 命令正确！</span> <span style="color:var(--text-dim)">— 任务完成</span>',
        "",
      );
      t.printLine("");
      this.completeTask();
    } else {
      this.incrementTaskError();
      const errCount = this.getTaskErrorCount();
      const task = this.currentTask;

      // 基础错误消息
      this.showFeedback(validationResult);

      // 渐进式提示
      if (errCount === 1 && task.hint) {
        this.terminal.printStyledLine(
          `  <span style="color:var(--yellow)">💡 提示: <span style="color:var(--text-dim)">${this.terminal.escapeHTML(task.hint)}</span></span>`,
          "",
        );
      } else if (errCount === 2) {
        const cmdHint = this.buildDetailedHint(task);
        if (cmdHint) {
          this.terminal.printStyledLine(
            `  <span style="color:var(--orange)">💡 更多提示: <span style="color:var(--text-dim)">${cmdHint}</span></span>`,
            "",
          );
        }
      } else if (errCount >= 3 && task.expectedCommand) {
        this.terminal.printStyledLine(
          `  <span style="color:var(--red)">📝 答案: <span style="color:var(--text-bright);font-weight:700">${this.terminal.escapeHTML(task.expectedCommand)}</span></span>`,
          "",
        );
      }

      this.terminal.printLine("");
    }
  }

  showFeedback(result) {
    if (this.terminal) {
      this.terminal.showFeedback(result);
    }
  }

  showTaskHint() {
    if (this.currentTask && this.currentTask.hint) {
      this.terminal.showHint(this.currentTask.hint);
    } else {
      this.terminal.printLine("  当前没有提示", "dim");
    }
  }

  skipCurrentTask() {
    if (!this.currentTask) {
      this.terminal.printLine("  没有可跳过的任务", "dim");
      return;
    }
    this.terminal.printLine("  ⏭ 已跳过当前任务", "warning");
    this.completeTask();
  }

  confirmReset() {
    this.terminal.printStyledLine(
      '  <span style="color:var(--red);font-weight:700">⚠ 确定要重置所有进度吗？</span> <span style="color:var(--text-dim)">输入 yes 确认</span>',
      "",
    );

    const handler = (e) => {
      if (e.key === "Enter") {
        const val = this.terminal.inputElement.value.trim().toLowerCase();
        if (val === "yes" || val === "y") {
          this.resetProgress();
          this.terminal.printLine("  进度已重置！", "success");
          this.renderUI();
        } else {
          this.terminal.printLine("  已取消重置", "dim");
        }
        this.terminal.inputElement.removeEventListener("keydown", handler);
      }
    };
    this.terminal.inputElement.addEventListener("keydown", handler);
  }

  showStatus() {
    const t = this.terminal;
    const tutCompleted = this.progress.tutorial.completedLevels.length;
    const pracCompleted = this.progress.practice.completedScenarios.length;
    const total = tutorialLevels.length + practiceScenarios.length;
    const done = tutCompleted + pracCompleted;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    t.printLine("");
    t.printStyledLine(
      '  <span style="color:var(--yellow);font-weight:700">📊 学习状态</span>',
      "",
    );
    t.printLine("");
    t.printStyledLine(
      `  总进度: <span style="color:var(--green);font-weight:700">${pct}%</span> (${done}/${total})`,
      "",
    );
    t.printStyledLine(
      `  教程关卡: <span style="color:var(--blue)">${tutCompleted}/${tutorialLevels.length}</span>`,
      "",
    );
    t.printStyledLine(
      `  实战场景: <span style="color:var(--orange)">${pracCompleted}/${practiceScenarios.length}</span>`,
      "",
    );

    if (this.currentLevel || this.currentScenario) {
      const scenario =
        this.mode === "tutorial" ? this.currentLevel : this.currentScenario;
      if (scenario) {
        t.printStyledLine(
          `  当前: <span style="color:var(--cyan)">${scenario.name}</span>`,
          "",
        );
      }
    }

    t.printLine("");
  }

  listScenarios() {
    const t = this.terminal;
    const isTutorial = this.mode === "tutorial";
    const list = isTutorial ? tutorialLevels : practiceScenarios;

    t.printLine("");
    t.printStyledLine(
      `  <span style="color:var(--yellow);font-weight:700">${isTutorial ? "📖 教程关卡" : "🎯 实战场景"}</span>`,
      "",
    );
    t.printLine("");

    for (const item of list) {
      const completed = isTutorial
        ? this.progress.tutorial.completedLevels.includes(item.id)
        : this.progress.practice.completedScenarios.includes(item.id);
      const icon = completed
        ? '<span style="color:var(--green)">✓</span>'
        : '<span style="color:var(--text-dim)">○</span>';
      t.printStyledLine(
        `    ${icon} <span style="color:var(--blue)">[${item.id}]</span> ${t.escapeHTML(item.name)}`,
        "",
      );
    }

    t.printLine("");
    t.printLine("  输入 goto <编号> 跳转到指定关卡", "dim");
    t.printLine("");
  }

  completeTask() {
    if (this.mode === "tutorial") {
      const levelId = this.currentLevel.id;
      const levelScore = this.progress.tutorial.levelScores[levelId] || {
        completed: 0,
        total: this.currentLevel.tasks.length,
      };
      levelScore.completed++;
      this.progress.tutorial.levelScores[levelId] = levelScore;

      if (levelScore.completed >= this.currentLevel.tasks.length) {
        if (!this.progress.tutorial.completedLevels.includes(levelId)) {
          this.progress.tutorial.completedLevels.push(levelId);
        }
        this.progress.tutorial.currentLevel = Math.min(
          levelId + 1,
          tutorialLevels.length,
        );
      }

      this.saveProgress();

      if (levelScore.completed < this.currentLevel.tasks.length) {
        this.loadLevel(levelId);
      } else {
        this.loadLevel(this.progress.tutorial.currentLevel);
      }
    } else if (this.mode === "practice") {
      const scenarioId = this.currentScenario.id;
      const scenarioProgress = this.progress.practice.scenarioProgress[
        scenarioId
      ] || {
        completedTasks: 0,
        totalTasks: this.currentScenario.tasks.length,
      };
      scenarioProgress.completedTasks++;
      this.progress.practice.scenarioProgress[scenarioId] = scenarioProgress;

      if (
        scenarioProgress.completedTasks >= this.currentScenario.tasks.length
      ) {
        if (!this.progress.practice.completedScenarios.includes(scenarioId)) {
          this.progress.practice.completedScenarios.push(scenarioId);
        }
        this.progress.practice.currentScenario = Math.min(
          scenarioId + 1,
          practiceScenarios.length,
        );
      }

      this.saveProgress();

      if (scenarioProgress.completedTasks < this.currentScenario.tasks.length) {
        this.loadScenario(scenarioId);
      } else {
        this.loadScenario(this.progress.practice.currentScenario);
      }
    }

    this.updateProgressBadge();
    if (this.terminal) {
      this.terminal.focus();
    }
  }

  retryTask() {
    this.renderTask();
    if (this.terminal) {
      this.terminal.focus();
    }
  }

  bindEvents() {
    // 全局快捷键
    document.addEventListener("keydown", (e) => {
      if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        if (this.terminal) this.terminal.clear();
      }
    });
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

document.addEventListener("DOMContentLoaded", () => {
  window.app = new App();
});

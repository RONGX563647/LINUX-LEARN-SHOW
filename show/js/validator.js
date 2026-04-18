/* 命令验证引擎 - Linux命令学习页面 */

class CommandValidator {
  constructor(fileSystem = null) {
    this.fs = fileSystem;

    this.commandAliases = {
      ls: ["ls", "dir"],
      pwd: ["pwd"],
      cd: ["cd"],
      mkdir: ["mkdir"],
      touch: ["touch"],
      cat: ["cat"],
      rm: ["rm"],
      rmdir: ["rmdir"],
      cp: ["cp"],
      mv: ["mv"],
      grep: ["grep"],
      chmod: ["chmod"],
      find: ["find"],
      whereis: ["whereis"],
      head: ["head"],
      tail: ["tail"],
      more: ["more"],
      less: ["less"],
      tar: ["tar"],
      gzip: ["gzip"],
      bzip2: ["bzip2"],
      git: ["git"],
      docker: ["docker"],
      vim: ["vim", "vi"],
      vi: ["vim", "vi"],
      systemctl: ["systemctl"],
      journalctl: ["journalctl"],
    };

    this.vimInternalCommands = [
      "i",
      "a",
      "o",
      "O",
      "A",
      "I",
      ":wq",
      ":q!",
      ":q",
      ":w",
      ":x",
      "dd",
      "yy",
      "p",
      "P",
      "u",
      "Ctrl+r",
      "0",
      "$",
      "gg",
      "G",
      "w",
      "b",
      "e",
      "dw",
      "d$",
      "d0",
      "D",
      "cw",
      "c$",
      "c0",
      "C",
      "x",
      "X",
      "r",
      "R",
      "n",
      "N",
      "*",
      "#",
      "Ctrl+f",
      "Ctrl+b",
      "Ctrl+d",
      "Ctrl+u",
      "zz",
      "zt",
      "zb",
      "H",
      "M",
      "L",
      "J",
      ":set number",
      ":set nonumber",
      ":set nu",
      ":set nonu",
      ":s/",
      ":%s/",
      "/",
      "?",
      ":",
      "/hello",
    ];

    this.optionAliases = {
      ls: {
        "-a": ["-a", "--all"],
        "-l": ["-l", "--format=long"],
        "-h": ["-h", "--human-readable"],
      },
      grep: {
        "-i": ["-i", "--ignore-case"],
        "-n": ["-n", "--line-number"],
        "-r": ["-r", "-R", "--recursive"],
      },
      head: {
        "-n": ["-n", "--lines"],
      },
      tail: {
        "-n": ["-n", "--lines"],
        "-f": ["-f", "--follow"],
      },
      tar: {
        "-c": ["-c", "--create"],
        "-x": ["-x", "--extract"],
        "-v": ["-v", "--verbose"],
        "-f": ["-f", "--file"],
        "-z": ["-z", "--gzip"],
        "-j": ["-j", "--bzip2"],
      },
      chmod: {
        "-R": ["-R", "--recursive"],
      },
      find: {
        "-name": ["-name"],
        "-type": ["-type"],
      },
    };
  }

  parseCommand(input) {
    const parts = input.trim().split(/\s+/);
    const command = parts[0];
    const options = [];
    const args = [];

    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      if (part.startsWith("-")) {
        options.push(part);
      } else {
        args.push(part);
      }
    }

    return {
      command: command,
      options: options,
      args: args,
      raw: input,
    };
  }

  validate(userInput, validationRule, context = {}) {
    const parsed = this.parseCommand(userInput);
    const currentPath = context.currentPath || "/home/user";
    const fs = context.fileSystem || this.fs;

    if (this.isVimInternalCommand(userInput.trim())) {
      return this.validateVimInternalCommand(userInput.trim(), validationRule);
    }

    if (validationRule.requiredPath) {
      const normalizedRequired = this.normalizePath(
        validationRule.requiredPath,
      );
      const normalizedCurrent = this.normalizePath(currentPath);
      if (normalizedCurrent !== normalizedRequired) {
        return {
          success: false,
          message: `请在正确的目录下执行此命令。\n当前目录: ${currentPath}\n需要目录: ${validationRule.requiredPath}`,
          hint: `先使用 cd ${validationRule.requiredPath} 切换到目标目录`,
        };
      }
    }

    if (fs && validationRule.args && validationRule.args.length > 0) {
      for (const arg of validationRule.args) {
        if (
          arg.startsWith("/") ||
          arg.startsWith("~") ||
          arg === ".." ||
          arg === "."
        )
          continue;
        if (arg.includes("*")) continue;
        if (arg.match(/^\d+$/)) continue;
        if (arg.match(/^[a-zA-Z0-9_\-\.]+$/)) {
          const resolvedPath = this.resolveArgPath(arg, currentPath);
          if (!fs.exists(resolvedPath)) {
            const shouldExist = validationRule.checkExists !== false;
            if (shouldExist && validationRule.type !== "contains") {
              return {
                success: false,
                message: `文件或目录 '${arg}' 不存在于当前目录。\n当前目录: ${currentPath}`,
                hint: `请确认文件路径是否正确，或先创建该文件/目录`,
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
      case "exact":
        return this.validateExact(parsed, validationRule);
      case "contains":
        return this.validateContains(parsed, validationRule);
      case "command":
        return this.validateCommand(parsed, validationRule);
      case "options":
        return this.validateOptions(parsed, validationRule);
      case "args":
        return this.validateArgs(parsed, validationRule);
      default:
        return {
          success: false,
          message: "未知的验证类型",
        };
    }
  }

  isVimInternalCommand(input) {
    const trimmed = input.trim();
    if (this.vimInternalCommands.includes(trimmed)) {
      return true;
    }
    if (trimmed.startsWith(":") && trimmed.length > 1) {
      return true;
    }
    if (trimmed.startsWith("/") && trimmed.length > 1) {
      return true;
    }
    if (trimmed.startsWith("?") && trimmed.length > 1) {
      return true;
    }
    if (trimmed.match(/^:\d+$/)) {
      return true;
    }
    if (trimmed.match(/^:s\/.*\/.*\/[g]?$/)) {
      return true;
    }
    if (trimmed.match(/^:%s\/.*\/.*\/[g]?$/)) {
      return true;
    }
    return false;
  }

  validateVimInternalCommand(input, rule) {
    const trimmed = input.trim();
    const expectedCmd = rule.command;

    if (rule.type === "exact") {
      if (trimmed.toLowerCase() === expectedCmd.toLowerCase()) {
        return {
          success: true,
          message: "命令正确！",
        };
      }
      return {
        success: false,
        message: `命令不正确。\n正确答案：${expectedCmd}`,
        hint: this.getVimHint(expectedCmd),
      };
    }

    if (rule.type === "contains") {
      if (trimmed.includes(expectedCmd) || expectedCmd.includes(trimmed)) {
        return {
          success: true,
          message: "命令正确！",
        };
      }
      return {
        success: false,
        message: `命令不正确。\n正确答案：${expectedCmd}`,
        hint: this.getVimHint(expectedCmd),
      };
    }

    return {
      success: true,
      message: "命令正确！",
    };
  }

  getVimHint(command) {
    const vimHints = {
      i: "按i进入插入模式，可以在光标前插入文本",
      a: "按a在光标后插入文本",
      o: "按o在当前行下方插入新行",
      O: "按O在当前行上方插入新行",
      A: "按A在行尾追加文本",
      I: "按I在行首插入文本",
      ":wq": "输入:wq保存并退出Vim",
      ":q!": "输入:q!不保存强制退出",
      ":q": "输入:q退出Vim（未修改时）",
      ":w": "输入:w保存文件",
      dd: "按dd删除整行",
      yy: "按yy复制整行",
      p: "按p在光标后粘贴",
      P: "按P在光标前粘贴",
      u: "按u撤销上一步操作",
      "Ctrl+r": "按Ctrl+r重做被撤销的操作",
      0: "按0跳转到行首",
      $: "按$跳转到行尾",
      gg: "按gg跳转到文件开头",
      G: "按G跳转到文件末尾",
      w: "按w向前移动一个单词",
      b: "按b向后移动一个单词",
      dw: "按dw删除一个单词",
      D: "按D删除到行尾",
      x: "按x删除光标所在字符",
      n: "按n查找下一个匹配项",
      N: "按N查找上一个匹配项",
      "Ctrl+f": "按Ctrl+f向下翻页",
      "Ctrl+b": "按Ctrl+b向上翻页",
      ":set number": "输入:set number显示行号",
      ":s/old/new/": "输入:s/old/new/替换当前行第一个匹配",
      ":%s/old/new/g": "输入:%s/old/new/g全局替换",
      "/hello": "输入/hello搜索hello关键字",
    };
    return vimHints[command] || "这是Vim编辑器的内部命令";
  }

  resolveArgPath(arg, currentPath) {
    if (arg.startsWith("/")) return arg;
    if (arg.startsWith("~")) return "/home/user" + arg.substring(1);
    if (arg === "..") {
      const parts = currentPath.split("/");
      parts.pop();
      return parts.join("/") || "/";
    }
    if (arg === ".") return currentPath;
    return currentPath + "/" + arg;
  }

  normalizePath(path) {
    const parts = path.split("/").filter((p) => p);
    const result = [];
    for (const part of parts) {
      if (part === "..") {
        result.pop();
      } else if (part !== ".") {
        result.push(part);
      }
    }
    return "/" + result.join("/");
  }

  setFileSystem(fs) {
    this.fs = fs;
  }

  smartValidate(parsed, rule, context = {}) {
    const currentPath = context.currentPath || "/home/user";
    const fs = context.fileSystem || this.fs;

    if (rule.command.startsWith("git ") && parsed.command === "git") {
      return this.validateSubCommand(parsed, rule, "git");
    }

    if (rule.command.startsWith("docker ") && parsed.command === "docker") {
      return this.validateSubCommand(parsed, rule, "docker");
    }

    if (
      rule.command.startsWith("systemctl ") &&
      parsed.command === "systemctl"
    ) {
      return this.validateSubCommand(parsed, rule, "systemctl");
    }

    if (
      rule.command.startsWith("journalctl ") &&
      parsed.command === "journalctl"
    ) {
      return this.validateSubCommand(parsed, rule, "journalctl");
    }

    if (parsed.command !== rule.command) {
      return null;
    }

    if (rule.command === "pwd") {
      return {
        success: true,
        message: "命令正确！",
      };
    }

    if (rule.command === "ls") {
      if (rule.options && rule.options.length > 0) {
        const hasOption = this.hasRequiredOptions(
          parsed.command,
          parsed.options,
          rule.options,
        );
        if (hasOption) {
          return {
            success: true,
            message: "命令正确！",
          };
        }
        return {
          success: false,
          message: `缺少必要的选项。\n正确答案：${rule.command} ${rule.options[0]}`,
          hint: this.getHint(rule.command + " " + rule.options[0]),
        };
      }
      return {
        success: true,
        message: "命令正确！",
      };
    }

    if (rule.command === "cd") {
      if (parsed.args.length === 0) {
        return {
          success: false,
          message: `缺少必要的参数。\n正确答案：${rule.command} ${rule.args ? rule.args[0] : "路径"}`,
          hint: this.getHint(rule.command),
        };
      }
      if (rule.args && rule.args.length > 0) {
        const hasArg = this.hasRequiredArgs(parsed.args, rule.args);
        if (hasArg) {
          return {
            success: true,
            message: "命令正确！",
          };
        }
      } else {
        return {
          success: true,
          message: "命令正确！",
        };
      }
    }

    if (
      rule.command === "cat" ||
      rule.command === "more" ||
      rule.command === "less"
    ) {
      if (parsed.args.length === 0) {
        return {
          success: false,
          message: `缺少必要的参数。\n正确答案：${rule.command} ${rule.args ? rule.args[0] : "文件名"}`,
          hint: this.getHint(rule.command),
        };
      }
      if (fs && parsed.args.length > 0) {
        const fileArg = parsed.args[0];
        const resolvedPath = this.resolveArgPath(fileArg, currentPath);
        if (!fs.exists(resolvedPath)) {
          return {
            success: false,
            message: `文件 '${fileArg}' 不存在。\n当前目录: ${currentPath}`,
            hint: `请确认文件路径是否正确，或先创建该文件`,
          };
        }
      }
      if (rule.args && rule.args.length > 0) {
        const hasArg = this.hasRequiredArgs(parsed.args, rule.args);
        if (hasArg) {
          return {
            success: true,
            message: "命令正确！",
          };
        }
      } else {
        return {
          success: true,
          message: "命令正确！",
        };
      }
    }

    if (rule.command === "head" || rule.command === "tail") {
      if (rule.options && rule.options.length > 0) {
        const hasOption = this.hasRequiredOptions(
          parsed.command,
          parsed.options,
          rule.options,
        );
        if (!hasOption) {
          return {
            success: false,
            message: `缺少必要的选项。\n正确答案：${rule.command} ${rule.options[0]} ${rule.args ? rule.args[rule.args.length - 1] : ""}`,
            hint: this.getHint(rule.command),
          };
        }
      }
      if (parsed.args.length === 0) {
        return {
          success: false,
          message: `缺少必要的参数。\n正确答案：${rule.command} ${rule.args ? rule.args.join(" ") : "文件名"}`,
          hint: this.getHint(rule.command),
        };
      }
      if (fs && parsed.args.length > 0) {
        const fileArg = parsed.args[parsed.args.length - 1];
        const resolvedPath = this.resolveArgPath(fileArg, currentPath);
        if (!fs.exists(resolvedPath)) {
          return {
            success: false,
            message: `文件 '${fileArg}' 不存在。\n当前目录: ${currentPath}`,
            hint: `请确认文件路径是否正确，或先创建该文件`,
          };
        }
      }
      return {
        success: true,
        message: "命令正确！",
      };
    }

    if (rule.command === "grep") {
      if (parsed.args.length < 2) {
        return {
          success: false,
          message: `缺少必要的参数。\n正确答案：${rule.command} 搜索模式 文件名`,
          hint: this.getHint(rule.command),
        };
      }
      if (fs && totalParts >= 2) {
        const fileArg = parsed.args[parsed.args.length - 1];
        const resolvedPath = this.resolveArgPath(fileArg, currentPath);
        if (!fs.exists(resolvedPath)) {
          return {
            success: false,
            message: `文件 '${fileArg}' 不存在。\n当前目录: ${currentPath}`,
            hint: `请确认文件路径是否正确，或先创建该文件`,
          };
        }
      }
      return {
        success: true,
        message: "命令正确！",
      };
    }

    if (rule.command === "chmod") {
      const totalParts = parsed.options.length + parsed.args.length;
      if (totalParts < 2) {
        return {
          success: false,
          message: `缺少必要的参数。\n正确答案：${rule.command} 权限 文件名`,
          hint: this.getHint(rule.command),
        };
      }
      if (fs && totalParts >= 2) {
        const fileArg =
          parsed.args.length > 0 ? parsed.args[parsed.args.length - 1] : null;
        if (fileArg) {
          const resolvedPath = this.resolveArgPath(fileArg, currentPath);
          if (!fs.exists(resolvedPath)) {
            return {
              success: false,
              message: `文件 '${fileArg}' 不存在。\n当前目录: ${currentPath}`,
              hint: `请确认文件路径是否正确，或先创建该文件`,
            };
          }
        }
      }
      return {
        success: true,
        message: "命令正确！",
      };
    }

    if (rule.command === "find") {
      if (parsed.args.length === 0) {
        return {
          success: false,
          message: `缺少必要的参数。\n正确答案：${rule.command} 路径`,
          hint: this.getHint(rule.command),
        };
      }
      return {
        success: true,
        message: "命令正确！",
      };
    }

    if (
      rule.command === "mkdir" ||
      rule.command === "touch" ||
      rule.command === "rm" ||
      rule.command === "rmdir"
    ) {
      if (parsed.args.length === 0) {
        return {
          success: false,
          message: `缺少必要的参数。\n正确答案：${rule.command} ${rule.args ? rule.args[0] : "名称"}`,
          hint: this.getHint(rule.command),
        };
      }
      if (rule.args && rule.args.length > 0) {
        const hasArg = this.hasRequiredArgs(parsed.args, rule.args);
        if (hasArg) {
          return {
            success: true,
            message: "命令正确！",
          };
        }
      } else {
        return {
          success: true,
          message: "命令正确！",
        };
      }
    }

    if (rule.command === "cp" || rule.command === "mv") {
      if (parsed.args.length < 2) {
        return {
          success: false,
          message: `缺少必要的参数。\n正确答案：${rule.command} ${rule.args ? rule.args.join(" ") : "源 目标"}`,
          hint: this.getHint(rule.command),
        };
      }
      return {
        success: true,
        message: "命令正确！",
      };
    }

    if (rule.command === "tar") {
      if (rule.options && rule.options.length > 0) {
        const hasOption = this.hasRequiredOptions(
          parsed.command,
          parsed.options,
          rule.options,
        );
        if (!hasOption) {
          return {
            success: false,
            message: `缺少必要的选项。\n正确答案：${rule.command} ${rule.options.join(" ")} ${rule.args ? rule.args.join(" ") : ""}`,
            hint: this.getHint(rule.command),
          };
        }
      }
      if (parsed.args.length === 0) {
        return {
          success: false,
          message: `缺少必要的参数。\n正确答案：${rule.command} ${rule.args ? rule.args.join(" ") : "选项 文件名"}`,
          hint: this.getHint(rule.command),
        };
      }
      if (rule.args && rule.args.length > 0) {
        const hasArg = this.hasRequiredArgs(parsed.args, rule.args);
        if (!hasArg) {
          return {
            success: false,
            message: `缺少必要的参数。\n正确答案：${rule.command} ${rule.args ? rule.args.join(" ") : ""}`,
            hint: this.getHint(rule.command),
          };
        }
      }
      return {
        success: true,
        message: "命令正确！",
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
        message: "命令正确！",
      };
    }

    return {
      success: false,
      message: `命令不正确。\n正确答案：${rule.command}`,
      hint: this.getHint(rule.command),
    };
  }

  validateContains(parsed, rule) {
    if (!this.isCommandValid(parsed.command, rule.command)) {
      if (rule.command.includes(" ")) {
        const ruleParts = rule.command.split(" ");
        if (parsed.command !== ruleParts[0]) {
          return {
            success: false,
            message: `命令不正确。\n正确答案：${rule.command}${rule.options && rule.options.length > 0 ? " " + rule.options[0] : ""}${rule.args && rule.args.length > 0 ? " " + rule.args.join(" ") : ""}`,
            hint: this.getHint(rule.command),
          };
        }
        const userSubCommand = parsed.args.length > 0 ? parsed.args[0] : "";
        if (userSubCommand !== ruleParts[1]) {
          return {
            success: false,
            message: `命令不正确。\n正确答案：${rule.command}${rule.options && rule.options.length > 0 ? " " + rule.options[0] : ""}${rule.args && rule.args.length > 0 ? " " + rule.args.join(" ") : ""}`,
            hint: this.getHint(rule.command),
          };
        }
      } else {
        return {
          success: false,
          message: `命令不正确。\n正确答案：${rule.command}${rule.options && rule.options.length > 0 ? " " + rule.options[0] : ""}${rule.args && rule.args.length > 0 ? " " + rule.args.join(" ") : ""}`,
          hint: this.getHint(rule.command),
        };
      }
    }

    if (rule.options && rule.options.length > 0) {
      const hasRequiredOption = this.hasRequiredOptions(
        parsed.command,
        parsed.options,
        rule.options,
      );
      if (!hasRequiredOption) {
        return {
          success: false,
          message: `缺少必要的选项。\n正确答案：${rule.command}${rule.options && rule.options.length > 0 ? " " + rule.options[0] : ""}${rule.args && rule.args.length > 0 ? " " + rule.args.join(" ") : ""}`,
          hint: this.getHint(rule.command),
        };
      }
    }

    if (rule.args && rule.args.length > 0) {
      const userArgs = rule.command.includes(" ") ? parsed.args.slice(1) : parsed.args;
      const hasRequiredArg = this.hasRequiredArgs(userArgs, rule.args);
      if (!hasRequiredArg) {
        return {
          success: false,
          message: `缺少必要的参数。\n正确答案：${rule.command}${rule.options && rule.options.length > 0 ? " " + rule.options[0] : ""}${rule.args && rule.args.length > 0 ? " " + rule.args.join(" ") : ""}`,
          hint: this.getHint(rule.command),
        };
      }
    }

    return {
      success: true,
      message: "命令正确！",
    };
  }

  validateCommand(parsed, rule) {
    if (!this.isCommandValid(parsed.command, rule.command)) {
      if (rule.command.includes(" ")) {
        const ruleParts = rule.command.split(" ");
        if (parsed.command !== ruleParts[0]) {
          return {
            success: false,
            message: `命令不正确。\n正确答案：${rule.command}`,
            hint: this.getHint(rule.command),
          };
        }
        const userSubCommand = parsed.args.length > 0 ? parsed.args[0] : "";
        if (userSubCommand !== ruleParts[1]) {
          return {
            success: false,
            message: `命令不正确。\n正确答案：${rule.command}`,
            hint: this.getHint(rule.command),
          };
        }
      } else {
        return {
          success: false,
          message: `命令不正确。\n正确答案：${rule.command}`,
          hint: this.getHint(rule.command),
        };
      }
    }

    return {
      success: true,
      message: "命令正确！",
    };
  }

  validateOptions(parsed, rule) {
    if (!this.isCommandValid(parsed.command, rule.command)) {
      if (rule.command.includes(" ")) {
        const ruleParts = rule.command.split(" ");
        if (parsed.command !== ruleParts[0]) {
          return {
            success: false,
            message: `命令不正确。\n正确答案：${rule.command}`,
            hint: this.getHint(rule.command),
          };
        }
        const userSubCommand = parsed.args.length > 0 ? parsed.args[0] : "";
        if (userSubCommand !== ruleParts[1]) {
          return {
            success: false,
            message: `命令不正确。\n正确答案：${rule.command}`,
            hint: this.getHint(rule.command),
          };
        }
      } else {
        return {
          success: false,
          message: `命令不正确。\n正确答案：${rule.command}`,
          hint: this.getHint(rule.command),
        };
      }
    }

    if (rule.options && rule.options.length > 0) {
      const hasRequiredOption = this.hasRequiredOptions(
        parsed.command,
        parsed.options,
        rule.options,
      );
      if (!hasRequiredOption) {
        return {
          success: false,
          message: `缺少必要的选项。\n正确答案：${rule.command}`,
          hint: this.getHint(rule.command),
        };
      }
    }

    return {
      success: true,
      message: "命令正确！",
    };
  }

  validateArgs(parsed, rule) {
    let userArgs = parsed.args;

    if (!this.isCommandValid(parsed.command, rule.command)) {
      if (rule.command.includes(" ")) {
        const ruleParts = rule.command.split(" ");
        if (parsed.command !== ruleParts[0]) {
          return {
            success: false,
            message: `命令不正确。\n正确答案：${rule.command}`,
            hint: this.getHint(rule.command),
          };
        }
        const userSubCommand = parsed.args.length > 0 ? parsed.args[0] : "";
        if (userSubCommand !== ruleParts[1]) {
          return {
            success: false,
            message: `命令不正确。\n正确答案：${rule.command}`,
            hint: this.getHint(rule.command),
          };
        }
        userArgs = parsed.args.slice(1);
      } else {
        return {
          success: false,
          message: `命令不正确。\n正确答案：${rule.command}`,
          hint: this.getHint(rule.command),
        };
      }
    }

    if (rule.args && rule.args.length > 0) {
      const hasRequiredArgs = this.hasRequiredArgs(userArgs, rule.args);
      if (!hasRequiredArgs) {
        return {
          success: false,
          message: `缺少必要的参数。\n正确答案：${rule.command}`,
          hint: this.getHint(rule.command),
        };
      }
    }

    return {
      success: true,
      message: "命令正确！",
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

    for (const required of requiredOptions) {
      const optionAliases = aliases[required] || [required];
      const matched = userOptions.some((opt) => {
        if (optionAliases.includes(opt)) {
          return true;
        }
        for (const alias of optionAliases) {
          if (opt.length > 1 && opt.includes(alias)) {
            return true;
          }
          if (opt === "-" + alias.charAt(1) && alias.startsWith("-")) {
            return true;
          }
        }
        return false;
      });
      if (!matched) {
        return false;
      }
    }

    return true;
  }

  hasRequiredArgs(userArgs, requiredArgs) {
    if (!requiredArgs || requiredArgs.length === 0) {
      return userArgs.length > 0;
    }

    if (!userArgs || userArgs.length === 0) {
      return false;
    }

    for (const required of requiredArgs) {
      const matched = userArgs.some((arg) => {
        if (arg === required) return true;

        if (required === "~" && (arg === "~" || arg === "/home/user"))
          return true;
        if (arg === "~" && required === "/home/user") return true;

        if (required === ".." && arg === "..") return true;

        if (required.startsWith("*")) {
          const pattern = required.replace(/\*/g, "");
          return arg.includes(pattern);
        }

        if (required.endsWith(".txt") && arg.endsWith(".txt")) return true;
        if (required.endsWith(".log") && arg.endsWith(".log")) return true;
        if (required.endsWith(".tar") && arg.endsWith(".tar")) return true;
        if (required.endsWith(".gz") && arg.endsWith(".gz")) return true;

        if (required.includes("/") && arg.includes("/")) {
          const reqParts = required.split("/");
          const argParts = arg.split("/");
          if (argParts[argParts.length - 1] === reqParts[reqParts.length - 1])
            return true;
        }

        return false;
      });

      if (matched) return true;
    }

    return false;
  }

  getHint(command) {
    const hints = {
      pwd: "pwd命令显示当前工作目录",
      ls: "ls命令列出目录内容",
      "ls -a": "-a选项可以显示隐藏文件（以.开头的文件）",
      "ls -l": "-l选项以长格式显示详细信息",
      cd: "cd命令切换目录，..表示上一级目录",
      "cd ..": "..表示上一级目录",
      mkdir: "mkdir命令创建目录",
      touch: "touch命令创建空文件",
      cat: "cat命令显示文件内容",
      rm: "rm命令删除文件",
      rmdir: "rmdir命令删除空目录",
      cp: "cp命令复制文件",
      mv: "mv命令移动或重命名文件",
      grep: "grep命令搜索文本内容",
      chmod: "chmod命令改变文件权限",
      find: "find命令查找文件",
      whereis: "whereis命令查找命令位置",
      head: "head命令显示文件开头",
      tail: "tail命令显示文件末尾",
      tar: "tar命令打包文件",
      git: "git命令用于版本控制",
      docker: "docker命令用于容器管理",
      vim: "vim是文本编辑器",
      vi: "vi是文本编辑器",
      systemctl: "systemctl命令管理系统服务",
      journalctl: "journalctl命令查看系统日志",
    };

    return hints[command] || "请参考命令手册";
  }

  getEquivalentCommands(command) {
    const parsed = this.parseCommand(command);
    const equivalents = [];

    const aliases = this.commandAliases[parsed.command];
    if (aliases) {
      for (const alias of aliases) {
        if (alias !== parsed.command) {
          equivalents.push(
            alias +
              " " +
              parsed.options.join(" ") +
              " " +
              parsed.args.join(" "),
          );
        }
      }
    }

    const optionAliases = this.optionAliases[parsed.command] || {};
    for (const option of parsed.options) {
      const aliasesForOption = optionAliases[option];
      if (aliasesForOption) {
        for (const alias of aliasesForOption) {
          if (alias !== option) {
            const newOptions = parsed.options.map((o) =>
              o === option ? alias : o,
            );
            equivalents.push(
              parsed.command +
                " " +
                newOptions.join(" ") +
                " " +
                parsed.args.join(" "),
            );
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
      normalized:
        parsed.command +
        " " +
        normalizedOptions.join(" ") +
        " " +
        parsed.args.join(" "),
    };
  }

  compareCommands(command1, command2) {
    const normalized1 = this.normalizeCommand(command1);
    const normalized2 = this.normalizeCommand(command2);

    return normalized1.normalized === normalized2.normalized;
  }

  validateSubCommand(parsed, rule, commandName) {
    const subCommand = rule.command.substring(commandName.length + 1);

    if (subCommand.startsWith("-")) {
      const hasOption = parsed.options.some(
        (opt) => opt === subCommand || opt.startsWith(subCommand),
      );
      if (hasOption) {
        return {
          success: true,
          message: "命令正确！",
        };
      }
      return {
        success: false,
        message: `命令不正确。\n正确答案：${rule.command}`,
        hint: this.getHint(commandName),
      };
    }

    const subCommandParts = subCommand.split(" ");
    const requiredSubCommands = subCommandParts;

    const userSubCommands = parsed.args;

    for (let i = 0; i < requiredSubCommands.length; i++) {
      if (i >= userSubCommands.length) {
        return {
          success: false,
          message: `缺少必要的参数。\n正确答案：${rule.command}`,
          hint: this.getHint(commandName),
        };
      }

      if (userSubCommands[i] !== requiredSubCommands[i]) {
        return {
          success: false,
          message: `命令不正确。\n正确答案：${rule.command}`,
          hint: this.getHint(commandName),
        };
      }
    }

    if (rule.options && rule.options.length > 0) {
      const hasOption = parsed.options.some((opt) =>
        rule.options.includes(opt),
      );
      if (!hasOption) {
        return {
          success: false,
          message: `缺少必要的选项。\n正确答案：${rule.command}`,
          hint: this.getHint(commandName),
        };
      }
    }

    if (rule.args && rule.args.length > 0) {
      const hasArg = this.hasRequiredArgs(parsed.args.slice(requiredSubCommands.length), rule.args);
      if (!hasArg) {
        return {
          success: false,
          message: `缺少必要的参数。\n正确答案：${rule.command}`,
          hint: this.getHint(commandName),
        };
      }
    }

    return {
      success: true,
      message: "命令正确！",
    };
  }
}

window.CommandValidator = CommandValidator;

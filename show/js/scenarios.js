/* 场景/关卡数据 - Linux命令学习页面 */

const tutorialLevels = [
    {
        id: 1,
        name: '目录导航入门',
        description: '学习基本的目录导航命令：cd、pwd、ls',
        commands: ['cd', 'pwd', 'ls'],
        tasks: [
            {
                id: 1,
                title: '显示当前目录',
                description: '使用pwd命令显示当前工作目录的完整路径',
                goal: '显示当前所在的目录路径',
                hint: 'pwd命令可以显示当前工作目录',
                expectedCommand: 'pwd',
                validation: {
                    type: 'exact',
                    command: 'pwd'
                }
            },
            {
                id: 2,
                title: '列出目录内容',
                description: '使用ls命令列出当前目录的内容',
                goal: '列出当前目录下的所有文件和子目录',
                hint: 'ls命令可以列出目录内容',
                expectedCommand: 'ls',
                validation: {
                    type: 'contains',
                    command: 'ls',
                    options: []
                }
            },
            {
                id: 3,
                title: '显示隐藏文件',
                description: '使用ls -a命令显示当前目录的所有文件（包括隐藏文件）',
                goal: '列出当前目录下的所有文件，包括以.开头的隐藏文件',
                hint: '-a选项可以显示隐藏文件',
                expectedCommand: 'ls -a',
                validation: {
                    type: 'contains',
                    command: 'ls',
                    options: ['-a', '--all']
                }
            },
            {
                id: 4,
                title: '切换到上级目录',
                description: '使用cd ..命令切换到上一级目录',
                goal: '从当前目录切换到父目录',
                hint: '..表示上一级目录',
                expectedCommand: 'cd ..',
                validation: {
                    type: 'contains',
                    command: 'cd',
                    args: ['..']
                }
            },
            {
                id: 5,
                title: '切换到指定目录',
                description: '使用cd命令切换到/home/user目录',
                goal: '切换到/home/user目录',
                hint: 'cd命令后跟目录路径',
                expectedCommand: 'cd /home/user',
                validation: {
                    type: 'contains',
                    command: 'cd',
                    args: ['/home/user', '~']
                }
            }
        ]
    },
    {
        id: 2,
        name: '文件管理基础',
        description: '学习文件和目录的创建、复制、删除和移动',
        commands: ['touch', 'mkdir', 'cp', 'mv', 'rm', 'rmdir'],
        tasks: [
            {
                id: 1,
                title: '创建空文件',
                description: '使用touch命令创建一个名为test.txt的空文件',
                goal: '在当前目录创建test.txt文件',
                hint: 'touch命令可以创建空文件',
                expectedCommand: 'touch test.txt',
                validation: {
                    type: 'contains',
                    command: 'touch',
                    args: ['test.txt']
                }
            },
            {
                id: 2,
                title: '创建目录',
                description: '使用mkdir命令创建一个名为mydir的目录',
                goal: '在当前目录创建mydir目录',
                hint: 'mkdir命令可以创建目录',
                expectedCommand: 'mkdir mydir',
                validation: {
                    type: 'contains',
                    command: 'mkdir',
                    args: ['mydir']
                }
            },
            {
                id: 3,
                title: '复制文件',
                description: '使用cp命令将test.txt复制到mydir目录中',
                goal: '将test.txt复制到mydir目录',
                hint: 'cp命令后跟源文件和目标目录',
                expectedCommand: 'cp test.txt mydir',
                validation: {
                    type: 'contains',
                    command: 'cp',
                    args: ['test.txt', 'mydir']
                }
            },
            {
                id: 4,
                title: '移动文件',
                description: '使用mv命令将test.txt重命名为newtest.txt',
                goal: '将test.txt重命名为newtest.txt',
                hint: 'mv命令可以重命名文件',
                expectedCommand: 'mv test.txt newtest.txt',
                validation: {
                    type: 'contains',
                    command: 'mv',
                    args: ['test.txt', 'newtest.txt']
                }
            },
            {
                id: 5,
                title: '删除文件',
                description: '使用rm命令删除newtest.txt文件',
                goal: '删除newtest.txt文件',
                hint: 'rm命令可以删除文件',
                expectedCommand: 'rm newtest.txt',
                validation: {
                    type: 'contains',
                    command: 'rm',
                    args: ['newtest.txt']
                }
            },
            {
                id: 6,
                title: '删除空目录',
                description: '使用rmdir命令删除mydir目录',
                goal: '删除mydir目录（目录必须为空）',
                hint: 'rmdir只能删除空目录',
                expectedCommand: 'rmdir mydir',
                validation: {
                    type: 'contains',
                    command: 'rmdir',
                    args: ['mydir']
                }
            }
        ]
    },
    {
        id: 3,
        name: '文件内容查看',
        description: '学习查看文件内容的各种命令',
        commands: ['cat', 'more', 'less', 'head', 'tail'],
        tasks: [
            {
                id: 1,
                title: '显示文件内容',
                description: '使用cat命令显示readme.txt文件的内容',
                goal: '查看documents目录下的readme.txt文件内容',
                hint: '先切换到documents目录，然后使用cat命令',
                expectedCommand: 'cat readme.txt',
                validation: {
                    type: 'contains',
                    command: 'cat',
                    args: ['readme.txt']
                }
            },
            {
                id: 2,
                title: '显示文件开头',
                description: '使用head命令显示app.log文件的前5行',
                goal: '查看logs目录下app.log文件的前5行内容',
                hint: 'head -n 5可以显示前5行',
                expectedCommand: 'head -n 5 app.log',
                validation: {
                    type: 'contains',
                    command: 'head',
                    options: ['-n'],
                    args: ['5', 'app.log']
                }
            },
            {
                id: 3,
                title: '显示文件末尾',
                description: '使用tail命令显示app.log文件的最后3行',
                goal: '查看app.log文件的最后3行内容',
                hint: 'tail -n 3可以显示最后3行',
                expectedCommand: 'tail -n 3 app.log',
                validation: {
                    type: 'contains',
                    command: 'tail',
                    options: ['-n'],
                    args: ['3', 'app.log']
                }
            },
            {
                id: 4,
                title: '分页显示文件',
                description: '使用more命令分页显示notes.txt文件',
                goal: '使用分页方式查看notes.txt文件',
                hint: 'more命令可以分页显示文件内容',
                expectedCommand: 'more notes.txt',
                validation: {
                    type: 'contains',
                    command: 'more',
                    args: ['notes.txt']
                }
            },
            {
                id: 5,
                title: '使用less查看文件',
                description: '使用less命令查看notes.txt文件',
                goal: '使用less命令查看文件内容（支持向前翻页）',
                hint: 'less命令比more更强大，支持向前翻页',
                expectedCommand: 'less notes.txt',
                validation: {
                    type: 'contains',
                    command: 'less',
                    args: ['notes.txt']
                }
            }
        ]
    },
    {
        id: 4,
        name: '文件查找技巧',
        description: '学习查找文件和搜索文本的命令',
        commands: ['find', 'whereis', 'grep'],
        tasks: [
            {
                id: 1,
                title: '查找文件',
                description: '使用find命令在当前目录查找名为readme.txt的文件',
                goal: '查找readme.txt文件的位置',
                hint: 'find . -name readme.txt可以在当前目录查找文件',
                expectedCommand: 'find . -name readme.txt',
                validation: {
                    type: 'contains',
                    command: 'find',
                    options: ['-name'],
                    args: ['readme.txt']
                }
            },
            {
                id: 2,
                title: '查找命令位置',
                description: '使用whereis命令查找ls命令的位置',
                goal: '查找ls命令所在的目录',
                hint: 'whereis命令可以查找命令的位置',
                expectedCommand: 'whereis ls',
                validation: {
                    type: 'exact',
                    command: 'whereis ls'
                }
            },
            {
                id: 3,
                title: '搜索文本内容',
                description: '使用grep命令在app.log中搜索ERROR关键字',
                goal: '在app.log文件中查找包含ERROR的行',
                hint: 'grep ERROR app.log可以搜索文本',
                expectedCommand: 'grep ERROR app.log',
                validation: {
                    type: 'contains',
                    command: 'grep',
                    args: ['ERROR', 'app.log']
                }
            },
            {
                id: 4,
                title: '忽略大小写搜索',
                description: '使用grep -i命令在app.log中搜索error（忽略大小写）',
                goal: '在app.log中搜索error，不区分大小写',
                hint: '-i选项可以忽略大小写',
                expectedCommand: 'grep -i error app.log',
                validation: {
                    type: 'contains',
                    command: 'grep',
                    options: ['-i'],
                    args: ['error', 'app.log']
                }
            }
        ]
    },
    {
        id: 5,
        name: '权限管理',
        description: '学习文件和目录权限的管理',
        commands: ['chmod'],
        tasks: [
            {
                id: 1,
                title: '数字方式设置权限',
                description: '使用chmod 755命令设置test.txt的权限',
                goal: '将test.txt的权限设置为rwxr-xr-x（755）',
                hint: 'chmod 755 file可以设置权限',
                expectedCommand: 'chmod 755 test.txt',
                validation: {
                    type: 'contains',
                    command: 'chmod',
                    args: ['755', 'test.txt']
                }
            },
            {
                id: 2,
                title: '添加执行权限',
                description: '使用chmod +x命令给test.txt添加执行权限',
                goal: '给test.txt添加执行权限',
                hint: '+x表示添加执行权限',
                expectedCommand: 'chmod +x test.txt',
                validation: {
                    type: 'contains',
                    command: 'chmod',
                    args: ['+x', 'test.txt']
                }
            },
            {
                id: 3,
                title: '移除写权限',
                description: '使用chmod -w命令移除test.txt的写权限',
                goal: '移除test.txt的写权限',
                hint: '-w表示移除写权限',
                expectedCommand: 'chmod -w test.txt',
                validation: {
                    type: 'contains',
                    command: 'chmod',
                    args: ['-w', 'test.txt']
                }
            },
            {
                id: 4,
                title: '设置所有用户权限',
                description: '使用chmod a+r命令给所有用户添加读权限',
                goal: '给所有用户添加读权限',
                hint: 'a表示所有用户，+r表示添加读权限',
                expectedCommand: 'chmod a+r test.txt',
                validation: {
                    type: 'contains',
                    command: 'chmod',
                    args: ['a+r', 'test.txt']
                }
            }
        ]
    },
    {
        id: 6,
        name: '压缩与备份',
        description: '学习文件打包和压缩命令',
        commands: ['tar', 'gzip', 'bzip2'],
        tasks: [
            {
                id: 1,
                title: '打包文件',
                description: '使用tar命令打包documents目录',
                goal: '将documents目录打包为documents.tar',
                hint: 'tar -cvf documents.tar documents可以打包目录',
                expectedCommand: 'tar -cvf documents.tar documents',
                validation: {
                    type: 'contains',
                    command: 'tar',
                    options: ['-c', '-v', '-f'],
                    args: ['documents.tar', 'documents']
                }
            },
            {
                id: 2,
                title: '打包并压缩',
                description: '使用tar命令打包并用gzip压缩documents目录',
                goal: '将documents目录打包并压缩为documents.tar.gz',
                hint: '-z选项使用gzip压缩',
                expectedCommand: 'tar -czvf documents.tar.gz documents',
                validation: {
                    type: 'contains',
                    command: 'tar',
                    options: ['-c', '-z', '-v', '-f'],
                    args: ['documents.tar.gz', 'documents']
                }
            },
            {
                id: 3,
                title: '解压文件',
                description: '使用tar命令解压documents.tar.gz文件',
                goal: '解压documents.tar.gz文件',
                hint: '-x选项解压文件',
                expectedCommand: 'tar -xzvf documents.tar.gz',
                validation: {
                    type: 'contains',
                    command: 'tar',
                    options: ['-x', '-z', '-v', '-f'],
                    args: ['documents.tar.gz']
                }
            },
            {
                id: 4,
                title: '使用gzip压缩',
                description: '使用gzip命令压缩test.txt文件',
                goal: '将test.txt压缩为test.txt.gz',
                hint: 'gzip命令可以直接压缩文件',
                expectedCommand: 'gzip test.txt',
                validation: {
                    type: 'contains',
                    command: 'gzip',
                    args: ['test.txt']
                }
            }
        ]
    }
];

const practiceScenarios = [
    {
        id: 1,
        name: '新员工入职',
        description: '作为新员工，你需要熟悉公司的文件系统结构',
        story: '欢迎加入公司！作为新员工，你需要了解公司的文件系统结构，创建自己的工作目录，并熟悉基本的文件操作。',
        requiredLevels: [],
        tasks: [
            {
                id: 1,
                title: '查看当前位置',
                description: '首先，查看你当前所在的目录位置',
                goal: '显示当前工作目录',
                hint: '使用pwd命令',
                expectedCommand: 'pwd',
                validation: {
                    type: 'exact',
                    command: 'pwd'
                }
            },
            {
                id: 2,
                title: '查看目录结构',
                description: '查看当前目录下有哪些文件和目录',
                goal: '列出当前目录的内容',
                hint: '使用ls命令',
                expectedCommand: 'ls',
                validation: {
                    type: 'contains',
                    command: 'ls'
                }
            },
            {
                id: 3,
                title: '创建工作目录',
                description: '在projects目录下创建一个名为mywork的目录',
                goal: '在projects目录下创建mywork目录',
                hint: '先切换到projects目录，然后使用mkdir命令',
                expectedCommand: 'mkdir mywork',
                validation: {
                    type: 'contains',
                    command: 'mkdir',
                    args: ['mywork']
                }
            },
            {
                id: 4,
                title: '创建工作文件',
                description: '在mywork目录下创建一个名为todo.txt的文件',
                goal: '在mywork目录创建todo.txt文件',
                hint: '使用touch命令创建文件',
                expectedCommand: 'touch todo.txt',
                validation: {
                    type: 'contains',
                    command: 'touch',
                    args: ['todo.txt']
                }
            },
            {
                id: 5,
                title: '查看文件内容',
                description: '查看documents目录下的readme.txt文件内容',
                goal: '查看readme.txt文件内容',
                hint: '使用cat命令查看文件',
                expectedCommand: 'cat readme.txt',
                validation: {
                    type: 'contains',
                    command: 'cat',
                    args: ['readme.txt']
                }
            },
            {
                id: 6,
                title: '返回主目录',
                description: '完成所有任务后，返回到你的主目录',
                goal: '切换到/home/user目录',
                hint: '使用cd命令切换目录',
                expectedCommand: 'cd /home/user',
                validation: {
                    type: 'contains',
                    command: 'cd',
                    args: ['/home/user', '~']
                }
            }
        ]
    },
    {
        id: 2,
        name: '日志分析员',
        description: '作为日志分析员，你需要分析系统日志文件',
        story: '公司服务器出现了一些问题，作为日志分析员，你需要分析日志文件找出问题所在。',
        requiredLevels: [1, 4],
        tasks: [
            {
                id: 1,
                title: '进入日志目录',
                description: '切换到logs目录查看日志文件',
                goal: '切换到/home/user/logs目录',
                hint: '使用cd命令切换目录',
                expectedCommand: 'cd logs',
                validation: {
                    type: 'contains',
                    command: 'cd',
                    args: ['logs']
                }
            },
            {
                id: 2,
                title: '查看日志文件',
                description: '查看app.log文件的内容',
                goal: '显示app.log文件内容',
                hint: '使用cat命令查看文件',
                expectedCommand: 'cat app.log',
                validation: {
                    type: 'contains',
                    command: 'cat',
                    args: ['app.log']
                }
            },
            {
                id: 3,
                title: '查找错误信息',
                description: '在app.log中查找所有ERROR信息',
                goal: '搜索包含ERROR的行',
                hint: '使用grep命令搜索文本',
                expectedCommand: 'grep ERROR app.log',
                validation: {
                    type: 'contains',
                    command: 'grep',
                    args: ['ERROR', 'app.log']
                }
            },
            {
                id: 4,
                title: '查看最近的日志',
                description: '查看app.log文件的最后5行',
                goal: '显示app.log最后5行',
                hint: '使用tail命令查看文件末尾',
                expectedCommand: 'tail -n 5 app.log',
                validation: {
                    type: 'contains',
                    command: 'tail',
                    options: ['-n'],
                    args: ['5', 'app.log']
                }
            },
            {
                id: 5,
                title: '查找所有日志文件',
                description: '查找logs目录下所有的.log文件',
                goal: '查找所有.log文件',
                hint: '使用find命令查找文件',
                expectedCommand: 'find . -name "*.log"',
                validation: {
                    type: 'contains',
                    command: 'find',
                    options: ['-name'],
                    args: ['*.log']
                }
            }
        ]
    },
    {
        id: 3,
        name: '项目部署',
        description: '作为运维工程师，你需要部署一个新项目',
        story: '公司开发了一个新项目，需要你将项目文件打包部署到服务器上。',
        requiredLevels: [5, 6],
        tasks: [
            {
                id: 1,
                title: '进入项目目录',
                description: '切换到projects/myapp目录',
                goal: '切换到myapp目录',
                hint: '使用cd命令切换目录',
                expectedCommand: 'cd projects/myapp',
                validation: {
                    type: 'contains',
                    command: 'cd',
                    args: ['projects/myapp', 'myapp']
                }
            },
            {
                id: 2,
                title: '查看项目文件',
                description: '查看项目目录下的所有文件',
                goal: '列出myapp目录内容',
                hint: '使用ls命令',
                expectedCommand: 'ls',
                validation: {
                    type: 'contains',
                    command: 'ls'
                }
            },
            {
                id: 3,
                title: '打包项目文件',
                description: '将项目文件打包为myapp.tar.gz',
                goal: '打包并压缩项目文件',
                hint: '使用tar命令打包',
                expectedCommand: 'tar -czvf myapp.tar.gz .',
                validation: {
                    type: 'contains',
                    command: 'tar',
                    options: ['-c', '-z', '-v', '-f']
                }
            },
            {
                id: 4,
                title: '设置文件权限',
                description: '给main.c文件添加执行权限',
                goal: '设置main.c的权限为可执行',
                hint: '使用chmod命令',
                expectedCommand: 'chmod +x main.c',
                validation: {
                    type: 'contains',
                    command: 'chmod',
                    args: ['+x', 'main.c']
                }
            },
            {
                id: 5,
                title: '移动打包文件',
                description: '将myapp.tar.gz移动到上级目录',
                goal: '移动打包文件到projects目录',
                hint: '使用mv命令移动文件',
                expectedCommand: 'mv myapp.tar.gz ..',
                validation: {
                    type: 'contains',
                    command: 'mv',
                    args: ['myapp.tar.gz', '..']
                }
            },
            {
                id: 6,
                title: '返回上级目录',
                description: '返回到projects目录',
                goal: '切换到projects目录',
                hint: '使用cd命令',
                expectedCommand: 'cd ..',
                validation: {
                    type: 'contains',
                    command: 'cd',
                    args: ['..']
                }
            }
        ]
    },
    {
        id: 4,
        name: '系统维护',
        description: '作为系统管理员，你需要清理和维护系统',
        story: '系统运行一段时间后，需要清理临时文件和备份重要数据。',
        requiredLevels: [2, 6],
        tasks: [
            {
                id: 1,
                title: '查看临时目录',
                description: '切换到/tmp目录查看临时文件',
                goal: '切换到/tmp目录',
                hint: '使用cd命令',
                expectedCommand: 'cd /tmp',
                validation: {
                    type: 'contains',
                    command: 'cd',
                    args: ['/tmp']
                }
            },
            {
                id: 2,
                title: '创建备份目录',
                description: '在/home/user目录下创建backup目录',
                goal: '创建backup目录',
                hint: '使用mkdir命令',
                expectedCommand: 'mkdir backup',
                validation: {
                    type: 'contains',
                    command: 'mkdir',
                    args: ['backup']
                }
            },
            {
                id: 3,
                title: '备份重要文件',
                description: '将documents目录复制到backup目录',
                goal: '复制documents到backup',
                hint: '使用cp -r命令复制目录',
                expectedCommand: 'cp -r documents backup',
                validation: {
                    type: 'contains',
                    command: 'cp',
                    options: ['-r'],
                    args: ['documents', 'backup']
                }
            },
            {
                id: 4,
                title: '打包备份文件',
                description: '将backup目录打包为backup.tar.gz',
                goal: '打包备份目录',
                hint: '使用tar命令',
                expectedCommand: 'tar -czvf backup.tar.gz backup',
                validation: {
                    type: 'contains',
                    command: 'tar',
                    options: ['-c', '-z', '-v', '-f'],
                    args: ['backup.tar.gz', 'backup']
                }
            },
            {
                id: 5,
                title: '清理临时文件',
                description: '删除/tmp目录下的所有文件',
                goal: '清理临时目录',
                hint: '使用rm -rf命令删除',
                expectedCommand: 'rm -rf *',
                validation: {
                    type: 'contains',
                    command: 'rm',
                    options: ['-r', '-f']
                }
            }
        ]
    }
];

window.tutorialLevels = tutorialLevels;
window.practiceScenarios = practiceScenarios;
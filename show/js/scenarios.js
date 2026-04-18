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
    },
    {
        id: 7,
        name: 'Vim编辑器入门',
        description: '学习Vim编辑器的基本操作和常用命令',
        commands: ['vim', 'vi'],
        tasks: [
            {
                id: 1,
                title: '启动Vim',
                description: '使用vim命令启动Vim编辑器',
                goal: '打开Vim编辑器',
                hint: '输入vim命令即可启动',
                expectedCommand: 'vim',
                validation: {
                    type: 'exact',
                    command: 'vim'
                }
            },
            {
                id: 2,
                title: '打开文件',
                description: '使用vim打开test.txt文件',
                goal: '用Vim打开test.txt文件进行编辑',
                hint: 'vim 文件名 可以打开文件',
                expectedCommand: 'vim test.txt',
                validation: {
                    type: 'contains',
                    command: 'vim',
                    args: ['test.txt']
                }
            },
            {
                id: 3,
                title: '进入插入模式',
                description: '在Vim中按i键进入插入模式',
                goal: '进入插入模式以便编辑文本',
                hint: '在普通模式下按i键',
                expectedCommand: 'i',
                validation: {
                    type: 'exact',
                    command: 'i'
                }
            },
            {
                id: 4,
                title: '保存并退出',
                description: '在Vim中保存文件并退出（输入:wq）',
                goal: '保存文件并退出Vim',
                hint: '在普通模式下输入:wq',
                expectedCommand: ':wq',
                validation: {
                    type: 'exact',
                    command: ':wq'
                }
            },
            {
                id: 5,
                title: '退出不保存',
                description: '在Vim中不保存直接退出（输入:q!）',
                goal: '放弃修改并退出Vim',
                hint: '在普通模式下输入:q!',
                expectedCommand: ':q!',
                validation: {
                    type: 'exact',
                    command: ':q!'
                }
            },
            {
                id: 6,
                title: '删除一行',
                description: '在Vim普通模式下删除当前行（按dd）',
                goal: '删除光标所在的整行',
                hint: '在普通模式下按dd',
                expectedCommand: 'dd',
                validation: {
                    type: 'exact',
                    command: 'dd'
                }
            },
            {
                id: 7,
                title: '复制粘贴',
                description: '在Vim中复制当前行并粘贴（yy和p）',
                goal: '复制一行并粘贴到下一行',
                hint: 'yy复制，p粘贴',
                expectedCommand: 'yy',
                validation: {
                    type: 'exact',
                    command: 'yy'
                }
            },
            {
                id: 8,
                title: '跳转到行首',
                description: '在Vim中跳转到当前行的行首（按0）',
                goal: '快速移动到行首',
                hint: '在普通模式下按0',
                expectedCommand: '0',
                validation: {
                    type: 'exact',
                    command: '0'
                }
            },
            {
                id: 9,
                title: '跳转到行尾',
                description: '在Vim中跳转到当前行的行尾（按$）',
                goal: '快速移动到行尾',
                hint: '在普通模式下按$',
                expectedCommand: '$',
                validation: {
                    type: 'exact',
                    command: '$'
                }
            },
            {
                id: 10,
                title: '向下翻页',
                description: '在Vim中向下翻页（按Ctrl+f）',
                goal: '向下翻一页',
                hint: '按Ctrl+f向下翻页',
                expectedCommand: 'Ctrl+f',
                validation: {
                    type: 'exact',
                    command: 'Ctrl+f'
                }
            },
            {
                id: 11,
                title: '向上翻页',
                description: '在Vim中向上翻页（按Ctrl+b）',
                goal: '向上翻一页',
                hint: '按Ctrl+b向上翻页',
                expectedCommand: 'Ctrl+b',
                validation: {
                    type: 'exact',
                    command: 'Ctrl+b'
                }
            },
            {
                id: 12,
                title: '跳转到文件开头',
                description: '在Vim中跳转到文件开头（按gg）',
                goal: '快速跳转到文件第一行',
                hint: '按gg跳转到文件开头',
                expectedCommand: 'gg',
                validation: {
                    type: 'exact',
                    command: 'gg'
                }
            },
            {
                id: 13,
                title: '跳转到文件末尾',
                description: '在Vim中跳转到文件末尾（按G）',
                goal: '快速跳转到文件最后一行',
                hint: '按G跳转到文件末尾',
                expectedCommand: 'G',
                validation: {
                    type: 'exact',
                    command: 'G'
                }
            },
            {
                id: 14,
                title: '搜索文本',
                description: '在Vim中搜索文本（输入/hello）',
                goal: '向下搜索hello关键字',
                hint: '在普通模式下输入/hello进行搜索',
                expectedCommand: '/hello',
                validation: {
                    type: 'contains',
                    command: '/hello'
                }
            },
            {
                id: 15,
                title: '查找下一个',
                description: '在Vim中查找下一个匹配项（按n）',
                goal: '跳转到下一个搜索结果',
                hint: '按n查找下一个匹配项',
                expectedCommand: 'n',
                validation: {
                    type: 'exact',
                    command: 'n'
                }
            },
            {
                id: 16,
                title: '查找上一个',
                description: '在Vim中查找上一个匹配项（按N）',
                goal: '跳转到上一个搜索结果',
                hint: '按N查找上一个匹配项',
                expectedCommand: 'N',
                validation: {
                    type: 'exact',
                    command: 'N'
                }
            },
            {
                id: 17,
                title: '替换当前行',
                description: '在Vim中替换当前行的第一个匹配（输入:s/old/new/）',
                goal: '将当前行的第一个old替换为new',
                hint: '输入:s/old/new/进行替换',
                expectedCommand: ':s/old/new/',
                validation: {
                    type: 'contains',
                    command: ':s/old/new/'
                }
            },
            {
                id: 18,
                title: '替换整行所有',
                description: '在Vim中替换当前行所有匹配（输入:s/old/new/g）',
                goal: '将当前行所有的old替换为new',
                hint: '添加g标志替换所有匹配',
                expectedCommand: ':s/old/new/g',
                validation: {
                    type: 'contains',
                    command: ':s/old/new/g'
                }
            },
            {
                id: 19,
                title: '全局替换',
                description: '在Vim中替换整个文件的所有匹配（输入:%s/old/new/g）',
                goal: '将文件中所有的old替换为new',
                hint: '使用%s进行全局替换',
                expectedCommand: ':%s/old/new/g',
                validation: {
                    type: 'contains',
                    command: ':%s/old/new/g'
                }
            },
            {
                id: 20,
                title: '撤销操作',
                description: '在Vim中撤销上一步操作（按u）',
                goal: '撤销最近的修改',
                hint: '按u撤销操作',
                expectedCommand: 'u',
                validation: {
                    type: 'exact',
                    command: 'u'
                }
            },
            {
                id: 21,
                title: '重做操作',
                description: '在Vim中重做被撤销的操作（按Ctrl+r）',
                goal: '重做被撤销的操作',
                hint: '按Ctrl+r重做',
                expectedCommand: 'Ctrl+r',
                validation: {
                    type: 'exact',
                    command: 'Ctrl+r'
                }
            },
            {
                id: 22,
                title: '显示行号',
                description: '在Vim中显示行号（输入:set number）',
                goal: '在编辑器中显示行号',
                hint: '输入:set number显示行号',
                expectedCommand: ':set number',
                validation: {
                    type: 'exact',
                    command: ':set number'
                }
            },
            {
                id: 23,
                title: '跳转到指定行',
                description: '在Vim中跳转到第10行（输入:10）',
                goal: '快速跳转到指定行号',
                hint: '输入:行号跳转到指定行',
                expectedCommand: ':10',
                validation: {
                    type: 'exact',
                    command: ':10'
                }
            },
            {
                id: 24,
                title: '删除到行尾',
                description: '在Vim中删除从光标到行尾的内容（按D）',
                goal: '删除光标后的所有内容',
                hint: '按D删除到行尾',
                expectedCommand: 'D',
                validation: {
                    type: 'exact',
                    command: 'D'
                }
            },
            {
                id: 25,
                title: '删除单词',
                description: '在Vim中删除一个单词（按dw）',
                goal: '删除光标所在的单词',
                hint: '按dw删除单词',
                expectedCommand: 'dw',
                validation: {
                    type: 'exact',
                    command: 'dw'
                }
            },
            {
                id: 26,
                title: '追加文本',
                description: '在Vim中在行尾追加文本（按A）',
                goal: '在当前行末尾插入文本',
                hint: '按A进入行尾插入模式',
                expectedCommand: 'A',
                validation: {
                    type: 'exact',
                    command: 'A'
                }
            },
            {
                id: 27,
                title: '新开一行',
                description: '在Vim中在当前行下方新开一行（按o）',
                goal: '在当前行下方插入新行',
                hint: '按o在下方插入新行',
                expectedCommand: 'o',
                validation: {
                    type: 'exact',
                    command: 'o'
                }
            },
            {
                id: 28,
                title: '在上方新开一行',
                description: '在Vim中在当前行上方新开一行（按O）',
                goal: '在当前行上方插入新行',
                hint: '按O在上方插入新行',
                expectedCommand: 'O',
                validation: {
                    type: 'exact',
                    command: 'O'
                }
            }
        ]
    },
    {
        id: 8,
        name: 'Docker容器基础',
        description: '学习Docker容器的基本操作命令',
        commands: ['docker'],
        tasks: [
            {
                id: 1,
                title: '查看Docker版本',
                description: '使用docker --version查看Docker版本信息',
                goal: '显示当前安装的Docker版本',
                hint: 'docker --version 可以查看版本',
                expectedCommand: 'docker --version',
                validation: {
                    type: 'exact',
                    command: 'docker --version'
                }
            },
            {
                id: 2,
                title: '查看本地镜像',
                description: '使用docker images列出本地所有镜像',
                goal: '列出本地Docker镜像列表',
                hint: 'docker images 命令查看镜像',
                expectedCommand: 'docker images',
                validation: {
                    type: 'exact',
                    command: 'docker images'
                }
            },
            {
                id: 3,
                title: '搜索镜像',
                description: '使用docker search在Docker Hub搜索nginx镜像',
                goal: '搜索nginx镜像',
                hint: 'docker search 镜像名',
                expectedCommand: 'docker search nginx',
                validation: {
                    type: 'contains',
                    command: 'docker search',
                    args: ['nginx']
                }
            },
            {
                id: 4,
                title: '拉取镜像',
                description: '使用docker pull拉取hello-world镜像',
                goal: '从Docker Hub下载hello-world镜像',
                hint: 'docker pull 镜像名',
                expectedCommand: 'docker pull hello-world',
                validation: {
                    type: 'contains',
                    command: 'docker pull',
                    args: ['hello-world']
                }
            },
            {
                id: 5,
                title: '运行容器',
                description: '使用docker run运行hello-world容器',
                goal: '运行hello-world容器并查看输出',
                hint: 'docker run 镜像名',
                expectedCommand: 'docker run hello-world',
                validation: {
                    type: 'contains',
                    command: 'docker run',
                    args: ['hello-world']
                }
            },
            {
                id: 6,
                title: '查看运行容器',
                description: '使用docker ps查看正在运行的容器',
                goal: '列出所有正在运行的容器',
                hint: 'docker ps 显示运行中的容器',
                expectedCommand: 'docker ps',
                validation: {
                    type: 'exact',
                    command: 'docker ps'
                }
            },
            {
                id: 7,
                title: '查看所有容器',
                description: '使用docker ps -a查看所有容器（包括停止的）',
                goal: '列出所有容器，包括已停止的',
                hint: '-a 选项显示所有容器',
                expectedCommand: 'docker ps -a',
                validation: {
                    type: 'contains',
                    command: 'docker ps',
                    options: ['-a']
                }
            },
            {
                id: 8,
                title: '停止容器',
                description: '使用docker stop停止容器（容器ID为abc123）',
                goal: '停止运行中的容器',
                hint: 'docker stop 容器ID',
                expectedCommand: 'docker stop abc123',
                validation: {
                    type: 'contains',
                    command: 'docker stop',
                    args: ['abc123']
                }
            },
            {
                id: 9,
                title: '删除容器',
                description: '使用docker rm删除容器（容器ID为abc123）',
                goal: '删除已停止的容器',
                hint: 'docker rm 容器ID',
                expectedCommand: 'docker rm abc123',
                validation: {
                    type: 'contains',
                    command: 'docker rm',
                    args: ['abc123']
                }
            },
            {
                id: 10,
                title: '删除镜像',
                description: '使用docker rmi删除镜像（镜像ID为xyz789）',
                goal: '删除本地Docker镜像',
                hint: 'docker rmi 镜像ID',
                expectedCommand: 'docker rmi xyz789',
                validation: {
                    type: 'contains',
                    command: 'docker rmi',
                    args: ['xyz789']
                }
            },
            {
                id: 11,
                title: '查看容器日志',
                description: '使用docker logs查看容器日志（容器ID为web01）',
                goal: '查看容器的标准输出日志',
                hint: 'docker logs 容器ID',
                expectedCommand: 'docker logs web01',
                validation: {
                    type: 'contains',
                    command: 'docker logs',
                    args: ['web01']
                }
            },
            {
                id: 12,
                title: '实时查看日志',
                description: '使用docker logs -f实时跟踪容器日志',
                goal: '实时查看容器日志输出',
                hint: '添加-f选项实时跟踪日志',
                expectedCommand: 'docker logs -f web01',
                validation: {
                    type: 'contains',
                    command: 'docker logs',
                    options: ['-f'],
                    args: ['web01']
                }
            },
            {
                id: 13,
                title: '进入运行中的容器',
                description: '使用docker exec进入容器（容器ID为web01）',
                goal: '在运行中的容器内执行命令',
                hint: 'docker exec -it 容器ID /bin/bash',
                expectedCommand: 'docker exec -it web01 /bin/bash',
                validation: {
                    type: 'contains',
                    command: 'docker exec',
                    options: ['-it'],
                    args: ['web01', '/bin/bash']
                }
            },
            {
                id: 14,
                title: '在容器中执行命令',
                description: '使用docker exec在容器中执行ls命令',
                goal: '在容器内执行单个命令',
                hint: 'docker exec 容器ID ls',
                expectedCommand: 'docker exec web01 ls',
                validation: {
                    type: 'contains',
                    command: 'docker exec',
                    args: ['web01', 'ls']
                }
            },
            {
                id: 15,
                title: '查看容器详细信息',
                description: '使用docker inspect查看容器详细信息',
                goal: '查看容器的完整配置信息',
                hint: 'docker inspect 容器ID',
                expectedCommand: 'docker inspect web01',
                validation: {
                    type: 'contains',
                    command: 'docker inspect',
                    args: ['web01']
                }
            },
            {
                id: 16,
                title: '查看容器资源使用',
                description: '使用docker stats查看容器资源使用情况',
                goal: '实时显示容器的CPU、内存等资源使用',
                hint: 'docker stats 显示资源使用',
                expectedCommand: 'docker stats',
                validation: {
                    type: 'exact',
                    command: 'docker stats'
                }
            },
            {
                id: 17,
                title: '查看容器进程',
                description: '使用docker top查看容器内运行的进程',
                goal: '查看容器内的进程列表',
                hint: 'docker top 容器ID',
                expectedCommand: 'docker top web01',
                validation: {
                    type: 'contains',
                    command: 'docker top',
                    args: ['web01']
                }
            },
            {
                id: 18,
                title: '查看容器端口映射',
                description: '使用docker port查看容器端口映射',
                goal: '查看容器的端口映射关系',
                hint: 'docker port 容器ID',
                expectedCommand: 'docker port web01',
                validation: {
                    type: 'contains',
                    command: 'docker port',
                    args: ['web01']
                }
            },
            {
                id: 19,
                title: '重启容器',
                description: '使用docker restart重启容器',
                goal: '重启运行中的容器',
                hint: 'docker restart 容器ID',
                expectedCommand: 'docker restart web01',
                validation: {
                    type: 'contains',
                    command: 'docker restart',
                    args: ['web01']
                }
            },
            {
                id: 20,
                title: '暂停容器',
                description: '使用docker pause暂停容器',
                goal: '暂停容器中的所有进程',
                hint: 'docker pause 容器ID',
                expectedCommand: 'docker pause web01',
                validation: {
                    type: 'contains',
                    command: 'docker pause',
                    args: ['web01']
                }
            },
            {
                id: 21,
                title: '恢复容器',
                description: '使用docker unpause恢复容器',
                goal: '恢复被暂停的容器',
                hint: 'docker unpause 容器ID',
                expectedCommand: 'docker unpause web01',
                validation: {
                    type: 'contains',
                    command: 'docker unpause',
                    args: ['web01']
                }
            },
            {
                id: 22,
                title: '查看Docker网络',
                description: '使用docker network ls查看Docker网络',
                goal: '列出所有Docker网络',
                hint: 'docker network ls',
                expectedCommand: 'docker network ls',
                validation: {
                    type: 'exact',
                    command: 'docker network ls'
                }
            },
            {
                id: 23,
                title: '创建网络',
                description: '使用docker network create创建自定义网络',
                goal: '创建一个名为mynet的网络',
                hint: 'docker network create 网络名',
                expectedCommand: 'docker network create mynet',
                validation: {
                    type: 'contains',
                    command: 'docker network create',
                    args: ['mynet']
                }
            },
            {
                id: 24,
                title: '查看Docker卷',
                description: '使用docker volume ls查看数据卷',
                goal: '列出所有Docker数据卷',
                hint: 'docker volume ls',
                expectedCommand: 'docker volume ls',
                validation: {
                    type: 'exact',
                    command: 'docker volume ls'
                }
            },
            {
                id: 25,
                title: '创建数据卷',
                description: '使用docker volume create创建数据卷',
                goal: '创建一个名为mydata的数据卷',
                hint: 'docker volume create 卷名',
                expectedCommand: 'docker volume create mydata',
                validation: {
                    type: 'contains',
                    command: 'docker volume create',
                    args: ['mydata']
                }
            },
            {
                id: 26,
                title: '挂载数据卷运行容器',
                description: '运行容器并挂载数据卷',
                goal: '运行容器时挂载数据卷',
                hint: 'docker run -v 卷名:容器路径 镜像名',
                expectedCommand: 'docker run -v mydata:/data nginx',
                validation: {
                    type: 'contains',
                    command: 'docker run',
                    options: ['-v']
                }
            },
            {
                id: 27,
                title: '保存镜像为文件',
                description: '使用docker save保存镜像为tar文件',
                goal: '将镜像导出为tar文件',
                hint: 'docker save -o 文件名 镜像名',
                expectedCommand: 'docker save -o nginx.tar nginx',
                validation: {
                    type: 'contains',
                    command: 'docker save',
                    options: ['-o']
                }
            },
            {
                id: 28,
                title: '从文件加载镜像',
                description: '使用docker load从tar文件加载镜像',
                goal: '从tar文件导入镜像',
                hint: 'docker load -i 文件名',
                expectedCommand: 'docker load -i nginx.tar',
                validation: {
                    type: 'contains',
                    command: 'docker load',
                    options: ['-i']
                }
            },
            {
                id: 29,
                title: '导出容器',
                description: '使用docker export导出容器文件系统',
                goal: '将容器文件系统导出为tar文件',
                hint: 'docker export -o 文件名 容器ID',
                expectedCommand: 'docker export -o container.tar web01',
                validation: {
                    type: 'contains',
                    command: 'docker export',
                    options: ['-o']
                }
            },
            {
                id: 30,
                title: '构建镜像',
                description: '使用docker build从Dockerfile构建镜像',
                goal: '根据Dockerfile构建新镜像',
                hint: 'docker build -t 镜像名 .',
                expectedCommand: 'docker build -t myapp .',
                validation: {
                    type: 'contains',
                    command: 'docker build',
                    options: ['-t']
                }
            },
            {
                id: 31,
                title: '给镜像打标签',
                description: '使用docker tag给镜像打标签',
                goal: '为镜像添加新的标签',
                hint: 'docker tag 旧标签 新标签',
                expectedCommand: 'docker tag nginx myregistry/nginx:v1',
                validation: {
                    type: 'contains',
                    command: 'docker tag',
                    args: ['nginx', 'myregistry/nginx:v1']
                }
            },
            {
                id: 32,
                title: '推送镜像',
                description: '使用docker push推送镜像到仓库',
                goal: '将镜像推送到Docker仓库',
                hint: 'docker push 镜像名',
                expectedCommand: 'docker push myregistry/nginx:v1',
                validation: {
                    type: 'contains',
                    command: 'docker push',
                    args: ['myregistry/nginx:v1']
                }
            },
            {
                id: 33,
                title: '清理无用镜像',
                description: '使用docker image prune清理未使用的镜像',
                goal: '删除所有未被容器使用的镜像',
                hint: 'docker image prune -a',
                expectedCommand: 'docker image prune -a',
                validation: {
                    type: 'contains',
                    command: 'docker image prune',
                    options: ['-a']
                }
            },
            {
                id: 34,
                title: '清理停止的容器',
                description: '使用docker container prune清理停止的容器',
                goal: '删除所有已停止的容器',
                hint: 'docker container prune',
                expectedCommand: 'docker container prune',
                validation: {
                    type: 'exact',
                    command: 'docker container prune'
                }
            },
            {
                id: 35,
                title: '查看Docker系统信息',
                description: '使用docker info查看Docker系统信息',
                goal: '显示Docker系统的详细信息',
                hint: 'docker info',
                expectedCommand: 'docker info',
                validation: {
                    type: 'exact',
                    command: 'docker info'
                }
            },
            {
                id: 36,
                title: '清理Docker系统',
                description: '使用docker system prune清理Docker系统',
                goal: '清理未使用的容器、网络、镜像等',
                hint: 'docker system prune -a',
                expectedCommand: 'docker system prune -a',
                validation: {
                    type: 'contains',
                    command: 'docker system prune',
                    options: ['-a']
                }
            }
        ]
    },
    {
        id: 9,
        name: 'Git版本控制',
        description: '学习Git版本控制系统的基本操作',
        commands: ['git'],
        tasks: [
            {
                id: 1,
                title: '查看Git版本',
                description: '使用git --version查看Git版本',
                goal: '显示当前安装的Git版本',
                hint: 'git --version',
                expectedCommand: 'git --version',
                validation: {
                    type: 'exact',
                    command: 'git --version'
                }
            },
            {
                id: 2,
                title: '配置用户名',
                description: '使用git config配置用户名',
                goal: '设置Git用户名',
                hint: 'git config --global user.name "Your Name"',
                expectedCommand: 'git config --global user.name "张三"',
                validation: {
                    type: 'contains',
                    command: 'git config',
                    options: ['--global'],
                    args: ['user.name']
                }
            },
            {
                id: 3,
                title: '配置邮箱',
                description: '使用git config配置邮箱',
                goal: '设置Git用户邮箱',
                hint: 'git config --global user.email "email@example.com"',
                expectedCommand: 'git config --global user.email "zhangsan@example.com"',
                validation: {
                    type: 'contains',
                    command: 'git config',
                    options: ['--global'],
                    args: ['user.email']
                }
            },
            {
                id: 4,
                title: '初始化仓库',
                description: '使用git init初始化Git仓库',
                goal: '在当前目录创建Git仓库',
                hint: 'git init',
                expectedCommand: 'git init',
                validation: {
                    type: 'exact',
                    command: 'git init'
                }
            },
            {
                id: 5,
                title: '克隆仓库',
                description: '使用git clone克隆远程仓库',
                goal: '从远程地址克隆仓库',
                hint: 'git clone 仓库地址',
                expectedCommand: 'git clone https://github.com/user/repo.git',
                validation: {
                    type: 'contains',
                    command: 'git clone'
                }
            },
            {
                id: 6,
                title: '查看状态',
                description: '使用git status查看仓库状态',
                goal: '查看工作区和暂存区状态',
                hint: 'git status',
                expectedCommand: 'git status',
                validation: {
                    type: 'exact',
                    command: 'git status'
                }
            },
            {
                id: 7,
                title: '添加文件到暂存区',
                description: '使用git add添加文件到暂存区',
                goal: '将文件添加到暂存区',
                hint: 'git add 文件名 或 git add .',
                expectedCommand: 'git add .',
                validation: {
                    type: 'contains',
                    command: 'git add'
                }
            },
            {
                id: 8,
                title: '提交更改',
                description: '使用git commit提交更改',
                goal: '将暂存区的更改提交到仓库',
                hint: 'git commit -m "提交信息"',
                expectedCommand: 'git commit -m "初始提交"',
                validation: {
                    type: 'contains',
                    command: 'git commit',
                    options: ['-m']
                }
            },
            {
                id: 9,
                title: '查看提交历史',
                description: '使用git log查看提交历史',
                goal: '查看仓库的提交记录',
                hint: 'git log',
                expectedCommand: 'git log',
                validation: {
                    type: 'exact',
                    command: 'git log'
                }
            },
            {
                id: 10,
                title: '查看差异',
                description: '使用git diff查看工作区差异',
                goal: '查看工作区和暂存区的差异',
                hint: 'git diff',
                expectedCommand: 'git diff',
                validation: {
                    type: 'exact',
                    command: 'git diff'
                }
            },
            {
                id: 11,
                title: '查看远程仓库',
                description: '使用git remote查看远程仓库',
                goal: '查看已配置的远程仓库',
                hint: 'git remote -v',
                expectedCommand: 'git remote -v',
                validation: {
                    type: 'contains',
                    command: 'git remote',
                    options: ['-v']
                }
            },
            {
                id: 12,
                title: '添加远程仓库',
                description: '使用git remote add添加远程仓库',
                goal: '添加一个新的远程仓库',
                hint: 'git remote add origin 仓库地址',
                expectedCommand: 'git remote add origin https://github.com/user/repo.git',
                validation: {
                    type: 'contains',
                    command: 'git remote add'
                }
            },
            {
                id: 13,
                title: '推送到远程',
                description: '使用git push推送到远程仓库',
                goal: '将本地提交推送到远程仓库',
                hint: 'git push origin master',
                expectedCommand: 'git push origin master',
                validation: {
                    type: 'contains',
                    command: 'git push'
                }
            },
            {
                id: 14,
                title: '拉取更新',
                description: '使用git pull拉取远程更新',
                goal: '从远程仓库拉取最新更改',
                hint: 'git pull origin master',
                expectedCommand: 'git pull origin master',
                validation: {
                    type: 'contains',
                    command: 'git pull'
                }
            },
            {
                id: 15,
                title: '创建分支',
                description: '使用git branch创建新分支',
                goal: '创建一个新分支',
                hint: 'git branch 分支名',
                expectedCommand: 'git branch feature',
                validation: {
                    type: 'contains',
                    command: 'git branch',
                    args: ['feature']
                }
            },
            {
                id: 16,
                title: '切换分支',
                description: '使用git checkout切换分支',
                goal: '切换到指定分支',
                hint: 'git checkout 分支名',
                expectedCommand: 'git checkout feature',
                validation: {
                    type: 'contains',
                    command: 'git checkout',
                    args: ['feature']
                }
            },
            {
                id: 17,
                title: '创建并切换分支',
                description: '使用git checkout -b创建并切换分支',
                goal: '创建新分支并立即切换',
                hint: 'git checkout -b 分支名',
                expectedCommand: 'git checkout -b feature',
                validation: {
                    type: 'contains',
                    command: 'git checkout',
                    options: ['-b']
                }
            },
            {
                id: 18,
                title: '查看所有分支',
                description: '使用git branch查看所有分支',
                goal: '列出所有本地分支',
                hint: 'git branch',
                expectedCommand: 'git branch',
                validation: {
                    type: 'exact',
                    command: 'git branch'
                }
            },
            {
                id: 19,
                title: '合并分支',
                description: '使用git merge合并分支',
                goal: '将指定分支合并到当前分支',
                hint: 'git merge 分支名',
                expectedCommand: 'git merge feature',
                validation: {
                    type: 'contains',
                    command: 'git merge',
                    args: ['feature']
                }
            },
            {
                id: 20,
                title: '删除分支',
                description: '使用git branch -d删除分支',
                goal: '删除已合并的分支',
                hint: 'git branch -d 分支名',
                expectedCommand: 'git branch -d feature',
                validation: {
                    type: 'contains',
                    command: 'git branch',
                    options: ['-d']
                }
            },
            {
                id: 21,
                title: '暂存工作区',
                description: '使用git stash暂存工作区更改',
                goal: '临时保存工作区的更改',
                hint: 'git stash',
                expectedCommand: 'git stash',
                validation: {
                    type: 'exact',
                    command: 'git stash'
                }
            },
            {
                id: 22,
                title: '恢复暂存',
                description: '使用git stash pop恢复暂存的更改',
                goal: '恢复之前暂存的更改',
                hint: 'git stash pop',
                expectedCommand: 'git stash pop',
                validation: {
                    type: 'exact',
                    command: 'git stash pop'
                }
            },
            {
                id: 23,
                title: '撤销工作区修改',
                description: '使用git checkout撤销工作区修改',
                goal: '撤销文件的修改',
                hint: 'git checkout -- 文件名',
                expectedCommand: 'git checkout -- test.txt',
                validation: {
                    type: 'contains',
                    command: 'git checkout',
                    args: ['--']
                }
            },
            {
                id: 24,
                title: '重置暂存区',
                description: '使用git reset重置暂存区',
                goal: '取消已暂存的文件',
                hint: 'git reset 文件名',
                expectedCommand: 'git reset test.txt',
                validation: {
                    type: 'contains',
                    command: 'git reset',
                    args: ['test.txt']
                }
            },
            {
                id: 25,
                title: '查看配置',
                description: '使用git config --list查看所有配置',
                goal: '显示所有Git配置',
                hint: 'git config --list',
                expectedCommand: 'git config --list',
                validation: {
                    type: 'exact',
                    command: 'git config --list'
                }
            }
        ]
    },
    {
        id: 10,
        name: 'Systemctl服务管理',
        description: '学习使用systemctl管理系统服务',
        commands: ['systemctl'],
        tasks: [
            {
                id: 1,
                title: '查看服务状态',
                description: '使用systemctl status查看服务状态',
                goal: '查看指定服务的运行状态',
                hint: 'systemctl status 服务名',
                expectedCommand: 'systemctl status nginx',
                validation: {
                    type: 'contains',
                    command: 'systemctl status',
                    args: ['nginx']
                }
            },
            {
                id: 2,
                title: '启动服务',
                description: '使用systemctl start启动服务',
                goal: '启动指定的系统服务',
                hint: 'systemctl start 服务名',
                expectedCommand: 'systemctl start nginx',
                validation: {
                    type: 'contains',
                    command: 'systemctl start',
                    args: ['nginx']
                }
            },
            {
                id: 3,
                title: '停止服务',
                description: '使用systemctl stop停止服务',
                goal: '停止运行中的服务',
                hint: 'systemctl stop 服务名',
                expectedCommand: 'systemctl stop nginx',
                validation: {
                    type: 'contains',
                    command: 'systemctl stop',
                    args: ['nginx']
                }
            },
            {
                id: 4,
                title: '重启服务',
                description: '使用systemctl restart重启服务',
                goal: '重新启动服务',
                hint: 'systemctl restart 服务名',
                expectedCommand: 'systemctl restart nginx',
                validation: {
                    type: 'contains',
                    command: 'systemctl restart',
                    args: ['nginx']
                }
            },
            {
                id: 5,
                title: '重载服务配置',
                description: '使用systemctl reload重载服务配置',
                goal: '重新加载服务配置而不中断服务',
                hint: 'systemctl reload 服务名',
                expectedCommand: 'systemctl reload nginx',
                validation: {
                    type: 'contains',
                    command: 'systemctl reload',
                    args: ['nginx']
                }
            },
            {
                id: 6,
                title: '启用开机自启',
                description: '使用systemctl enable设置开机自启',
                goal: '设置服务开机自动启动',
                hint: 'systemctl enable 服务名',
                expectedCommand: 'systemctl enable nginx',
                validation: {
                    type: 'contains',
                    command: 'systemctl enable',
                    args: ['nginx']
                }
            },
            {
                id: 7,
                title: '禁用开机自启',
                description: '使用systemctl disable禁用开机自启',
                goal: '取消服务的开机自动启动',
                hint: 'systemctl disable 服务名',
                expectedCommand: 'systemctl disable nginx',
                validation: {
                    type: 'contains',
                    command: 'systemctl disable',
                    args: ['nginx']
                }
            },
            {
                id: 8,
                title: '查看所有服务',
                description: '使用systemctl list-units查看所有服务',
                goal: '列出所有正在运行的服务',
                hint: 'systemctl list-units --type=service',
                expectedCommand: 'systemctl list-units --type=service',
                validation: {
                    type: 'contains',
                    command: 'systemctl list-units',
                    options: ['--type=service']
                }
            },
            {
                id: 9,
                title: '查看服务是否启用',
                description: '使用systemctl is-enabled查看服务是否开机自启',
                goal: '检查服务是否设置为开机自启',
                hint: 'systemctl is-enabled 服务名',
                expectedCommand: 'systemctl is-enabled nginx',
                validation: {
                    type: 'contains',
                    command: 'systemctl is-enabled',
                    args: ['nginx']
                }
            },
            {
                id: 10,
                title: '查看服务是否运行',
                description: '使用systemctl is-active查看服务是否运行',
                goal: '检查服务当前是否正在运行',
                hint: 'systemctl is-active 服务名',
                expectedCommand: 'systemctl is-active nginx',
                validation: {
                    type: 'contains',
                    command: 'systemctl is-active',
                    args: ['nginx']
                }
            },
            {
                id: 11,
                title: '查看服务日志',
                description: '使用journalctl查看服务日志',
                goal: '查看指定服务的日志',
                hint: 'journalctl -u 服务名',
                expectedCommand: 'journalctl -u nginx',
                validation: {
                    type: 'contains',
                    command: 'journalctl',
                    options: ['-u']
                }
            },
            {
                id: 12,
                title: '实时查看日志',
                description: '使用journalctl -f实时查看日志',
                goal: '实时跟踪系统日志',
                hint: 'journalctl -f',
                expectedCommand: 'journalctl -f',
                validation: {
                    type: 'exact',
                    command: 'journalctl -f'
                }
            },
            {
                id: 13,
                title: '重载systemd配置',
                description: '使用systemctl daemon-reload重载配置',
                goal: '重新加载systemd管理器配置',
                hint: 'systemctl daemon-reload',
                expectedCommand: 'systemctl daemon-reload',
                validation: {
                    type: 'exact',
                    command: 'systemctl daemon-reload'
                }
            },
            {
                id: 14,
                title: '查看失败的服务',
                description: '使用systemctl查看失败的服务',
                goal: '列出所有启动失败的服务',
                hint: 'systemctl --failed',
                expectedCommand: 'systemctl --failed',
                validation: {
                    type: 'exact',
                    command: 'systemctl --failed'
                }
            },
            {
                id: 15,
                title: '查看服务文件',
                description: '使用systemctl cat查看服务配置文件',
                goal: '显示服务的配置文件内容',
                hint: 'systemctl cat 服务名',
                expectedCommand: 'systemctl cat nginx',
                validation: {
                    type: 'contains',
                    command: 'systemctl cat',
                    args: ['nginx']
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
    },
    {
        id: 5,
        name: '配置文件编辑',
        description: '作为开发人员，你需要使用Vim编辑配置文件',
        story: '项目需要修改配置文件，作为开发人员，你需要使用Vim编辑器快速修改配置。',
        requiredLevels: [7],
        tasks: [
            {
                id: 1,
                title: '打开配置文件',
                description: '使用vim打开config.conf文件',
                goal: '用Vim打开config.conf文件',
                hint: 'vim 文件名',
                expectedCommand: 'vim config.conf',
                validation: {
                    type: 'contains',
                    command: 'vim',
                    args: ['config.conf']
                }
            },
            {
                id: 2,
                title: '进入插入模式',
                description: '按i键进入插入模式准备编辑',
                goal: '进入插入模式',
                hint: '按i键',
                expectedCommand: 'i',
                validation: {
                    type: 'exact',
                    command: 'i'
                }
            },
            {
                id: 3,
                title: '保存修改',
                description: '按ESC退出插入模式，然后输入:w保存文件',
                goal: '保存文件修改',
                hint: '先按ESC，再输入:w',
                expectedCommand: ':w',
                validation: {
                    type: 'exact',
                    command: ':w'
                }
            },
            {
                id: 4,
                title: '退出编辑器',
                description: '输入:q退出Vim编辑器',
                goal: '退出Vim',
                hint: '输入:q退出',
                expectedCommand: ':q',
                validation: {
                    type: 'exact',
                    command: ':q'
                }
            }
        ]
    },
    {
        id: 6,
        name: '容器化部署',
        description: '作为DevOps工程师，你需要使用Docker部署应用',
        story: '公司需要将应用容器化部署，作为DevOps工程师，你需要使用Docker完成部署任务。',
        requiredLevels: [8],
        tasks: [
            {
                id: 1,
                title: '检查Docker环境',
                description: '查看Docker版本确认环境正常',
                goal: '验证Docker已正确安装',
                hint: '使用docker --version',
                expectedCommand: 'docker --version',
                validation: {
                    type: 'exact',
                    command: 'docker --version'
                }
            },
            {
                id: 2,
                title: '查看可用镜像',
                description: '列出本地所有Docker镜像',
                goal: '查看本地镜像列表',
                hint: '使用docker images',
                expectedCommand: 'docker images',
                validation: {
                    type: 'exact',
                    command: 'docker images'
                }
            },
            {
                id: 3,
                title: '拉取应用镜像',
                description: '从Docker Hub拉取nginx镜像',
                goal: '下载nginx镜像',
                hint: '使用docker pull nginx',
                expectedCommand: 'docker pull nginx',
                validation: {
                    type: 'contains',
                    command: 'docker pull',
                    args: ['nginx']
                }
            },
            {
                id: 4,
                title: '运行应用容器',
                description: '运行nginx容器并映射端口8080:80',
                goal: '启动nginx容器',
                hint: 'docker run -d -p 8080:80 nginx',
                expectedCommand: 'docker run -d -p 8080:80 nginx',
                validation: {
                    type: 'contains',
                    command: 'docker run',
                    options: ['-d', '-p']
                }
            },
            {
                id: 5,
                title: '检查容器状态',
                description: '查看正在运行的容器',
                goal: '确认容器正常运行',
                hint: '使用docker ps',
                expectedCommand: 'docker ps',
                validation: {
                    type: 'exact',
                    command: 'docker ps'
                }
            },
            {
                id: 6,
                title: '停止容器',
                description: '停止nginx容器（容器ID为web01）',
                goal: '停止运行中的容器',
                hint: '使用docker stop web01',
                expectedCommand: 'docker stop web01',
                validation: {
                    type: 'contains',
                    command: 'docker stop',
                    args: ['web01']
                }
            }
        ]
    },
    {
        id: 7,
        name: 'Git项目协作',
        description: '作为开发人员，你需要使用Git进行项目协作',
        story: '团队正在开发一个新项目，你需要使用Git进行代码管理和团队协作。',
        requiredLevels: [9],
        tasks: [
            {
                id: 1,
                title: '配置Git用户',
                description: '设置Git用户名和邮箱',
                goal: '配置Git用户信息',
                hint: '使用git config配置',
                expectedCommand: 'git config --global user.name "开发者"',
                validation: {
                    type: 'contains',
                    command: 'git config',
                    options: ['--global']
                }
            },
            {
                id: 2,
                title: '初始化项目',
                description: '初始化Git仓库',
                goal: '创建Git仓库',
                hint: '使用git init',
                expectedCommand: 'git init',
                validation: {
                    type: 'exact',
                    command: 'git init'
                }
            },
            {
                id: 3,
                title: '查看状态',
                description: '查看工作区状态',
                goal: '检查文件状态',
                hint: '使用git status',
                expectedCommand: 'git status',
                validation: {
                    type: 'exact',
                    command: 'git status'
                }
            },
            {
                id: 4,
                title: '添加文件',
                description: '将所有文件添加到暂存区',
                goal: '暂存所有更改',
                hint: '使用git add .',
                expectedCommand: 'git add .',
                validation: {
                    type: 'contains',
                    command: 'git add'
                }
            },
            {
                id: 5,
                title: '提交更改',
                description: '提交暂存的更改',
                goal: '创建提交',
                hint: '使用git commit -m',
                expectedCommand: 'git commit -m "初始提交"',
                validation: {
                    type: 'contains',
                    command: 'git commit',
                    options: ['-m']
                }
            },
            {
                id: 6,
                title: '创建分支',
                description: '创建并切换到新分支feature',
                goal: '创建功能分支',
                hint: '使用git checkout -b',
                expectedCommand: 'git checkout -b feature',
                validation: {
                    type: 'contains',
                    command: 'git checkout',
                    options: ['-b']
                }
            },
            {
                id: 7,
                title: '查看分支',
                description: '查看所有分支',
                goal: '列出所有分支',
                hint: '使用git branch',
                expectedCommand: 'git branch',
                validation: {
                    type: 'exact',
                    command: 'git branch'
                }
            },
            {
                id: 8,
                title: '切换回主分支',
                description: '切换回master分支',
                goal: '切换到主分支',
                hint: '使用git checkout master',
                expectedCommand: 'git checkout master',
                validation: {
                    type: 'contains',
                    command: 'git checkout',
                    args: ['master']
                }
            },
            {
                id: 9,
                title: '合并分支',
                description: '合并feature分支到master',
                goal: '合并功能分支',
                hint: '使用git merge',
                expectedCommand: 'git merge feature',
                validation: {
                    type: 'contains',
                    command: 'git merge',
                    args: ['feature']
                }
            },
            {
                id: 10,
                title: '查看历史',
                description: '查看提交历史',
                goal: '查看提交记录',
                hint: '使用git log',
                expectedCommand: 'git log',
                validation: {
                    type: 'exact',
                    command: 'git log'
                }
            }
        ]
    },
    {
        id: 8,
        name: '服务管理维护',
        description: '作为系统管理员，你需要管理服务器服务',
        story: '服务器上的服务需要管理和维护，作为系统管理员，你需要确保服务正常运行。',
        requiredLevels: [10],
        tasks: [
            {
                id: 1,
                title: '检查服务状态',
                description: '查看nginx服务状态',
                goal: '检查服务是否正常运行',
                hint: '使用systemctl status',
                expectedCommand: 'systemctl status nginx',
                validation: {
                    type: 'contains',
                    command: 'systemctl status',
                    args: ['nginx']
                }
            },
            {
                id: 2,
                title: '启动服务',
                description: '启动nginx服务',
                goal: '启动服务',
                hint: '使用systemctl start',
                expectedCommand: 'systemctl start nginx',
                validation: {
                    type: 'contains',
                    command: 'systemctl start',
                    args: ['nginx']
                }
            },
            {
                id: 3,
                title: '设置开机自启',
                description: '设置nginx开机自动启动',
                goal: '配置开机自启',
                hint: '使用systemctl enable',
                expectedCommand: 'systemctl enable nginx',
                validation: {
                    type: 'contains',
                    command: 'systemctl enable',
                    args: ['nginx']
                }
            },
            {
                id: 4,
                title: '查看所有服务',
                description: '列出所有运行中的服务',
                goal: '查看系统服务',
                hint: '使用systemctl list-units',
                expectedCommand: 'systemctl list-units --type=service',
                validation: {
                    type: 'contains',
                    command: 'systemctl list-units',
                    options: ['--type=service']
                }
            },
            {
                id: 5,
                title: '重启服务',
                description: '重启nginx服务',
                goal: '重新启动服务',
                hint: '使用systemctl restart',
                expectedCommand: 'systemctl restart nginx',
                validation: {
                    type: 'contains',
                    command: 'systemctl restart',
                    args: ['nginx']
                }
            },
            {
                id: 6,
                title: '查看服务日志',
                description: '查看nginx服务日志',
                goal: '检查服务日志',
                hint: '使用journalctl -u',
                expectedCommand: 'journalctl -u nginx',
                validation: {
                    type: 'contains',
                    command: 'journalctl',
                    options: ['-u']
                }
            },
            {
                id: 7,
                title: '停止服务',
                description: '停止nginx服务',
                goal: '停止运行的服务',
                hint: '使用systemctl stop',
                expectedCommand: 'systemctl stop nginx',
                validation: {
                    type: 'contains',
                    command: 'systemctl stop',
                    args: ['nginx']
                }
            },
            {
                id: 8,
                title: '检查失败服务',
                description: '查看所有启动失败的服务',
                goal: '排查服务问题',
                hint: '使用systemctl --failed',
                expectedCommand: 'systemctl --failed',
                validation: {
                    type: 'exact',
                    command: 'systemctl --failed'
                }
            }
        ]
    }
];

window.tutorialLevels = tutorialLevels;
window.practiceScenarios = practiceScenarios;
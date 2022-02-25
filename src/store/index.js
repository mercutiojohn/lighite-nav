import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        todoList: [{
                text: '在上面输入待办事项',
                createdAt: '',
                doneAt: '',
                checked: false
            },
            {
                text: '轻敲回车以添加',
                createdAt: '',
                doneAt: '',
                checked: true
            },
            {
                text: '点击对勾可以划掉此条',
                createdAt: '',
                doneAt: '',
                checked: false
            },
            {
                text: '点击垃圾桶可以删除此条',
                createdAt: '',
                doneAt: '',
                checked: false
            }
        ],
        settings: {
            twelveFormat: true,
            showSeconds: false
        },
        tokens: {
            biliblli: '',
            netease: ''
        },
        navs: {
            favorites: [{
                    "title": "空投AirPortal",
                    "color": "#ffffff",
                    "icon": "airportal.svg",
                    "url": "https://airportal.cn/"
                },
                {
                    "title": "LeetCode笔记",
                    "color": "#ffffff",
                    "icon": "leetcode.svg",
                    "url": "https://leetcode-cn.com/notes/"
                },
                {
                    "title": "牛客网",
                    "color": "#ffffff",
                    "icon": "airportal.svg",
                    "url": "https://www.nowcoder.com/"
                },
                {
                    "title": "实习僧",
                    "color": "#000000",
                    "icon": "markdown.svg",
                    "url": "https://resume.shixiseng.com/my/delivered"
                },
                // {
                //     "title": "牛客春招",
                //     "color": "#000000",
                //     "icon": "markdown.svg",
                //     "url": "https://mnowpick.nowcoder.com/m/school/schedule"
                // },
                {
                    "title": "牛客春招-Web",
                    "color": "#000000",
                    "icon": "markdown.svg",
                    "url": "https://nowpick.nowcoder.com/w/school/schedule"
                }
            ],
            others: [{
                    "title": "在线文档",
                    "list": [{
                            "title": "石墨文档",
                            "color": "#ffffff",
                            "icon": "shimo.svg",
                            "url": "https://shimo.im/desktop"
                        },
                        {
                            "title": "语雀",
                            "color": "#ffffff",
                            "icon": "yuque.svg",
                            "url": "https://www.yuque.com/dashboard"
                        },
                        {
                            "title": "幕布",
                            "color": "#ffffff",
                            "icon": "mubu.svg",
                            "url": "https://mubu.com/app"
                        },
                        {
                            "title": "Notion",
                            "color": "#ffffff",
                            "icon": "notion.svg",
                            "url": "https://www.notion.so/"
                        },
                        {
                            "title": "金山文档",
                            "color": "#ffffff",
                            "icon": "kdocs.svg",
                            "url": "https://www.kdocs.cn/?show=all"
                        },
                        {
                            "title": "腾讯文档",
                            "color": "#ffffff",
                            "icon": "txdoc.svg",
                            "url": "https://docs.qq.com/desktop/"
                        },
                        {
                            "title": "我来wolai",
                            "color": "#ffffff",
                            "icon": "wolai.svg",
                            "url": "https://wolai.com/"
                        },
                        {
                            "title": "有道云笔记",
                            "color": "#ffffff",
                            "icon": "ydnote.svg",
                            "url": "https://note.youdao.com/web/"
                        }
                    ]
                }, {
                    "title": "实用工具",
                    "list": [{
                            "title": "空投AirPortal",
                            "color": "#ffffff",
                            "icon": "airportal.svg",
                            "url": "https://airportal.cn/"
                        },
                        {
                            "title": "LeetCode笔记",
                            "color": "#ffffff",
                            "icon": "ityxb.svg",
                            "url": "https://leetcode-cn.com/notes/"
                        },
                        {
                            "title": "WolframAlpha",
                            "color": "#ffffff",
                            "icon": "airportal.svg",
                            "url": "https://www.wolframalpha.com/"
                        },
                        {
                            "title": "Markdown转公众号",
                            "color": "#000000",
                            "icon": "markdown.svg",
                            "url": "https://md.qikqiak.com/"
                        }
                    ]
                },
                {
                    "title": "读书",
                    "list": [{
                        "title": "微信读书",
                        "color": "#ffffff",
                        "icon": "weread.svg",
                        "url": "https://weread.qq.com/web/shelf"
                    }, {
                        "title": "掘金小册",
                        "color": "#ffffff",
                        "icon": "weread.svg",
                        "url": "https://juejin.cn/my-course"
                    }]
                },
                {
                    "title": "视频",
                    "list": [{
                            "title": "哔哩哔哩·追番",
                            "color": "#ffffff",
                            "icon": "weread.svg",
                            "url": "https://weread.qq.com/web/shelf"
                        },
                        {
                            "title": "哔哩哔哩·收藏",
                            "color": "#ffffff",
                            "icon": "weread.svg",
                            "url": "https: //weread.qq.com/web/shelf"
                        },
                        {
                            "title": "哔哩哔哩·排行榜",
                            "color": "#ffffff",
                            "icon": "weread.svg",
                            "url": "https://weread.qq.com/web/shelf"
                        }
                    ]
                },
                {
                    "title": "音乐",
                    "list": [{
                        "title": "网易云音乐",
                        "color": "#dd001b",
                        "icon": "weread.svg",
                        "url": "https://weread.qq.com/web/shelf"
                    }]
                },
                {
                    "title": "社交",
                    "list": [{
                            "title": "Discord",
                            "color": "#5865f2",
                            "icon": "discord.svg",
                            "url": "https://discord.com/app"
                        },
                        {
                            "title": "钉钉",
                            "color": "#3293f7",
                            "icon": "dingding.svg",
                            "url": "https://im.dingtalk.com"
                        },
                        {
                            "title": "微博",
                            "color": "#ffffff",
                            "icon": "weibo.svg",
                            "url": "https://www.weibo.com/"
                        },
                        {
                            "title": "微信",
                            "color": "#ffffff",
                            "icon": "weread.svg",
                            "url": "https://wx.qq.com/"
                        }
                    ]
                },
                {
                    "title": "论文期刊",
                    "list": [{
                            "title": "Sci-Hub",
                            "color": "#ffffff",
                            "icon": "scihub.png",
                            "url": "https://www.sci-hub.ren/"
                        },
                        {
                            "title": "Web of Science",
                            "color": "#ffffff",
                            "icon": "wos.svg",
                            "url": "http://apps.webofknowledge.com/WOS_GeneralSearch_input.do"
                        },
                        {
                            "title": "Web of Science Beta",
                            "color": "#000000",
                            "icon": "wosnew.svg",
                            "url": "https://www.webofscience.com/wos/woscc/basic-search"
                        },
                        {
                            "title": "中国知网",
                            "color": "#1b66e6",
                            "icon": "cnki.svg",
                            "url": "https://www.cnki.net/"
                        },
                        {
                            "title": "万方知识平台",
                            "color": "#ffffff",
                            "icon": "wanfang.svg",
                            "url": "https://www.wanfangdata.com.cn/index.html"
                        },
                        {
                            "title": "知网研学",
                            "color": "#ffffff",
                            "icon": "cnki-learn.png",
                            "url": "https://x.cnki.net/psmc#/MyStudy"
                        }
                    ]
                },
                {
                    "title": "新媒体设计",
                    "list": [{
                            "title": "稿定设计",
                            "color": "#ffffff",
                            "icon": "gaoding.svg",
                            "url": "https://www.gaoding.com/dam/my-space/"
                        },
                        {
                            "title": "秀米",
                            "color": "#fd8b72",
                            "icon": "xiumi.png",
                            "url": "https://xiumi.us/studio/v5#/paper/for/new/cube/0"
                        },
                        {
                            "title": "创客贴",
                            "color": "#005ffe",
                            "icon": "ckt.svg",
                            "url": "https://www.chuangkit.com/designtools/startdesign"
                        },
                        {
                            "title": "MAKA",
                            "color": "#ffffff",
                            "icon": "maka.png",
                            "url": "https://www.maka.im/workspace/works"
                        },
                        {
                            "title": "图怪兽",
                            "color": "#f43a6d",
                            "icon": "818ps.png",
                            "url": "https://818ps.com/imageeditor.html"
                        },
                        {
                            "title": "135编辑器",
                            "color": "#ffffff",
                            "icon": "135.png",
                            "url": "https://www.135editor.com/"
                        }
                    ]
                }, {
                    "title": "在线表单",
                    "list": [{
                            "title": "麦客表单",
                            "color": "#1e3035",
                            "icon": "mikecrm.png",
                            "url": "https://www.mikecrm.com/form.php"
                        },
                        {
                            "title": "金数据",
                            "color": "#1e3035",
                            "icon": "mikecrm.png",
                            "url": "https://www.mikecrm.com/form.php"
                        },
                        {
                            "title": "腾讯文档表单",
                            "color": "#1e3035",
                            "icon": "mikecrm.png",
                            "url": "https://www.mikecrm.com/form.php"
                        }
                    ]
                },
                {
                    "title": "开发平台",
                    "list": [{
                            "title": "腾讯云",
                            "color": "#ffffff",
                            "icon": "txy.svg",
                            "url": "https://console.cloud.tencent.com/"
                        },
                        {
                            "title": "华为云",
                            "color": "#f83a43",
                            "icon": "huawei.svg",
                            "url": "https://console.huaweicloud.com/ecm/"
                        },
                        {
                            "title": "阿里云",
                            "color": "#ffffff",
                            "icon": "aliyun.svg",
                            "url": "https://homenew.console.aliyun.com/home/dashboard/Operation"
                        },
                        {
                            "title": "亚马逊云服务",
                            "color": "#232f3e",
                            "icon": "aws.svg",
                            "url": "https://console.aws.amazon.com/"
                        }
                    ]
                },
                {
                    "title": "代码托管/协同编程",
                    "list": [{
                            "title": "GitHub",
                            "color": "#24292e",
                            "icon": "github.svg",
                            "url": "https://github.com/"
                        },
                        {
                            "title": "gitee",
                            "color": "#ffffff",
                            "icon": "gitee.svg",
                            "url": "https://gitee.com"
                        },
                        {
                            "title": "CODING",
                            "color": "#ffffff",
                            "icon": "coding.png",
                            "url": "https://e.coding.net/login"
                        },
                        {
                            "title": "GitLab",
                            "color": "#ffffff",
                            "icon": "gitlab.svg",
                            "url": "https://gitlab.com/"
                        }
                    ]
                }, {
                    "title": "设计",
                    "list": [{
                            "title": "Dribbble",
                            "color": "#24292e",
                            "icon": "github.svg",
                            "url": "https://github.com/"
                        },
                        {
                            "title": "站酷",
                            "color": "#ffffff",
                            "icon": "gitee.svg",
                            "url": "https://gitee.com"
                        },
                        {
                            "title": "UI中国",
                            "color": "#ffffff",
                            "icon": "coding.png",
                            "url": "https://e.coding.net/login"
                        },
                        {
                            "title": "原创馆",
                            "color": "#ffffff",
                            "icon": "gitlab.svg",
                            "url": "https://gitlab.com/"
                        }
                    ]
                },
                {
                    "title": "考研",
                    "list": [{
                            "title": "百度网盘",
                            "color": "#ffffff",
                            "icon": "baidunetdisk.svg",
                            "url": "https://pan.baidu.com/disk/main#/index"
                        },
                        {
                            "title": "哔哩哔哩",
                            "color": "#00a1d6",
                            "icon": "bilibili.svg",
                            "url": "https://www.bilibili.com/"
                        },
                        {
                            "title": "慕课考研",
                            "color": "#ffffff",
                            "icon": "mooc.svg",
                            "url": "https://www.icourse163.org/home.htm"
                        },
                        {
                            "title": "网易云课堂",
                            "color": "#fc1e1e",
                            "icon": "nestudy.svg",
                            "url": "https://study.163.com/my#/jpk"
                        },
                        {
                            "title": "腾讯课堂",
                            "color": "#ffffff",
                            "icon": "txstudy.png",
                            "url": "https://ke.qq.com/user/index/index.html#/plan/"
                        },
                        {
                            "title": "新东方在线",
                            "color": "#ffffff",
                            "icon": "xdf.png",
                            "url": "https://study.koolearn.com/my"
                        },
                        {
                            "title": "爱启航",
                            "color": "#ff6c02",
                            "icon": "iqihang.svg",
                            "url": "https://www.iqihang.com/vipIindex/vipMain?tabName=first"
                        },
                        {
                            "title": "新文道",
                            "color": "#e60012",
                            "icon": "xwd.svg",
                            "url": "https://www.xinwendao.cn/member/study"
                        },
                        {
                            "title": "粉笔",
                            "color": "#3c7cfc",
                            "icon": "fenbi.svg",
                            "url": "https://www.fenbi.com/spa/pwa/mycourse/index"
                        },
                        {
                            "title": "橙啦",
                            "color": "#ffffff",
                            "icon": "orangevip.png",
                            "url": "https://www.orangevip.com/userCenter/myCourse"
                        },
                        {
                            "title": "一笑而过",
                            "color": "#ffffff",
                            "icon": "alpass.png",
                            "url": "https://pc.xiaoguo101.com/my/course"
                        },
                        {
                            "title": "CCTalk",
                            "color": "#ffffff",
                            "icon": "alpass.png",
                            "url": "https://pc.xiaoguo101.com/my/course"
                        }
                    ]
                }, {
                    "title": "网课平台",
                    "list": [{
                            "title": "中国大学MOOC",
                            "color": "#ffffff",
                            "icon": "mooc.svg",
                            "url": "https://www.icourse163.org/home.htm"
                        }, {
                            "title": "学堂在线",
                            "icon": "xuetang.png",
                            "color": "#ffffff",
                            "url": "https://next.xuetangx.com/my-courses/current"
                        },
                        {
                            "title": "智慧树",
                            "icon": "zhihuishu.png",
                            "color": "#ffffff",
                            "url": "https://onlineh5.zhihuishu.com/onlineWeb.html#/studentIndex"
                        },
                        {
                            "title": "CCTalk",
                            "color": "#ffffff",
                            "icon": "alpass.png",
                            "url": "https://pc.xiaoguo101.com/my/course"
                        },
                        {
                            "title": "Coursera",
                            "color": "#2a73cc",
                            "icon": "coursera.svg",
                            "url": "https://www.coursera.org/in-progress"
                        }
                    ]
                },
                {
                    "title": "Coding",
                    "list": [{
                            "title": "菜鸟教程",
                            "color": "#ffffff",
                            "icon": "runoob.svg",
                            "url": "http://runooob.com/"
                        }, {
                            "title": "菜鸟教程",
                            "color": "#ffffff",
                            "icon": "ityxb.svg",
                            "url": "http://stu.ityxb.com/Classroom/course/learning"
                        }, {
                            "title": "传智播客",
                            "color": "#ffffff",
                            "icon": "ityxb.svg",
                            "url": "http://stu.ityxb.com/Classroom/course/learning"
                        }, {
                            "title": "FreeCodeCamp",
                            "color": "#ffffff",
                            "icon": "ityxb.svg",
                            "url": "https://chinese.freecodecamp.org/learn"
                        },
                        {
                            "title": "LeetBook书架",
                            "color": "#ffffff",
                            "icon": "ityxb.svg",
                            "url": "https://leetcode-cn.com/leetbook/library/"
                        }, {
                            "title": "LeetCode学习计划",
                            "color": "#ffffff",
                            "icon": "ityxb.svg",
                            "url": "https://leetcode-cn.com/study-plan/"
                        }, {
                            "title": "LeetCode题库",
                            "color": "#ffffff",
                            "icon": "ityxb.svg",
                            "url": "https://leetcode-cn.com/problemset/"
                        }, {
                            "title": "USFCA算法演示",
                            "color": "#ffffff",
                            "icon": "ityxb.svg",
                            "url": "https://www.cs.usfca.edu/~galles/visualization/Algorithms.html"
                        }, {
                            "title": "Visualgo算法可视化",
                            "color": "#ffffff",
                            "icon": "ityxb.svg",
                            "url": "https://visualgo.net/zh"
                        }, {
                            "title": "算法可视化",
                            "color": "#ffffff",
                            "icon": "ityxb.svg",
                            "url": "https://algorithm-visualizer.org/"
                        }, {
                            "title": "regexper正则可视化",
                            "color": "#ffffff",
                            "icon": "ityxb.svg",
                            "url": "https://regexper.com/"
                        }, {
                            "title": "regulex正则可视化",
                            "color": "#ffffff",
                            "icon": "ityxb.svg",
                            "url": "https://jex.im/regulex/"
                        }
                    ]
                }, {
                    "title": "网盘",
                    "list": [{
                            "title": "夸克网盘",
                            "color": "#ffffff",
                            "icon": "quarkpan.svg",
                            "url": "https://pan.quark.cn/"
                        }, {
                            "title": "百度网盘",
                            "color": "#ffffff",
                            "icon": "baidupan.svg",
                            "url": "https://pan.baidu.com/"
                        }, {
                            "title": "阿里云盘",
                            "color": "#ffffff",
                            "icon": "alipan.svg",
                            "url": "https://aliyundrive.com/"
                        },
                        {
                            "title": "坚果云",
                            "color": "#ffffff",
                            "icon": "jianguoyun.svg",
                            "url": "https://www.jianguoyun.com/"
                        },
                        {
                            "title": "天翼云",
                            "color": "#ffffff",
                            "icon": "alipan.svg",
                            "url": "https://139.com/"
                        }
                    ]
                }

            ]
        }
    },
    mutations: {
        update(state, [key, value]) {
            state[key] = value;
            // console.log(key)
        },
        setTodoList(state, todoList) {
            localStorage.setItem('todoList', encodeURIComponent(JSON.stringify(todoList)));
            state.todoList = todoList;
        },
        setSettings(state, settings) {
            localStorage.setItem('settings', encodeURIComponent(JSON.stringify(settings)));
            state.settings = settings;
        },
        setNavs(state, settings) {
            localStorage.setItem('navs', encodeURIComponent(JSON.stringify(navs)));
            state.navs = navs;
        }
    },
    actions: {},
    modules: {},
    getters: {
        getTodoList: (state) => {
            if (localStorage.getItem("todoList")) {
                state.todoList = JSON.parse(decodeURIComponent(localStorage.getItem('todoList')));
            }
            return state.todoList;
        },
        getNavs: (state) => {
            if (localStorage.getItem("navs")) {
                state.navs = JSON.parse(decodeURIComponent(localStorage.getItem('navs')));
            }
            return state.navs;
        },
        getSettings: (state) => {
            if (localStorage.getItem("settings")) {
                state.todoList = JSON.parse(decodeURIComponent(localStorage.getItem('settings')));
            }
            return state.settings;
        }
    }
})
# Lightie · 轻主页

- 一个次世代主页；
- 你的主页，工具箱，和影音网址收藏馆。



<!-- ## 体验版
https://lightie.mercutio.club -->

## GitHub Pages
https://mercutiojohn.github.io/lighite-nav/#/

## vercel
https://lighite-nav.vercel.app/#/

## 实现功能:

- [x] 日期/时间
- [x] 待办清单
  - [x] Vuex+localStorage持久化
  - [x] 拖动排序
- [x] 导航链接收藏
- [x] 小工具
  - [x] base64
  - [x] urlencode-decode
- [x] 全局设置
  - [x] 时间设置
  - [x] 壁纸设置
- [ ] 大日历
- [x] 搜索引擎
  - [ ] 自由定制
- [x] 壁纸
  - [x] 壁纸自定义
  - [x] 模糊效果单独开关
- [x] 大时间
- [ ] 大天气
- [ ] 大待办
- [ ] Markdown笔记
- [ ] 在线音乐
  - [ ] 专辑墙
    - [ ] 截图分享
- [ ] 书架收藏
  - [ ] 自动获取微信读书信息
- [ ] 视频收藏
  - [ ] B站收藏夹导入
  - [ ] b站直播提醒
  - [ ] b站关注更新
- [ ] 云同步
- [x] 自定义首页模块
- [ ] Chrome插件
- [ ] Electron本地版本
## 杂项
- [x] 字体优化
- [x] 提取通用CSS方法
- [ ] 差异化字体
- [x] 天气优化
- [x] 动画归类
## 安装依赖
```
yarn install
```

### 为开发版本编译并开启热修复服务器
```
yarn serve
```

### 为上线版本编译
```
yarn build
```

### 语法检查
```
yarn lint
```

### 自定义Config
可以参照 [Configuration Reference](https://cli.vuejs.org/config/).

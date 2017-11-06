# 简介
参考[todomvc官网](http://todomvc.com/)，利用vue和react分别实现ToDoList功能。</br>
工作后第一个项目用vue完全搭建：[在线选房源码地址](https://gitee.com/HangZhouFangLv/choose-online-webAdmin)【代码托管在码云平台上，内部开源项目】


## Vue.js
[慕课网-Vue.js入门基础](http://www.imooc.com/learn/694)，[慕课网-Vue.js入门基础](http://www.imooc.com/learn/694)，[Vue.js菜鸟教程](http://www.runoob.com/vue2/vue-tutorial.html)。<br>
[官方文档-Vue地址](https://cn.vuejs.org/v2/guide/installation.html)、[官方文档-VueRouter地址](https://router.vuejs.org/zh-cn/)、[官方文档-Vuex地址](https://vuex.vuejs.org/zh-cn/)。

### vue-cli项目初始化
``` bash
# initial directory
vue init webpack my-project

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```


## React.js
[React.js菜鸟教程](http://www.runoob.com/react/react-tutorial.html)，[阮一峰-React 入门实例教程](http://www.ruanyifeng.com/blog/2015/03/react.html)，[陈学家-精益React学习指南](https://zhuanlan.zhihu.com/p/21107252)，[阮一峰-Babel 入门教程](http://www.ruanyifeng.com/blog/2016/01/babel.html)。<br>
[官方文档-React地址](https://reactjs.org/docs/hello-world.html)，[官方文档-ReactRouter地址](https://reacttraining.com/react-router/web/guides/philosophy)，[官方文档-ReactRedux地址](http://redux.js.org/)。

### webpack配置react项目
``` bash
# ES6->ES5
yarn  add  babel-core babel-preset-es2015  babel-preset-stage-3 --dev

# JSX&React
yarn  add  babel-loader babel-preset-react --dev

# style-loader&css-loader&less-loader&postcss-loader&autoprefixer
yarn  add  style-loader css-loader less less-loader postcss-loader autoprefixer --dev

# webpack&webpack-dev-server&react-hot-loader
yarn  add  webpack webpack-dev-server react-hot-loader --dev

# react&eact-router-dom&redux&react-redux
yarn  add  webpack webpack-dev-server react-hot-loader --dev

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

### 引入React-Redex：从Redux Store中获取数据渲染到React组件中。
- createStore初始化不可变应用状态Redux Store；
- Provider将Redux Store与Component连接；
- connect将Redux Store状态与Component的Props属性值关联；
- 添加actionCreators，子组件可以接收传递的函数；actionCreators指定type，去调用reducer函数，相当于store.dispatch(actionCreators[xxx](state))。
- 通过dispatch改变Redux Store状态；将不可变数据作为输入，完成无状态组件的渲染。

### webpack配置Eslint in Sublime：
- 安装全局eslint：cnpm install -g eslint
- 项目安装npm插件：yarn add eslint-config-rallycoding  --dev
- sublime安装插件：SublimeLinter+SublimeLinter-contrib-eslint
- 项目新建.eslintrc配置文件：{"extends": "rallycoding"}

### webpack配置CSS预加载、模块化等技术实现【just test】
- style-loader
- css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5
- less-loader
- sass-loader
- postcss-loader+autoprefixer


## Angular.js学习篇
[慕课网-AngularJS实战](http://www.imooc.com/learn/156)，[Angular.js菜鸟教程](http://www.runoob.com/angularjs/angularjs-tutorial.html)



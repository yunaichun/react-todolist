# 简介
利用vue[vue-cli工具构建]和react[webpack配置]分别实现了ToDoList功能。样式copy[todomvc官网](http://todomvc.com/)</br>
工作后第一个项目用vue完全搭建：[在线选房源码地址](https://gitee.com/HangZhouFangLv/choose-online-webAdmin)【代码托管在码云平台上，内部开源项目】


## Vue.js
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

### webpack配置Eslint in Sublime：
- 安装全局eslint：cnpm install -g eslint
- 项目安装npm插件：yarn add eslint-config-rallycoding  --dev
- sublime安装插件：SublimeLinter+SublimeLinter-contrib-eslint
- 项目新建.eslintrc配置文件：{"extends": "rallycoding"}

### webpack配置CSS预加载、模块化等技术实现
- style-loader
- css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5
- less-loader
- sass-loader
- postcss-loader+autoprefixer

### 引入React-Redex：从Redux Store中获取数据渲染到React组件的整体逻辑
- createStore初始化不可变应用状态Redux Store；
- Provider将Redux Store与Component连接；
- connect将Redux Store的state与Component的Props属性值关联；
- connect第一个参数mapStateToProps，可以获取Redux Store的state
- connect第一个参数actionCreators，可以获取Redux Store的actionCreators
- Redux Store的state和actionCreators直接通过组件属性{...props}向下全部传递

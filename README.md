# @faasjs/func

云函数模块。

[![License: MIT](https://img.shields.io/npm/l/@faasjs/func.svg)](https://github.com/faasjs/func/blob/master/LICENSE)
[![Build Status](https://img.shields.io/travis/com/faasjs/func.svg)](https://travis-ci.com/faasjs/func)
[![Coverage Status](https://img.shields.io/codecov/c/github/faasjs/func.svg)](https://codecov.io/gh/faasjs/func)
[![NPM Version](https://img.shields.io/npm/v/@faasjs/func.svg)](https://www.npmjs.com/package/@faasjs/func)

## 创建云函数

```typescript
import func from '@faasjs/func';

export default func('demo', function(event, context) {
  this.logger.info(event);
  return 'Hello world!'
});
```

### 监听事件

```typescript
import func from '@faasjs/func';

export default func('demo', function(event, context) {
  this.logger.info(event);
  return 'Hello world!'
}).on('beforeInvoke', function(event) {
  if(typeof event === 'undefined') throw Error('event 不能为空');
});
```

## 云函数的生命周期

`构建 Build -> 部署 Deploy -> 加载 Mount -> 触发 Invoke`

### 支持的事件及其触发顺序

* 构建环境
  * beforeBuild 开始构建前，可以进行添加 NPM 包等操作
  * onBuild
  * afterBuild
* 发布环境
  * beforeDeploy
  * onDeploy
  * afterDeploy
* 运行环境
  * afterMount 实例加载后，可以进行运行环境的环境变量配置和插件初始化等操作，仅在实例加载时执行一次
  * beforeInvoke
  * onInvoke
  * afterInvoke

## 接口文档

见 [API.md](https://github.com/faasjs/func/blob/master/API.md)

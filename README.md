# @faasjs/func

云函数模块。

[![License: MIT](hhttps://img.shields.io/npm/l/@faasjs/func.svg)](https://github.com/faasjs/func/blob/master/LICENSE)
[![Build Status](https://img.shields.io/travis/com/faasjs/func.svg)](https://travis-ci.com/faasjs/func)
[![Coverage Status](https://img.shields.io/codecov/c/github/faasjs/func.svg)](https://codecov.io/gh/faasjs/func)
[![NPM Version](https://img.shields.io/npm/v/@faasjs/func.svg)](https://www.npmjs.com/package/@faasjs/func)

云函数的生命周期为：

`构建 Build -> 部署 Deploy -> 加载 Mount -> 触发 Invoke`

支持的钩子及其触发顺序如下：

* beforeBuild
* onBuild
* afterBuild
* beforeDeploy
* onDeploy
* afterDeploy
* afterMount
* beforeInvoke
* onInvoke
* afterInvoke

## 通过简化函数创建云函数

```typescript
import func from '@faasjs/func';

export default func('demo', function(event, context) {
  this.logger.info(event);
  return 'Hello world!'
});
```

## 标准版创建步骤

```typescript
import { Func } from '@faasjs/func';

export default new Func({
  id: 'demo',
  onInvoke(event, context) {
    this.logger.info(event);
    return 'Hello world!';
  }
})
```

## 接口文档

见 [API.md](https://github.com/faasjs/func/blob/master/API.md)

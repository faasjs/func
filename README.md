# @faasjs/step

步骤模块。

一个步骤对应一个云函数，生命周期为：

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

## 简化版创建步骤

```typescript
import step from '@faasjs/step';

export default step('demo', (event, context) => {
  console.log(event);
  return 'Hello world!'
});
```

## 标准版创建步骤

```typescript
import { Step } from '@faasjs/step';

export default new Step({
  id: 'demo',
  onInvoke: (event, context) => {
    console.log(event);
    return 'Hello world!';
  }
})
```

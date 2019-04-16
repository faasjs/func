## Classes

<dl>
<dt><a href="#Step">Step</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#step">step(id, onInvoke, [options])</a></dt>
<dd><p>简化版的新建步骤函数</p>
</dd>
</dl>

<a name="Step"></a>

## Step
**Kind**: global class  
<a name="new_Step_new"></a>

### new Step(options)
标准版创建步骤类


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | 配置项 |
| options.id | <code>string</code> | 步骤 ID |
| [options.beforeBuild] | <code>function</code> | 构建前执行的函数 |
| [options.onBuild] | <code>function</code> | 构建时执行函数，未定义则执行默认构建函数 |
| [options.afterBuild] | <code>function</code> | 构建后执行的函数 |
| [options.beforeDeploy] | <code>function</code> | 部署前执行的函数 |
| [options.onDeploy] | <code>function</code> | 部署时执行的函数，未定义则执行部署函数 |
| [options.afterDeploy] | <code>function</code> | 部署后执行的函数 |
| [options.afterMount] | <code>function</code> | 实例加载后执行的函数 |
| [options.beforeInvoke] | <code>function</code> | 触发前执行的函数 |
| options.onInvoke | <code>function</code> | 触发时执行的函数 |
| [options.afterInvoke] | <code>function</code> | 触发后执行的函数 |

**Example**  
```js
import { Step } from '@faasjs/step';

export default new Step({
  id: 'demo',
  onInvoke(event, context) {
    console.log(event);
    return 'Hello world!';
  }
})
```
<a name="step"></a>

## step(id, onInvoke, [options])
简化版的新建步骤函数

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | 步骤 ID |
| onInvoke | <code>function</code> | 步骤触发时执行的函数 |
| [options] | <code>object</code> | 同完整版的触发函数 |

**Example**  
```js
import step from '@faasjs/step';

export default step('demo', function(event, context) {
  console.log(event);
  return 'Hello world!'
});
```

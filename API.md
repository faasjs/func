## Classes

<dl>
<dt><a href="#Func">Func</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#func">func(name, onInvoke, [options])</a></dt>
<dd><p>简化版的新建云函数</p>
</dd>
</dl>

<a name="Func"></a>

## Func
**Kind**: global class  
<a name="new_Func_new"></a>

### new Func(options)
云函数类


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | 配置项 |
| options.name | <code>string</code> | 云函数名 |
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
import { Func } from '@faasjs/func';

export default new Func({
  id: 'demo',
  onInvoke(event, context) {
    this.logger.info(event);
    return 'Hello world!';
  }
})
```
<a name="func"></a>

## func(name, onInvoke, [options])
简化版的新建云函数

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | 云函数名字 |
| onInvoke | <code>function</code> | 步骤触发时执行的函数 |
| [options] | <code>object</code> | 同完整版的触发函数 |

**Example**  
```js
import func from '@faasjs/func';

export default func('demo', function(event, context) {
  this.logger.info(event);
  return 'Hello world!'
});
```

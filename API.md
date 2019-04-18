## Classes

<dl>
<dt><a href="#Func">Func</a></dt>
<dd><p>云函数</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#func">func(name, handler, [options])</a> ⇒</dt>
<dd><p>新建云函数</p>
</dd>
</dl>

<a name="Func"></a>

## Func
云函数

**Kind**: global class  

* [Func](#Func)
    * [new Func(name, handler)](#new_Func_new)
    * [.on(hook, hanlder)](#Func+on)
    * [.emit(hook, ...args)](#Func+emit)
    * [.invoke(event, context)](#Func+invoke)

<a name="new_Func_new"></a>

### new Func(name, handler)
创建云函数


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | 云函数名字 |
| handler | <code>function</code> | 执行函数 |

<a name="Func+on"></a>

### func.on(hook, hanlder)
监听云函数生命周期的钩子并执行回调函数

**Kind**: instance method of [<code>Func</code>](#Func)  

| Param | Type | Description |
| --- | --- | --- |
| hook | <code>string</code> | 钩子名 |
| hanlder | <code>function</code> | 回调函数 |

<a name="Func+emit"></a>

### func.emit(hook, ...args)
触发生命周期钩子

**Kind**: instance method of [<code>Func</code>](#Func)  

| Param | Type | Description |
| --- | --- | --- |
| hook | <code>string</code> | 钩子名 |
| ...args | <code>any</code> | 参数 |

<a name="Func+invoke"></a>

### func.invoke(event, context)
执行云函数

**Kind**: instance method of [<code>Func</code>](#Func)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>any</code> | 事件 |
| context | <code>any</code> | 背景 |

<a name="func"></a>

## func(name, handler, [options]) ⇒
新建云函数

**Kind**: global function  
**Returns**: Func  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | 云函数名字 |
| handler | <code>function</code> | 步骤触发时执行的函数 |
| [options] | <code>object</code> | 同完整版的触发函数 |

**Example**  
```js
import func from '@faasjs/func';

export default func('demo', function(event, context) {
  this.logger.info(event);
  return 'Hello world!'
});
```

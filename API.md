## Classes

<dl>
<dt><a href="#Faasrc">Faasrc</a></dt>
<dd><p>配置函数</p>
</dd>
<dt><a href="#Func">Func</a></dt>
<dd><p>云函数</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#faasrc">faasrc(options)</a> ⇒</dt>
<dd><p>创建配置函数</p>
</dd>
<dt><a href="#multiAssign">multiAssign(func, list)</a></dt>
<dd><p>批量将配置函数应用于云函数</p>
</dd>
<dt><a href="#func">func(name, handler)</a> ⇒</dt>
<dd><p>新建云函数</p>
</dd>
</dl>

<a name="Faasrc"></a>

## Faasrc
配置函数

**Kind**: global class  

* [Faasrc](#Faasrc)
    * [new Faasrc(options)](#new_Faasrc_new)
    * [.on(hook, handler)](#Faasrc+on)
    * [.assign(func)](#Faasrc+assign)

<a name="new_Faasrc_new"></a>

### new Faasrc(options)
创建配置函数类


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | 配置项 |
| options.namePrefix | <code>string</code> | 命名前缀 |

<a name="Faasrc+on"></a>

### faasrc.on(hook, handler)
监听云函数生命周期事件

**Kind**: instance method of [<code>Faasrc</code>](#Faasrc)  

| Param | Type | Description |
| --- | --- | --- |
| hook | <code>string</code> | 事件名 |
| handler | <code>function</code> | 回调函数 |

<a name="Faasrc+assign"></a>

### faasrc.assign(func)
将配置函数应用于云函数

**Kind**: instance method of [<code>Faasrc</code>](#Faasrc)  

| Param | Type | Description |
| --- | --- | --- |
| func | [<code>Func</code>](#Func) | 云函数 |

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
创建云函数类


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | 云函数名字 |
| handler | <code>function</code> | 执行函数 |

<a name="Func+on"></a>

### func.on(hook, hanlder)
监听云函数生命周期事件并执行回调函数

**Kind**: instance method of [<code>Func</code>](#Func)  

| Param | Type | Description |
| --- | --- | --- |
| hook | <code>string</code> | 事件名 |
| hanlder | <code>function</code> | 回调函数 |

<a name="Func+emit"></a>

### func.emit(hook, ...args)
手动触发生命周期事件

**Kind**: instance method of [<code>Func</code>](#Func)  

| Param | Type | Description |
| --- | --- | --- |
| hook | <code>string</code> | 事件名 |
| ...args | <code>any</code> | 参数 |

<a name="Func+invoke"></a>

### func.invoke(event, context)
触发云函数

**Kind**: instance method of [<code>Func</code>](#Func)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>any</code> | 事件 |
| context | <code>any</code> | 背景 |

<a name="faasrc"></a>

## faasrc(options) ⇒
创建配置函数

**Kind**: global function  
**Returns**: Faasrc  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | 配置项 |
| options.namePrefix | <code>string</code> | 命名前缀 |

**Example**  
```js
import { faasrc } from '@faasjs/func';

export default faasrc({ namePrefix: '_' })
  .on('beforeBuild', function() {
    // do something
  });
```
<a name="multiAssign"></a>

## multiAssign(func, list)
批量将配置函数应用于云函数

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| func | [<code>Func</code>](#Func) | 云函数 |
| list | [<code>Array.&lt;Faasrc&gt;</code>](#Faasrc) | 配置函数列表 |

<a name="func"></a>

## func(name, handler) ⇒
新建云函数

**Kind**: global function  
**Returns**: Func  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | 云函数名 |
| handler | <code>function</code> | 触发时执行的函数 |

**Example**  
```js
import func from '@faasjs/func';

export default func('demo', function(event, context) {
  this.logger.info(event);
  return 'Hello world!'
});
```

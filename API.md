<a name="Func"></a>

## Func
**Kind**: global class  

* [Func](#Func)
    * [new Func(config, steps)](#new_Func_new)
    * [.build(data)](#Func+build)
    * [.deploy(data)](#Func+deploy)
    * [.mount()](#Func+mount)
    * [.invoke(data)](#Func+invoke)
    * [.createHandler()](#Func+createHandler)

<a name="new_Func_new"></a>

### new Func(config, steps)
新建流程


| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | 配置项 |
| config.plugins | <code>Array.&lt;object&gt;</code> | 插件配置，若未设置，默认会使用 Sync 插件 |
| steps | <code>Array.&lt;step&gt;</code> | 步骤数组 |

<a name="Func+build"></a>

### func.build(data)
构建代码包

**Kind**: instance method of [<code>Func</code>](#Func)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | 代码包信息 |
| data.filename | <code>string</code> | 包括完整路径的流程文件名 |

<a name="Func+deploy"></a>

### func.deploy(data)
发布云资源

**Kind**: instance method of [<code>Func</code>](#Func)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | 待发布信息 |
| data.resources | <code>object</code> | 云资源信息 |

<a name="Func+mount"></a>

### func.mount()
启动云实例

**Kind**: instance method of [<code>Func</code>](#Func)  
<a name="Func+invoke"></a>

### func.invoke(data)
执行云函数

**Kind**: instance method of [<code>Func</code>](#Func)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | 执行信息 |

<a name="Func+createHandler"></a>

### func.createHandler()
创建触发函数

**Kind**: instance method of [<code>Func</code>](#Func)  

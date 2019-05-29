<a name="Func"></a>

## Func
**Kind**: global class  

* [Func](#Func)
    * [new Func(config)](#new_Func_new)
    * [.build(data)](#Func+build)
    * [.deploy(data)](#Func+deploy)
    * [.mount()](#Func+mount)
    * [.invoke(data)](#Func+invoke)
    * [.export()](#Func+export)

<a name="new_Func_new"></a>

### new Func(config)
新建流程


| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | 配置项 |
| config.plugins | <code>Array.&lt;Plugin&gt;</code> | 插件 |
| config.handler | <code>Handler</code> | 业务函数 |
| config.builder | <code>object</code> | 构建配置项 |
| config.deployer | <code>object</code> | 部署配置项 |

<a name="Func+build"></a>

### func.build(data)
构建代码包

**Kind**: instance method of [<code>Func</code>](#Func)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | 代码包信息 |
| data.root | <code>string</code> | 项目根目录 |
| data.filename | <code>string</code> | 包括完整路径的流程文件名 |
| data.env | <code>string</code> | 环境 |

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

<a name="Func+export"></a>

### func.export()
创建触发函数

**Kind**: instance method of [<code>Func</code>](#Func)  

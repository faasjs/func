## Classes

<dl>
<dt><a href="#Step">Step</a></dt>
<dd><p><p>创建步骤</p></p>
<p><p>一个步骤对应一个云函数，生命周期为：</p></p>
<p><p>构建 Build -&gt; 部署 Deploy -&gt; 加载 Mount -&gt; 触发 Invoke</p></p>
<p><p>支持的钩子及其触发顺序如下：</p></p>
<ul>
<li>beforeBuild</li>
<li>onBuild</li>
<li>afterBuild</li>
<li>beforeDeploy</li>
<li>onDeploy</li>
<li>afterDeploy</li>
<li>afterMount</li>
<li>beforeInvoke</li>
<li>onInvoke</li>
<li>afterInvoke</li>
</ul></dd>
</dl>

## Members

<dl>
<dt><a href="#Step">Step</a></dt>
<dd><p>简化版的新建步骤函数</p></dd>
</dl>

<a name="Step"></a>

## Step
<p>创建步骤</p>
<p>一个步骤对应一个云函数，生命周期为：</p>
<p>构建 Build -&gt; 部署 Deploy -&gt; 加载 Mount -&gt; 触发 Invoke</p>
<p>支持的钩子及其触发顺序如下：</p>
<ul>
<li>beforeBuild</li>
<li>onBuild</li>
<li>afterBuild</li>
<li>beforeDeploy</li>
<li>onDeploy</li>
<li>afterDeploy</li>
<li>afterMount</li>
<li>beforeInvoke</li>
<li>onInvoke</li>
<li>afterInvoke</li>
</ul>

**Kind**: global class  
<a name="new_Step_new"></a>

### new Step(options)
<p>标准版创建步骤类</p>


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | <p>配置项</p> |
| options.id | <code>string</code> | <p>步骤 ID</p> |
| [options.beforeBuild] | <code>function</code> | <p>构建前执行的函数</p> |
| [options.onBuild] | <code>function</code> | <p>构建时执行函数，未定义则执行默认构建函数</p> |
| [options.afterBuild] | <code>function</code> | <p>构建后执行的函数</p> |
| [options.beforeDeploy] | <code>function</code> | <p>部署前执行的函数</p> |
| [options.onDeploy] | <code>function</code> | <p>部署时执行的函数，未定义则执行部署函数</p> |
| [options.afterDeploy] | <code>function</code> | <p>部署后执行的函数</p> |
| [options.afterMount] | <code>function</code> | <p>实例加载后执行的函数</p> |
| [options.beforeInvoke] | <code>function</code> | <p>触发前执行的函数</p> |
| options.onInvoke | <code>function</code> | <p>触发时执行的函数</p> |
| [options.afterInvoke] | <code>function</code> | <p>触发后执行的函数</p> |

<a name="Step"></a>

## Step
<p>简化版的新建步骤函数</p>

**Kind**: global variable  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>步骤 ID</p> |
| onInvoke | <code>function</code> | <p>步骤触发时执行的函数</p> |
| [options] | <code>object</code> | <p>同完整版的触发函数</p> |

**Example**  
```js
import step from '@faasjs/step';

export default step('demo', (event, context) => {
  console.log(event);
  return 'Hello world!'
});
```
<a name="new_Step_new"></a>

### new Step(options)
<p>标准版创建步骤类</p>


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | <p>配置项</p> |
| options.id | <code>string</code> | <p>步骤 ID</p> |
| [options.beforeBuild] | <code>function</code> | <p>构建前执行的函数</p> |
| [options.onBuild] | <code>function</code> | <p>构建时执行函数，未定义则执行默认构建函数</p> |
| [options.afterBuild] | <code>function</code> | <p>构建后执行的函数</p> |
| [options.beforeDeploy] | <code>function</code> | <p>部署前执行的函数</p> |
| [options.onDeploy] | <code>function</code> | <p>部署时执行的函数，未定义则执行部署函数</p> |
| [options.afterDeploy] | <code>function</code> | <p>部署后执行的函数</p> |
| [options.afterMount] | <code>function</code> | <p>实例加载后执行的函数</p> |
| [options.beforeInvoke] | <code>function</code> | <p>触发前执行的函数</p> |
| options.onInvoke | <code>function</code> | <p>触发时执行的函数</p> |
| [options.afterInvoke] | <code>function</code> | <p>触发后执行的函数</p> |


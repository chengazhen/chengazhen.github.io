import{_ as n,o as s,c as a,a as t}from"./app-5309157e.js";const p={},e=t(`<h1 id="实现一个简单的-promise-抽时间写一个符合-promise-a-规范的" tabindex="-1"><a class="header-anchor" href="#实现一个简单的-promise-抽时间写一个符合-promise-a-规范的" aria-hidden="true">#</a> 实现一个简单的 Promise (抽时间写一个符合 promise A+规范的)</h1><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 首先思考 Promise 里面的内置属性</span>

<span class="token comment">// 状态</span>
<span class="token comment">// 正确的状态 需要一个 最终值</span>
<span class="token comment">// 错误的状态 需要一个错误消息</span>
<span class="token comment">// 进行中的状态 value和错误消息都是空的</span>

<span class="token comment">// 内置方法</span>
<span class="token comment">// resolve 成功的调用方法</span>
<span class="token comment">// reject 失败的调用方法</span>
<span class="token comment">// then 把结果返回出去的方法</span>

<span class="token comment">// 三种状态提前准备好</span>
<span class="token keyword">const</span> <span class="token constant">PENDING</span> <span class="token operator">=</span> <span class="token string">&#39;pending&#39;</span> <span class="token comment">// 进行中状态</span>
<span class="token keyword">const</span> <span class="token constant">FULFILLED</span> <span class="token operator">=</span> <span class="token string">&#39;fulfilled&#39;</span> <span class="token comment">// 操作完成状态</span>
<span class="token keyword">const</span> <span class="token constant">REJECTED</span> <span class="token operator">=</span> <span class="token string">&#39;rejected&#39;</span> <span class="token comment">// 拒绝状态</span>
<span class="token keyword">class</span> <span class="token class-name">Promise</span> <span class="token punctuation">{</span>
	<span class="token comment">// promise 内置属性 决定值 错误值 状态值</span>
	value <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
	error <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
	status <span class="token operator">=</span> <span class="token constant">PENDING</span>
	notification <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token comment">// 订阅结果的集合</span>

	<span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">executable</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 在这里是通过这个传递进来的函数,将内部方法传递出去</span>
		<span class="token function">executable</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>resolve<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>reject<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 成功获取值</span>
	<span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
		<span class="token comment">// 状态一旦确定是无法改变的</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token constant">PENDING</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token constant">FULFILLED</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value
			<span class="token keyword">this</span><span class="token punctuation">.</span>notification<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
				<span class="token function">item</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 发生错误(为什么使用一个箭头函数,因为reject函数在外部调用时是单独调用不是以.reject属性方式调用,隐式绑定this就会失效,函数中的this.status就会是undefined,而剪头函数中的this是由当前上下文决定的,所以不管怎么调用,this始终是Promsie)</span>
	<span class="token function-variable function">reject</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
		<span class="token comment">// 状态一旦确定是无法改变的</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token constant">PENDING</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token constant">REJECTED</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>error <span class="token operator">=</span> error
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// then 方法将结果返回出去</span>

	<span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">_resolve</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>notification<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
			<span class="token function">_resolve</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
	<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
		<span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">555</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">10000</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行逻辑</p><p>首先 new 一个 Promise 对象, 并且把 resolve, reject 函数以参数方式传到外部, 现在 setTimeout 函数是异步,先不执行, 接下来开始执行 then 方法, 这时候 then 方法 传入一个订阅函数, 通过 then 方法的内部逻辑将订阅方法添加到订阅集合里面,2s(这里的时间不必过于纠结精确问题)过去了, 这个时候执行了 resolve 方法, 通过 resolve 内部的逻辑, 改变状态,确定成功值, 执行订阅集合里面的 onResolve 函数, 这样 value 值就被返回出来了, 本质就是回调</p><h1 id="链式调用方式" tabindex="-1"><a class="header-anchor" href="#链式调用方式" aria-hidden="true">#</a> 链式调用方式</h1><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 首先思考 Promise 里面的内置属性</span>

<span class="token comment">// 状态</span>
<span class="token comment">// 正确的状态 需要一个 最终值</span>
<span class="token comment">// 错误的状态 需要一个错误消息</span>
<span class="token comment">// 进行中的状态 value和错误消息都是空的</span>

<span class="token comment">// 内置方法</span>
<span class="token comment">// resolve 成功的调用方法</span>
<span class="token comment">// reject 失败的调用方法</span>
<span class="token comment">// then 把结果返回出去的方法</span>

<span class="token comment">// 三种状态提前准备好</span>
<span class="token keyword">const</span> <span class="token constant">PENDING</span> <span class="token operator">=</span> <span class="token string">&#39;pending&#39;</span> <span class="token comment">// 进行中状态</span>
<span class="token keyword">const</span> <span class="token constant">FULFILLED</span> <span class="token operator">=</span> <span class="token string">&#39;fulfilled&#39;</span> <span class="token comment">// 操作完成状态</span>
<span class="token keyword">const</span> <span class="token constant">REJECTED</span> <span class="token operator">=</span> <span class="token string">&#39;rejected&#39;</span> <span class="token comment">// 拒绝状态</span>
<span class="token keyword">class</span> <span class="token class-name">Promise</span> <span class="token punctuation">{</span>
	<span class="token comment">// promise 内置属性 决定值 错误值 状态值</span>
	value <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
	error <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
	status <span class="token operator">=</span> <span class="token constant">PENDING</span>
	notification <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token comment">// 订阅结果的集合</span>

	<span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">executable</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 在这里是通过这个传递进来的函数,将内部方法传递出去</span>
		<span class="token function">executable</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>resolve<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>reject<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 成功获取值</span>
	<span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
		<span class="token comment">// 状态一旦确定是无法改变的</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token constant">PENDING</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token constant">FULFILLED</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value
			<span class="token keyword">this</span><span class="token punctuation">.</span>notification<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
				<span class="token function">item</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 发生错误(为什么使用一个箭头函数,因为reject函数在外部调用时是单独调用不是以.reject属性方式调用,隐式绑定this就会失效,函数中的this.status就会是undefined,而剪头函数中的this是由当前上下文决定的,所以不管怎么调用,this始终是Promsie)</span>
	<span class="token function-variable function">reject</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
		<span class="token comment">// 状态一旦确定是无法改变的</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token constant">PENDING</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token constant">REJECTED</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>error <span class="token operator">=</span> error
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// then 方法将结果返回出去(缺点是无论什么情况都会返回一个promise)</span>
	<span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">onResolve</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 返回一个 Promise 的目的是为了解决链式 \`.then\`</span>
		<span class="token keyword">const</span> promise2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>notification<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
				<span class="token comment">// 首先把第一次订阅的的结果返回出去,接下来判断结果订阅里面是否有返回值(这个时候)</span>
				<span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token function">onResolve</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span>
				<span class="token comment">//  返回了一个Promsie 的实例</span>
				<span class="token keyword">if</span> <span class="token punctuation">(</span>res <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
					<span class="token comment">// 这样好理解一点 promise2.resolve 充当订阅方法(onResolve)</span>
					<span class="token keyword">const</span> _onResolve <span class="token operator">=</span> resolve
					<span class="token comment">// 这个时候 promise2.resolve 充当订阅方法(onResolve), 当 res 的 resolve 在外部被调用的时候, 这个 promise2.resolve 方法就会被执行, 并且把 res 的当前 value 值 通过 promise2.resolve 传入 进而改变promise2 的 value, 进而通过订阅执行 onResolve 函数,</span>
					<span class="token comment">// 就会获取到 当前 promise2 的 value 值 返回出去</span>
					res<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>_onResolve<span class="token punctuation">)</span>
				<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
					<span class="token comment">// 返回值是一个非 Promise 的值</span>
					<span class="token function">resolve</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> promise2
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
	<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
		<span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">555</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">2000</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token comment">// 555</span>
	<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
		<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
			<span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">666</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token comment">// 666</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 缺点始终会返回一个 promise</span>
<span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
	<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
		<span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">555</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">2000</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> p2 <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p2<span class="token punctuation">.</span>status<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><img src="https://cdn.jsdelivr.net/gh/azhen98/A-week-to-learn@assert/image/surprise.png" alt="surprise"></p></blockquote><p>书籍:《你不知道的 JavaScript 上册》 2.2.4 章 new 绑定</p><p>关于 this 指向, 这里涉及到 new 绑定,使用 new 操作符会发生以下四步</p><ol><li>创建一个全新的对象</li><li>这个新对象会被执行 [prototype] 连接</li><li><strong>这个新对象会绑定到函数的 this 上</strong></li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
<span class="token punctuation">}</span>

<span class="token keyword">var</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">&#39;zhang&#39;</span><span class="token punctuation">)</span>
p<span class="token punctuation">.</span>name <span class="token comment">// zhang</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>如果函数没有返回其他对象, 那么 new 表达式中的函数调用会自动返回这个新对象</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;person&#39;</span>
	<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
		console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token comment">// {name:&#39;person&#39;}</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token punctuation">{</span>
		<span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;return&#39;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> c <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// {name:&#39;return&#39;}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","handwriting-promise.html.vue"]]);export{r as default};

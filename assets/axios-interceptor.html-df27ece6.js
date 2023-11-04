import{_ as p,r as e,o,c,b as n,d as a,e as t,a as i}from"./app-4cf660ad.js";const l={},u=i(`<h2 id="首先思考-axios-的基本功能" tabindex="-1"><a class="header-anchor" href="#首先思考-axios-的基本功能" aria-hidden="true">#</a> 首先思考 axios 的基本功能</h2><blockquote><p>我们首先要弄清 axios 拦截器它实现的功能, 不能直接上手实现, 如果连它的功能都没有摸透, 那么我们就没办法掌握它, 更不要说自己实现了(这里主要是实现请求拦截器)</p></blockquote><p>值得注意的是拦截器可以多次对 config 进行处理,处理的顺序是从右向左, 也就是说从第一个拦截器开始执行,第一个拦截器就是第一个 use 的拦截器, 每一个拦截器接收的参数, 都是上一个拦截器处理过的数据</p><p>这里的拦截被放在一个集合里面, 如果按照顺序来执行拦截器, 自然就需要从右边开始</p><p><img src="https://cdn.jsdelivr.net/gh/azhen98/A-week-to-learn@assert/image/20210915170705.png" alt="20210915170705"></p><p>一起来看下 axios 自身拦截器的多次拦截功能</p><p>下面的代码中一共拦截了两次请求, 每次都添加了一个 <code>tip</code>, 用来证明第二次接收的 <code>config</code> 是第一次修改过的配置, 在响应拦截器中可以看到, config 里面确实含有两次处理的结果</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.jsdelivr.net/npm/axios@0.21.4/dist/axios.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
	<span class="token comment">// 第一次添加请求拦截器</span>
	axios<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>
		<span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token punctuation">{</span>
				<span class="token operator">...</span>config<span class="token punctuation">,</span>
				<span class="token literal-property property">tip</span><span class="token operator">:</span> <span class="token string">&#39;这是第一次拦截处理&#39;</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">// 对请求错误做些什么</span>
			<span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">)</span>

	<span class="token comment">//第二次添加请求拦截器</span>
	axios<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>
		<span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token punctuation">{</span>
				<span class="token operator">...</span>config<span class="token punctuation">,</span>
				<span class="token literal-property property">tip2</span><span class="token operator">:</span> <span class="token string">&#39;这是第二次拦截处理&#39;</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">// 对请求错误做些什么</span>
			<span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">)</span>

	<span class="token comment">// 响应拦截器 用来查看 被请求拦截器修改的 config</span>
	axios<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>
		<span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>config<span class="token punctuation">)</span> <span class="token comment">// {	tip: &#39;这是第一次拦截处理&#39;,tip2: &#39;这是第二次拦截处理&#39;,....}</span>
			<span class="token comment">// 对响应数据做点什么</span>
			<span class="token keyword">return</span> response
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">// 对响应错误做点什么</span>
			<span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">)</span>
	axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;xxxxx.com&#39;</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>走到这里感觉有点像 compose 函数, compose 函数,通俗点说就是将一个函数的返回值作为另外一个函数的参数, 最终获取被多个逻辑处理过的结果</p><p>在这里是从右往左执行</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">compose</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>fns</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter">initValue</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> fns<span class="token punctuation">.</span><span class="token function">reduceRight</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">currentValue<span class="token punctuation">,</span> fn</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">fn</span><span class="token punctuation">(</span>currentValue<span class="token punctuation">)</span><span class="token punctuation">,</span> initValue<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span> <span class="token comment">// {config: &#39;init&#39;, tip: &#39;第一次&#39;}</span>
	<span class="token keyword">return</span> <span class="token punctuation">{</span>
		<span class="token operator">...</span>config<span class="token punctuation">,</span>
		<span class="token literal-property property">tip</span><span class="token operator">:</span> <span class="token string">&#39;第一次&#39;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">test2</span><span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span> <span class="token comment">// {config: &#39;init&#39;}</span>
	<span class="token keyword">return</span> <span class="token punctuation">{</span>
		<span class="token operator">...</span>config<span class="token punctuation">,</span>
		<span class="token literal-property property">tip2</span><span class="token operator">:</span> <span class="token string">&#39;第二次&#39;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">compose</span><span class="token punctuation">(</span>test<span class="token punctuation">,</span> test2<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">config</span><span class="token operator">:</span> <span class="token string">&#39;init&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// {config: &#39;init&#39;, tip: &#39;第一次&#39;, tip2: &#39;第二次&#39;}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以发现,compose 是一次行将所有逻辑录入, 而拦截器是 可以多次 use 调用传入拦截逻辑, 所以这里不适用 compose</p><p>核心就是利用 <code>promise.then</code> 方法会返回一个 <code>promise</code> 对象</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> axios <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">requestList</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token literal-property property">responseList</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">}</span>
axios<span class="token punctuation">.</span>intercept <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>axios<span class="token punctuation">)</span> <span class="token comment">// 这里将拦截属性的 prototype 关联到 axios, 方便将拦截逻辑直接存入 requestList</span>
axios<span class="token punctuation">.</span>intercept<span class="token punctuation">.</span><span class="token function-variable function">request</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>requestList<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span> resolve<span class="token punctuation">,</span> reject <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
axios<span class="token punctuation">.</span>intercept<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span>
	<span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token punctuation">{</span>
			<span class="token operator">...</span>config<span class="token punctuation">,</span>
			<span class="token literal-property property">tip</span><span class="token operator">:</span> <span class="token string">&#39;第一次&#39;</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token comment">// 对错误做点什么</span>
	<span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
		console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">)</span>
axios<span class="token punctuation">.</span>intercept<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span>
	<span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token punctuation">{</span>
			<span class="token operator">...</span>config<span class="token punctuation">,</span>
			<span class="token literal-property property">tip2</span><span class="token operator">:</span> <span class="token string">&#39;第二次&#39;</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token comment">// 对错误做点什么</span>
	<span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
		console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">)</span>

axios<span class="token punctuation">.</span><span class="token function-variable function">run</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 请求拦截器逻辑</span>
	<span class="token keyword">const</span> promise <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span> <span class="token comment">// 把 config 包装成一个拥有确定值的 promise 对象</span>
	config <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>requestList<span class="token punctuation">.</span><span class="token function">reduceRight</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">currnetPromise<span class="token punctuation">,</span> item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
		<span class="token keyword">const</span> <span class="token punctuation">{</span> resolve<span class="token punctuation">,</span> reject <span class="token punctuation">}</span> <span class="token operator">=</span> item
		<span class="token comment">// promise then 方法默认会返回一个 promise 对象, 如果 then 方法返回了一个值, 那么这个 promise 就是一个 有确定值的 promise 对象</span>
		<span class="token keyword">return</span> currnetPromise<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token function">resolve</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span> promise<span class="token punctuation">)</span>
	<span class="token keyword">return</span> config
<span class="token punctuation">}</span>

axios<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
	<span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">&#39;xxx.com&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 返回值</span>
<span class="token comment">// Promise {&lt;pending&gt;}</span>
<span class="token comment">// [[Prototype]]: Promise</span>
<span class="token comment">// [[PromiseState]]: &quot;fulfilled&quot;</span>
<span class="token comment">// [[PromiseResult]]: Object</span>
<span class="token comment">// tip: &quot;第一次&quot;</span>
<span class="token comment">// tip2: &quot;第二次&quot;</span>
<span class="token comment">// url: &quot;xxx.com&quot;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>currnetPromise.then((res) =&gt; { return resolve(res) })</code> 这里究竟做了什么</p><p>在 promise then 方法中, 第一个函数接收正确值,第二个是接受错误, 所以当 then 方法的回调函数被执行的时候, promise 的值可以自动当做参数被传入回调函数中,我们可以基于这个参数的基础上进行修改, 然后返回一个修改过的值, 拥有返回值的 then 方法 就会返回一个拥有确定值的 promise 对象(此处有点绕, 建议先自己写一个简单的 promise, 这样逻辑就了然于心了)</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>axios<span class="token punctuation">.</span>intercept<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span>
	<span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token punctuation">{</span>
			<span class="token operator">...</span>config<span class="token punctuation">,</span>
			<span class="token literal-property property">tip</span><span class="token operator">:</span> <span class="token string">&#39;第一次&#39;</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token comment">// 对错误做点什么</span>
	<span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
		console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">)</span>

<span class="token comment">// 这里其实就是把这个拦截 当做 promise then 方法的响应回调了</span>
promise<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token punctuation">{</span>
			<span class="token operator">...</span>config<span class="token punctuation">,</span>
			<span class="token literal-property property">tip</span><span class="token operator">:</span> <span class="token string">&#39;第一次&#39;</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17),r={href:"https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then",target:"_blank",rel:"noopener noreferrer"},k={href:"https://github.com/azhen98/A-week-to-learn/blob/master/doc/%E7%AC%AC%E4%BA%94%E6%9C%9F(%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E7%AE%80%E5%8D%95%E7%9A%84Promise).md",target:"_blank",rel:"noopener noreferrer"},d={href:"https://juejin.cn/post/6844904039608500237#heading-3",target:"_blank",rel:"noopener noreferrer"};function v(m,b){const s=e("ExternalLinkIcon");return o(),c("div",null,[u,n("p",null,[n("a",r,[a("MDN 文档"),t(s)])]),n("p",null,[n("a",k,[a("手写一个 promise"),t(s)])]),n("p",null,[n("a",d,[a("掘金大佬"),t(s)])])])}const f=p(l,[["render",v],["__file","axios-interceptor.html.vue"]]);export{f as default};

import{_ as i,r as p,o as l,c as o,b as n,d as a,e,a as t}from"./app-1de16d16.js";const c={},u=t('<h1 id="_1-js-的数据类型" tabindex="-1"><a class="header-anchor" href="#_1-js-的数据类型" aria-hidden="true">#</a> 1. js 的数据类型</h1><ol><li>6 种原始数据</li></ol><ul><li>number</li><li>string</li><li>Boolean</li><li>undefined</li><li>Symbol</li><li>BigInt</li></ul><hr><ul><li>Object</li><li>Function</li><li>null</li></ul>',5),r={href:"https://developer.mozilla.org/ru/docs/Web/JavaScript/Data_structures",target:"_blank",rel:"noopener noreferrer"},d=t(`<h1 id="_2-map-和-set-的区别" tabindex="-1"><a class="header-anchor" href="#_2-map-和-set-的区别" aria-hidden="true">#</a> 2. Map 和 Set 的区别</h1><p>Map 以键值的形式存在，并且能够记住键的原始插入顺序。任何值(对象或者原始值) 都可以作为一个键或一个值。</p><p><code>Set</code> 以集合的形式存在,Set 中的元素只会出现一次,可以用来数组去重</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>	const arr = [1, 2, 3, 4, 5]
	const arr2 = [1, 2, 3, 4, 5, 6]
	const res = Array.from(new Set([...arr, ...arr2]))
  //[1, 2, 3, 4, 5, 6]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_3-weakmap-和-map-之间的区别" tabindex="-1"><a class="header-anchor" href="#_3-weakmap-和-map-之间的区别" aria-hidden="true">#</a> 3. WeakMap 和 Map 之间的区别</h1><p>WeakMap 只能用复杂类型的数据作为 key, 并且 key 是弱引用的,对于垃圾回收机制更加友好</p><p>Map 可以被遍历, WeakMap 不能被遍历, Map 的 key 可以使任何值</p><p>WeakMap 的垃圾回收机制(创建一个文件 粘贴下面的代码) 执行命令 <code>node --expose-gc demo.js</code></p><p>--expose-gc 参数表示允许手动执行垃圾回收机制, 如果不使用这个参数执行,下面的对比是不可行的</p><ul><li>Map(对比)</li></ul><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>//map.js
global.gc(); // 0 每次查询内存都先执行gc()再memoryUsage()，是为了确保垃圾回收，保证获取的内存使用状态准确

function usedSize() {
    const used = process.memoryUsage().heapUsed;
    return Math.round((used / 1024 / 1024) * 100) / 100 + &quot;M&quot;;
}

console.log(usedSize()); // 1 初始状态，执行gc()和memoryUsage()以后，heapUsed 值为 1.64M

var map = new Map();
var b = new Array(5 * 1024 * 1024);

map.set(b, 1);

global.gc();
console.log(usedSize()); // 2 在 Map 中加入元素b，为一个 5*1024*1024 的数组后，heapUsed为41.82M左右

b = null;
global.gc();

console.log(usedSize()); // 3 将b置为空以后，heapUsed 仍为41.82M，说明Map中的那个长度为5*1024*1024的数组依然存在
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>WeakMap(对比)</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// weakmap.js</span>
<span class="token keyword">function</span> <span class="token function">usedSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">const</span> used <span class="token operator">=</span> process<span class="token punctuation">.</span><span class="token function">memoryUsage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>heapUsed
	<span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token function">round</span><span class="token punctuation">(</span><span class="token punctuation">(</span>used <span class="token operator">/</span> <span class="token number">1024</span> <span class="token operator">/</span> <span class="token number">1024</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">100</span> <span class="token operator">+</span> <span class="token string">&#39;M&#39;</span>
<span class="token punctuation">}</span>

global<span class="token punctuation">.</span><span class="token function">gc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 0 每次查询内存都先执行gc()再memoryUsage()，是为了确保垃圾回收，保证获取的内存使用状态准确</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">usedSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 1 初始状态，执行gc()和 memoryUsage()以后，heapUsed 值为 1.64M</span>
<span class="token keyword">var</span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token number">5</span> <span class="token operator">*</span> <span class="token number">1024</span> <span class="token operator">*</span> <span class="token number">1024</span><span class="token punctuation">)</span>

map<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>b<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>

global<span class="token punctuation">.</span><span class="token function">gc</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">usedSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 2 在 Map 中加入元素b，为一个 5*1024*1024 的数组后，heapUsed为41.82M左右</span>

b <span class="token operator">=</span> <span class="token keyword">null</span>
global<span class="token punctuation">.</span><span class="token function">gc</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">usedSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 3 将b置为空以后，heapUsed 变成了1.82M左右，说明WeakMap中的那个长度为5*1024*1024的数组被销毁了</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_4-原型链" tabindex="-1"><a class="header-anchor" href="#_4-原型链" aria-hidden="true">#</a> 4. 原型链</h1><p>实例对象的原型(<code>__proto__</code>)指向构造函数的原型(prototype)</p><p>构造函数的原型的 constructor 指向它本身</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">const</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

person<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Person</span><span class="token punctuation">.</span>prototype <span class="token comment">//true</span>

<span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor <span class="token operator">===</span> Person <span class="token comment">//true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17),v={href:"https://github.com/mqyqingfeng/Blog/issues/2",target:"_blank",rel:"noopener noreferrer"},m=t(`<h1 id="_5-this" tabindex="-1"><a class="header-anchor" href="#_5-this" aria-hidden="true">#</a> 5. this</h1><p>this 指向调用者</p><p>改变 this 指向的几个方法:call, apply, bind</p><p>箭头函数中没有 this,箭头函数捕捉其所在上下文的 this,作为自己的 this 值,在全局上下文中向上查 找的过程中一旦找到 this,就会停止直接为自己所用,就近;查找 this 是在声明时的位置,不是调用位置</p><p>call, apply, bind 也无法改变箭头函数的 this 指向,this 不遵守隐式绑定规则</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var a = 1;
var obj = {
  a: 2
};
function fun() {
    var a = 3;
    let f = () =&gt; console.log(this.a);
      f();
};
fun();//1
fun.call(obj);//2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果是 1 的情况</p><ul><li><p>this.a 查找规则: this.a(此时的 this 就是 fun 函数中的 this) =&gt; fun 函数中的 this(此时的 this 指向 window) =&gt; a 声明为全局变量,自动挂载到全局 window 对象上=&gt; 最终 this.a 就是 window.a</p></li><li><p>严格模式下 fun 中的 this 就是 undefined 所以 this.a 就是 undefined</p></li></ul><p>结果是 2 的情况</p><ul><li><p>fun 使用 call 方法将其的 this 指向改为了 obj</p></li><li><p>this.a (此时的 this 就是 fun 函数中的 this) =&gt; fun 函数中的 this(此时的 this 指向 obj) =&gt; this.a 就是 obj.a</p></li></ul><h1 id="_6-浅拷贝和深拷贝" tabindex="-1"><a class="header-anchor" href="#_6-浅拷贝和深拷贝" aria-hidden="true">#</a> 6. 浅拷贝和深拷贝</h1><ol><li>浅拷贝: 一般指的是把对象的第一层拷贝到一个新对象上去，比如</li></ol><ul><li><p><code>Object.assign()</code></p></li><li><p>扩展运算符</p></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token number">234324</span><span class="token punctuation">,</span> <span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">}</span>

<span class="token keyword">const</span> obj2<span class="token operator">=</span> <span class="token punctuation">{</span><span class="token operator">...</span>obj<span class="token punctuation">,</span><span class="token literal-property property">age</span><span class="token operator">:</span><span class="token string">&#39;234324&#39;</span><span class="token punctuation">}</span> 
obj2<span class="token punctuation">.</span>name<span class="token operator">=</span><span class="token number">111</span>
obj<span class="token punctuation">.</span>name <span class="token comment">// 1111</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>深拷贝:</li></ol><ul><li><p>递归实现 需要判断各种情况</p></li><li><p><code>JSON.stringify</code>;如果对象属性有函数,则会丢失这个函数属性</p></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token number">234324</span><span class="token punctuation">,</span> <span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">}</span>

<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// {name: 234324}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>拓展</li></ol><p>关于函数的参数为对象时,传参的形式就是浅复制,是引用地址的拷贝,两者还是指向同一个引用地址(基本类型数据是直接拷贝值)</p><ul><li>基本类型值是存储在栈中的简单数据段，也就是说，他们的值直接存储在变量访问的位置。堆是存放数据的基于散列算法的数据结构，在javascript中，引用值是存放在堆中的。</li></ul><p><img src="https://i.loli.net/2021/09/02/lCquGexZNQhFMf6.png" alt="image.png"></p><ul><li>修改属性的值还是会通过当前引用地址找到属性值</li></ul><p><img src="https://i.loli.net/2021/09/02/GytP7TbAFqNYoHe.png" alt="image.png"></p><ul><li>直接操作对象本身，也就是最外层，会和之前的对象断开连接</li></ul><p><img src="https://i.loli.net/2021/09/02/KsUDbkHaNRxdivF.png" alt="image.png"></p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>const obj={name:111}

function func(argu){
  argu.name=222
}

func(obj)

obj.name // 222

// 第二种
function func1(argu){
  argu={name:6666}
}

obj.name //111

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="事件冒泡和事件捕获" tabindex="-1"><a class="header-anchor" href="#事件冒泡和事件捕获" aria-hidden="true">#</a> 事件冒泡和事件捕获</h1><p>事件冒泡:事件冒泡就是水里面的水泡从最底层一直像水面冒出,放在html这个大水池里面就是</p><p>p=&gt;parent=&gt;parent=&gt; =&gt; html =&gt; document</p><p>事件捕获与事件冒泡相反,从外往内,事件具体到某个触发的元素</p><p>document -&gt; html -&gt; body -&gt; div -&gt; p</p><ul><li>阻止事件冒泡</li></ul><p>event.stopPropagation</p><p>阻止捕获和冒泡阶段中当前事件的进一步传播。</p><p>但是，它不能防止任何默认行为的发生； 例如，对链接的点击仍会被处理。</p><p>拓展</p><ul><li>阻止事件触发后默认动作的发生</li></ul><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>document.addEventListener(
    &#39;touchstart&#39;,
    (event) =&gt; {
      //  cancelable 表明该事件是否可以被取消 ,比如滚动行为正在进行是无法阻止的,像阻止双指放大的脚本里面就可以用到
      if (event.cancelable) {
          event.preventDefault()
      }
    },
    { passive: false }
  )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在的浏览器为了性能 将<code>target.addEventListener(type, listener, options);</code>passive设置为true, 某些浏览器（特别是Chrome和Firefox）已将文档级节点 Window，Document和Document.body的touchstart (en-US)和touchmove (en-US)事件的passive选项的默认值更改为true。这可以防止调用事件监听器，因此在用户滚动时无法阻止页面呈现,所以需要将passive设置为false 才能阻止这些特定的dom元素的默认行为</p>`,39),k={href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopPropagation",target:"_blank",rel:"noopener noreferrer"},b={href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault",target:"_blank",rel:"noopener noreferrer"};function h(g,f){const s=p("ExternalLinkIcon");return l(),o("div",null,[u,n("p",null,[n("a",r,[a("文档"),e(s)])]),d,n("p",null,[n("a",v,[a("详细文档"),e(s)])]),m,n("p",null,[n("a",k,[a("参考文档,stopPropagation"),e(s)])]),n("p",null,[n("a",b,[a("参考文档,preventDefault"),e(s)])])])}const y=i(c,[["render",h],["__file","js-fundamentals.html.vue"]]);export{y as default};

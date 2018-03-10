webpackJsonp([0xb92c730af4aa],{633:function(n,s){n.exports={data:{markdownRemark:{html:'<p><a href="https://webpack.github.io">webpack</a> 是一款 js 模块管理工具， 能使用 commonjs 或者 es6 方式来管理 js 模块， 利用其 loader 插件还能做一些炫酷的事情， 比如利用 babel-loader 就能放心大胆的使用 es6 的新特性， 或者利用 jsx-loader 自动转换 jsx 为 js 文件.<!--more--></p>\n<h2>配置 webpack</h2>\n<p>主要配置 babel-loader， 能让 webpack 自动把 es6 代码转换为 es5 代码</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n    <span class="token operator">...</span>\n    resolveLoader<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        modulesDirectories<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'node_modules\'</span><span class="token punctuation">]</span>\n    <span class="token punctuation">}</span>，\n    resolve<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        extensions<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'\'</span><span class="token punctuation">,</span> <span class="token string">\'.js\'</span><span class="token punctuation">]</span>\n    <span class="token punctuation">}</span>，\n    module<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        loaders<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n            <span class="token punctuation">{</span>\n                test<span class="token punctuation">:</span> <span class="token regex">/\\.js$/</span><span class="token punctuation">,</span>\n                loader<span class="token punctuation">:</span> <span class="token string">\'babel?presets[]=es2015\'</span><span class="token punctuation">,</span>\n                exclude<span class="token punctuation">:</span> <span class="token regex">/(node_modules|lib)/</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">]</span>\n    <span class="token punctuation">}</span>\n    <span class="token operator">...</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>如果你打算把 angular 作为单独的库文件在页面中引入的话， 别忘了加入 externals 配置中</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token operator">...</span>\nexternals<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    <span class="token string">\'angular\'</span><span class="token punctuation">:</span> <span class="token string">\'angular\'</span>\n<span class="token punctuation">}</span>\n<span class="token operator">...</span>\n</code></pre>\n      </div>\n<h2>使用 es6 class 作为 controller</h2>\n<p>es6 终于加入了 class 关键词， 可以愉快的使用 class 了</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">HomeController</span> <span class="token punctuation">{</span>\n    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">\'home\'</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\nangular<span class="token punctuation">.</span><span class="token function">module</span><span class="token punctuation">(</span><span class="token string">\'app\'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">controller</span><span class="token punctuation">(</span><span class="token string">\'HomeController\'</span><span class="token punctuation">,</span> HomeController<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<h2>异步加载 controller</h2>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code>angular<span class="token punctuation">.</span><span class="token function">module</span><span class="token punctuation">(</span><span class="token string">\'app\'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">config</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>$locationProvider<span class="token punctuation">)</span><span class="token punctuation">{</span>\n    $locationProvider\n    <span class="token punctuation">.</span><span class="token function">when</span><span class="token punctuation">(</span><span class="token string">\'/\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n        templateUrl<span class="token punctuation">:</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'file!../templates/index.html\'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        resolve<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n            load<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n                <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span><span class="token punctuation">{</span>\n                    require<span class="token punctuation">.</span><span class="token function">ensure</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span>， <span class="token keyword">function</span><span class="token punctuation">(</span>require<span class="token punctuation">)</span><span class="token punctuation">{</span>\n                        <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'../controllers/home.js\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n                        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n                    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        controller<span class="token punctuation">:</span> <span class="token string">\'HomeController\'</span><span class="token punctuation">,</span>\n        controllerAs<span class="token punctuation">:</span> <span class="token string">\'vm\'</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>',excerpt:"webpack  是一款 js 模块管理工具， 能使用 commonjs 或者 es6 方式来管理 js 模块， 利用其 loader 插件还能做一些炫酷的事情， 比如利用 babel-loader 就能放心大胆的使用 es…",fields:{slug:"/4d4c26e465",tags:[{name:"javascript",slug:"de9b9ed78d"},{name:"webpack",slug:"424516ca53"},{name:"angular",slug:"d18b8624a0"}]},frontmatter:{date:"2015-11-12",path:"/angular-webpack",title:"使用 webpack 写 angular"}},site:{siteMetadata:{disqusShortName:"devharry",siteUrl:"https://goharry.io"}}},pathContext:{slug:"/4d4c26e465",prev:{excerpt:"说到前端中间件，大多数人想到的估计会是nodejs但通常一个页面的数据是由多个接口提供，如果使用 nodejs 难免会陷入 callback hell 的局面.  而解决 callback hell 的方案无非是 es…",fields:{slug:"/27ec26a39a",tags:[{name:"deploy",slug:"078f40fa23"},{name:"python",slug:"23eeeb4347"},{name:"docker",slug:"05b6053c41"}]},frontmatter:{path:"/middleware-deploy",title:"前端中间件实践和代码部署",date:"2015-12-09T00:00:00.000Z"}},next:{excerpt:"supervisor 是基于 python 的任务管理工具，用来自动运行各种后台任务，当然你也能直接利用 nohup 命令使任务自动后台运行，但如果要重启任务，每次都自己手动 kill…",fields:{slug:"/ab5bd5df67",tags:[{name:"python",slug:"23eeeb4347"},{name:"virtualenv",slug:"d613f49da0"},{name:"supervisor",slug:"09348c20a0"}]},frontmatter:{path:"/setup-supervisor-based-on-virtualenv",title:"配置基于 virtualenv 的 supervisor",date:"2014-08-24T00:00:00.000Z"}}}}}});
//# sourceMappingURL=path---4-d-4-c-26-e-465-1acbcfdc8aa7df370ebd.js.map
### 如何做到修改src目录里面的文件，webpack-dev-server会重新编译并刷新页面？

devServer里面有两个配置项`contentBase`与`watchContentBase`：

contentBase一般是我们的静态文件目录；

watchContentBase设置为true的时候，devServer就会监听入口contentBase目录下文件的改变，一旦发现改变，devServer会重新加载整个页面。注意这个跟HMR是不同的。

>   我一般偏向用这种方法重新加载，因为有时候发现HMR有一些莫名其妙的问题，不放心。

```shell
devServer: {
	contentBase: path.join(__dirname, '../dist'),
	watchContentBase: true
}
```

### 如何减少webpack-dev-server控制台输出？每次输出一堆信息。

devServer里面有个stats配置项，值可以是字符串，也可以是对象（包含了更详细的配置项），我们可以配置stats为errors-only这样可以减少大量的输出信息，应该能达到要求。如果想自己配置，那么下面的这个配置可以参考一下：

```shell
stats: {
	performance: true,
    chunks: true,
    chunkModules: false,
    chunkOrigins: false,
    errors: true,
    errorDetails: true,
    hash: false,
    timings: false,
    modules: false,
    warnings: true,
    entrypoints: false,
    children: false
}
```

### 如何给webpack-dev-server配置代理

配置代理的作用就是解决开发时的跨域问题，devServer有个proxy配置项，可以接受一个数组，一般我们根据不同的环境配置不同的代理服务器地址，如：

```shell
const proxyConfig = {
    mock: [
        { context: ['/api'], target: 'http://localhost:3000' }
    ],
    dev: [
        { context: ['/api'], target: 'http://134.234.43.33:8080' }
    ],
    test: [
        { context: ['/api'], target: 'http://22.139.2.34' }
    ]
};

const env = 'mock';
devServer: {
	proxy: proxyConfig[env]
}
```

上面分别配置了三种环境下的代理。context是一个数组，用于存放需要被代理的api路径，因为对于同一个target，你可能有不同前缀的api调用，这样我们只需要在context中加入其它路径即可。还有一种情况就是一个环境可以代理不同的target，所以每个环境对应的也是一个数组，即proxyConfig的每个键值都是数组，这样我们可以增加不同的target，不同context，这样非常灵活。

### 经常自定义的打包命令有哪些？

这个没有统一的说法，主要看你的命令实现什么功能，命令的名称都是每个人根据功能自己定的，一般我会以下面的格式定义一些命令：（【动作】：【目标环境】）

-   **dev：mock** - 开发时连接mock服务器，用于本地模拟，项目前期后台还没有部署任何api，只有接口文档时。
-   **dev：dev** - 开发时连接开发服务器，用于开发中后期，此时后台陆续将api部署到开发环境，我们可以连接开发环境来开发。
-   **dev：test** - 开发时连接测试环境，用于开发完成后的bug处理。此时前后台已经各自将代码部署到测试环境，进入测试阶段，测试会在测试环境提bug，此时我们需要连接到测试环境重现并处理。
-   **build：dev** - 产出能部署到开发环境的静态文件，也多用于开发内部测试。
-   **build：test** - 测试开始前需用到。主要是产出能部署到测试环境的静态文件。
-   **build：prod** - 产出能部署到生产环境的静态文件
-   **deploy：dev** - 在build：dev的基础上增加了上传文件功能，需要知道目标环境的用户名密码，以及部署的目标路径。
-   **deploy：test/deploy：prod** - 同上。只是deploy：prod一般很少用到，因为实际的生产环境部署工作都是运维来处理，有统一的系统，我们只需要将静态文件打包交给他们即可。

### webpack打包时如何传入打包参数，使其根据参数来决定产出静态文件

webpack到4.x的版本基本可以无需自己写配置，但有追求的人一般对这不会领情，所以，要如何自定义配置和传参？

webpack的配置文件一般我们定义为webpack.config.js，文件名可以随意，但要用js扩展名，这样我们才可以编程。下面以webpack.config.js这个名字为例：

webpack.config.js实质就是一个CMD的模块，webpack定义我们可以导出一个函数，一个数组或一个对象。这里我们用函数，因为函数可以有参数传进来用。

```javascript
module.exports = ({ env }) => {
    return {
        mode: 'development',
        entry: '',
        ...
    };
}
```

上面我们在导出函数里定义了参数，问题是这个参数从哪里传进来？

参数可以从package.json的scripts命令传进来，如下：

```shell
"scripts": {
    "dev:dev": "webpack-dev-server --config build/webpack.config.js --env.env dev:dev",
    "dev:mock": "webpack-dev-server --config build/webpack.config.js --env.env dev:mock",
    "dev:test": "webpack-dev-server --config build/webpack.config.js --env.env dev:test"
  },
```

上面我们定义了三个命令，分别对应于本地，开发，测试环境的打包。通过--config参数可以给webpack/webpack-dev-server传配置文件， --env参数会传给配置文件导出的函数。

注意这里的 --env.env, 这里实际是定义了env为一个对象，这个对象有一个属性为env，即：{env：‘’}被传到了配置里面。所以根据上面的例子，我们在配置函数里面需要做下面的解析：

```javascript
module.exports = ({ env }) => {
	const [action, target] = env.split(':');
    return {
        mode: action === 'dev' ? 'development' : 'production',
        plugins：getPlugins([action, target])
        ...
    };
};
```

我们还可以在env对象定义其他属性，如--env.action, 这样传进去的对象就是{env:’’, action:’’}. 拿到执行命令时传入的不同参数，就可以对webpack的配置做更多灵活处理，如上面的mode，还有plugins等等

### 修改了webpack的打包配置也能让webpack-dev-server重新启动吗？不然每次都要人工先结束它再重启。

上面说到我们通过watchContentBase，在修改业务代码时，webpack-dev-server会重启，然而当你修改webpack打包配置的时候，它并不会重启，这就需要我们手工处理，比较麻烦。所以可以用nodemon来监听webpack打包配置的改动，然后重新执行打包命令。

```shell
"dev:mock": "nodemon --watch build --exec \"webpack-dev-server --config build/webpack.config.js --env.env dev:mock\"",
```

通过nodemon的--watch参数可以指定需要监听的目录，这里我们webpack的打包配置目录为build，即只要build目录下的文件有改变，nodemon会重新调用--exec指定的命令。--exec即为我们上面定义的打包命令，注意参数–exec的命令需要用引号。

### 如何定义打包入口

通过webpack的配置项entry，可以定义入口。这里常用做法是定义一个对象，对象的每个属性指定一个入口文件路径，这样打包出来就会分多个模块。对于单页应用，我们一般定义一个属性，即一个入口文件。

```javascript
entry: {
    app: path.join(__dirname, '../src/app')
}
```

上面是定义了js的入口，问题是我们的html文件从哪里来？

我们可以用html-webpack-plugin来输出html文件，它的常用配置：

```javascript
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    title: 'vue最新打包配置模板',
    template: config.template,
    favicon: config.faviconUrl,
    hash: false,
    minify: true
});
```

template: 可以是一个html文件或者任何模板引擎文件，里面提供基本的元素和结构，html-webpack-plugin会以这个文件为模板创建具体的html文件。当然你也可以不用指定template，它会帮你创建一个html文件。

title：最终的页面标题，当指定template时，可以通过下面这样引用标题：

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
    <title><%= htmlWebpackPlugin.options.title %></title>
</head>
```

favicon: 指定favicon路径即可

hash：指定被html引用的资源，包括js，图片，样式等是否要添加哈希值

```html
<!-- hash=false -->
<link rel="shortcut icon" href="/favicon-marrio.ico">
<!-- hash=true -->
<link rel="shortcut icon" href="/favicon-marrio.ico?b19961fa4bfee1e20336">
```

minify: 是否对生成的html文件进行压缩，取空白等

### 如何定义打包输出？

可以通过output配置项来定义具体的输出，常用配置有以下几个属性：

```javascript
output: {
    filename: '[name]-[contenthash:8].js',
    publicPath: config.publicPath,
    chunkFilename: 'chunk-[name]-[contenthash:8].js',
    path: config.output
}
```

**filename**: 定义入口模块打包后的最终文件名，也可以是一个路径。

**chunkFilename**：定义非入口模块打包后的最终文件名，即对动态加载的代码片段命名。

**path**：指定最终文件的存放位置，通常是dist目录。

**publicPath**：指定静态文件的根目录，默认是‘/’, 如果你的文件部署在网站的二级目录，则需要修改此配置

### 如何运行ES6？

安装好webpack，配置好webpack-dev-server，然后再配置好webpack的打包配置文件，指定入口js，这样就可以运行es6了。当然这只是在一些modern浏览器上是可以的，比如IE的某些版本是不行的。比如下面的代码：

```javascript
let a = Array.from({length:10});
console.log(a);
```

IE11会报错，chrome，firefox最近的版本都没问题。所以要让IE也能不报错，或者低版本的chrome，firefox都能运行，那该怎么办？------ 答案是babel。

首先安装@babel/core, @babel/preset-env, babel-loader, core-js@3，babel/core 7.4后的版本已经不建议我们安装@babel/polyfill，而是直接安装core-js@3。

安装上面的所有包后，（注意core-js@3是要作为依赖安装的，而非开发依赖。）我们还有两个事情要做：第一创建babel的配置文件babel.config.js；第二给webpack的配置文件增加babel-loader;

```javascript
module.exports = api => {
    return {
        plugins: [],
        presets: [
            [
                "@babel/preset-env",
                {
                    useBuiltIns: "usage",
                    debug: true,
                    corejs: '3.6',
                    // caller.target will be the same as the target option from webpack
                    targets: api.caller(caller => caller && caller.target === "node")
                        ? { node: "current" }
                        : { chrome: "58", ie: "11" }
                }
            ]
        ]
    }
};
```

useBuiltIns: 为usage表示babel只会添加你代码里面用的polyfills，不会全部添加corejs所有包含的es特性。

debug：true 打包过程中会输出babel使用了哪些es特性，随时跟踪打包文件的大小, 可能的输出如下图所示：

```shell
[M:\*****\src\app\index.js] Added following core-js polyfills:
  es.symbol { "ie":"11" }
  es.array.filter { "ie":"11" }
  es.array.for-each { "ie":"11" }
  es.object.get-own-property-descriptor { "ie":"11" }
  es.object.get-own-property-descriptors { "ie":"11" }
  es.object.keys { "ie":"11" }
  es.object.to-string { "ie":"11" }
  es.promise { "chrome":"58", "ie":"11" }
  web.dom-collections.for-each { "ie":"11" }

```

corejs: 指定你安装的corejs的版本号，最好精确到minor。

targets：指定特定浏览器添加polyfills

```javascript
{
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel-loader'
}
```

配置babel-loader的时候，记得配置exclude。经过上面的一番折腾es6的最新特性如：?? - 操作符， ?. - 操作符等都已经可以使用，无需再在babel的配置文件中增加相对应的插件，也无需安装插件。

如何安装eslint

使用sass和css



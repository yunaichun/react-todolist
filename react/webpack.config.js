var webpack = require('webpack');
var config = {
    entry: {
        vendor: ['react', 'react-dom'],
        util:['./src/js/common/util.js'],
        index:[
            './src/js/index/index.js',
            './src/js/index/components/todoItem.jsx',
            './src/js/index/components/footer.jsx',
            './src/js/index/components/app.jsx'
        ]
    },
    output: {
        path: __dirname + '/dist/js/',
        filename: '[name].js',
        //webpack-dev-server，修改后的内容会重新打包
        /*publicPath:'./dist/'*/
    },
    module: {
        rules: [ 
            //http://stackoverflow.com/questions/41472965/issue-while-migrating-from-webpack-1-x-to-webpack-2-x-no-eslint-configuration-f
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                exclude: /node_modules/,
                options: {
                    emitWarning: true,
                    emitError: true,
                    //failOnWarning: false,
                    //failOnError: true,
                    useEslintrc: false,
                    // configFile: path.join(__dirname, ".eslintrc")
                    configFile: './.eslintrc'
                }
            },
            {
                test: /\.js$/,   
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015,presets[]=stage-0,presets[]=react',
                /*options: {
                    presets: ['es2015', 'stage-0', 'react']
                }*/
            },
            {
                test:/\.css$/,
                exclude:/node_modules/,
                loader:'style-loader!css-loader?modules'
            }
        ]
    },
    plugins: [
        //热加载
        new webpack.HotModuleReplacementPlugin(),
        //第三方代码库
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
    ],
    devServer: {
        //启动目录
        contentBase: './dist/',
        //自动刷新
        inline:true,
        //webpack-dev-server，修改后的内容会重新打包
        hot:true,
    },
    devtool: 'source-map',
};
module.exports=config;
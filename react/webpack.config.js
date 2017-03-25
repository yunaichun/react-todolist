var webpack = require('webpack');
const glob = require('glob');
var config = {
    entry: {
        vendor: ['react', 'react-dom']
    },
    output: {
        path: __dirname + '/dist/js/',
        filename: '[name].js'
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
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            {
                test:/\.css$/,
                exclude:/node_modules/,
                loader:'style-loader!css-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })
    ],
};
/**
 * find entries
 */
var files = glob.sync('./src/js/*/index.js');
var newEntries = files.reduce(function(previousValue, currentValue) {
    /*如果 exec() 找到了匹配的文本，则返回一个结果数组。此数组的第 0 个元素是与正则表达式相匹配的文本*/
    /*.*匹配最长的，.*?匹配最短的(非贪婪匹配)*/
    var name = /.*\/(.*?)\/index\.js/.exec(currentValue)[1];
    previousValue[name] = entry(name);
    return previousValue;
}, {});
config.entry = Object.assign({}, config.entry, newEntries);
/**
 * [返回完整具体文件夹名称]
 */
function entry(name) {
    return './src/js/' + name + '/index.js';
}
module.exports = config;
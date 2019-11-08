module.exports = {
    mode: 'development',
    watch: true,
    entry: {
        polyfill: 'babel-polyfill',
        app: './src/index.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};

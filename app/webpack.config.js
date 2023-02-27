const path = require('path');

module.exports = {
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            'vue': path.join(__dirname, 'node_modules', 'vue', 'dist', 'vue.esm-browser.js'),
        },
        extensions: ['.vue', '.js', '.js', '.json'],
    },
};

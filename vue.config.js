module.exports = {
  devServer: {
    proxy: {
      '/dictionary': {
        target: 'http://localhost:8080', // Địa chỉ server API
        changeOrigin: true,
        pathRewrite: { '^/dictionary': '/dictionary' },
      },
    },
  },
};
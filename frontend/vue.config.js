module.exports = {
  devServer: {
    proxy: {
      "^/api/": {
        target: "http://localhost:3001",
        ws: true,
        changeOrigin: true,
      },
      "^/auth/": {
        target: "http://localhost:3001",
        ws: true,
        changeOrigin: true,
      },
    },
  },
};

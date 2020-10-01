const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: process.env.REACT_APP_BACKEND_API_PROXY,
      changeOrigin: true,
      pathRewrite: { "^/api": "/api" },
    })
  );
};

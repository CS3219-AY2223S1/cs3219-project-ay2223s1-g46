const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
  app.use(
    "/user-service",
    createProxyMiddleware({
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  )
  app.use(
    "/question-service",
    createProxyMiddleware({
      target: "http://localhost:8001",
      changeOrigin: true,
    })
  )
  app.use(
    "/history-service",
    createProxyMiddleware({
      target: "http://localhost:8003",
      changeOrigin: true,
    })
  )
}

import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = (req, res) => {
    let target = "";

    // proxy target url
    if (req.url.startsWith("/api")) {
        target = "https://vercel-user-study.vercel.app";
    }

    createProxyMiddleware({
        target,
        changeOrigin: true,
    })(req, res)
} 
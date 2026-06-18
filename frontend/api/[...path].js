import { buffer } from "node:stream/consumers";

const BACKEND_BASE = "http://13.235.138.219:8080/api";

export default async function handler(req, res) {
  const url = new URL(req.url, "http://localhost");
  const path = url.pathname.replace(/^\/api/, "");
  const targetUrl = `${BACKEND_BASE}${path}${url.search}`;
  const method = req.method;

  const rawBody = await buffer(req);
  const headers = { ...req.headers };
  delete headers.host;
  delete headers.origin;
  delete headers["referer"];
  delete headers["x-forwarded-for"];
  delete headers["x-forwarded-proto"];

  const response = await fetch(targetUrl, {
    method,
    headers,
    body: rawBody.length ? rawBody : undefined,
  });

  res.statusCode = response.status;
  response.headers.forEach((value, name) => {
    const blocked = [
      "transfer-encoding",
      "content-length",
      "connection",
      "keep-alive",
      "x-powered-by",
    ];
    if (!blocked.includes(name.toLowerCase())) {
      res.setHeader(name, value);
    }
  });

  const data = await response.arrayBuffer();
  res.end(Buffer.from(data));
}

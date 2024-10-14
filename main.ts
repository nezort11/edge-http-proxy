const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "*",
};

const handleProxyHttpRequest = async (_req: Request) => {
  if (_req.method === "OPTIONS") {
    return new Response("Hi!", { headers: corsHeaders });
  }
  const originUrlObj = new URL(_req.url);

  if (originUrlObj.pathname.length === 1) {
    return new Response(
      "Welcome to the Edge Http Proxy! Put any URL you want to proxy in path"
    );
  }

  const targetUrl = originUrlObj.pathname.slice(1) + originUrlObj.search;
  const responseProxied = await fetch(targetUrl, _req);
  const proxiedCorsHeaders = new Headers(responseProxied.headers);
  for (const corsHeader of Object.entries(corsHeaders)) {
    // replace proxy cors header instead of concat
    proxiedCorsHeaders.set(...corsHeader);
  }
  return new Response(responseProxied.body, {
    headers: proxiedCorsHeaders,
  });
};

Deno.serve({ hostname: "0.0.0.0", port: 4000 }, handleProxyHttpRequest);

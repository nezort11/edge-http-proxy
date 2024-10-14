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
  for (const corsHeader of Object.entries(corsHeaders)) {
    responseProxied.headers.set(...corsHeader);
  }
  return responseProxied;
};

Deno.serve(handleProxyHttpRequest);

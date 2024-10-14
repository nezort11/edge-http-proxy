const handleProxyHttpRequest = async (_req: Request) => {
  const originUrlObj = new URL(_req.url);

  if (originUrlObj.pathname.length === 1) {
    return new Response(
      "Welcome to the Edge Http Proxy! Put any URL you want to proxy in path"
    );
  }

  const targetUrl = originUrlObj.pathname.slice(1) + originUrlObj.search;
  const responseProxied = await fetch(targetUrl, _req);
  return responseProxied;
};

Deno.serve(handleProxyHttpRequest);

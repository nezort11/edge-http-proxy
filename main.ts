// import * as base64 from "@std/encoding/base64";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "*",
};

const handleProxyHttpRequest = async (_req: Request) => {
  if (_req.method === "OPTIONS") {
    return new Response("Hi!", { headers: corsHeaders });
  }
  // console.log("request:", _req);
  // console.log("request.url:", _req.url);
  const originUrlObj = new URL(_req.url);

  if (originUrlObj.pathname.length === 1) {
    return new Response(
      "Welcome to the Edge Http Proxy! Put any URL you want to proxy in path"
    );
  }

  let targetHeaders = _req.headers;
  const targetHeadersSerializedEncoded =
    originUrlObj.searchParams.get("__headers");
  if (targetHeadersSerializedEncoded) {
    const targetHeadersSerialized = decodeURIComponent(
      targetHeadersSerializedEncoded
    );
    // const targetHeadersSerializedArr = base64.decodeBase64(
    //   targetHeadersSerializedEncoded
    // );
    // const targetHeadersSerialized = targetHeadersSerializedArr.toString();
    targetHeaders = new Headers(JSON.parse(targetHeadersSerialized));
    // console.log("targetHeaders", targetHeaders);
  }

  const targetUrl = originUrlObj.pathname.slice(1) + originUrlObj.search;
  // console.log("target url:", targetUrl);

  const responseProxied = await fetch(targetUrl, {
    ..._req,
    headers: targetHeaders,
  });
  const proxiedCorsHeaders = new Headers(responseProxied.headers);
  for (const corsHeader of Object.entries(corsHeaders)) {
    // replace proxy cors header instead of concat
    proxiedCorsHeaders.set(...corsHeader);
  }
  return new Response(responseProxied.body, {
    headers: proxiedCorsHeaders,
  });
};

Deno.serve({ hostname: "0.0.0.0", port: 8000 }, handleProxyHttpRequest);

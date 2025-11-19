# edge http proxy

[![Deploy to my Deno Deploy](https://img.shields.io/badge/Deploy_to_my_Deno_Deploy-black?logo=deno&logoColor=white)](https://deploy.deno.dev/?url=https://github.com/nezort11/edge-http-proxy)

Simple, lighting fast edge http request proxy server written in Deno/Typescript

`https://ehp.deno.dev/<Any URL>`

Just prefix any url with `https://ehp.deno.dev/` and bypass CORS, ip/dns block and etc.

> e.g. https://ehp.deno.dev/https://example.com/

## Features

- **Bypass CORS**: Access any resource without CORS restrictions
- **IP/DNS Block Circumvention**: Access blocked resources through edge locations
- **Redirect Following**: Automatically follows HTTP redirects
- **Final URL Resolution**: Returns the final URL after redirects via `X-Final-URL` header
- **Custom Headers Support**: Pass custom headers via `__headers` query parameter

## Usage

### Basic Proxying

Simply prepend your target URL to the proxy base URL:

```
https://epic-cobra-80.deno.dev/https://example.com
```

### URL Resolution with Redirects

The proxy follows redirects and includes the final URL in the response headers:

```bash
curl -I https://epic-cobra-80.deno.dev/https://t.co/test
# Check X-Final-URL header for the resolved destination
```

### Programmatic Usage (TypeScript/JavaScript)

```typescript
import axios from "axios";

const proxyUrl = "https://epic-cobra-80.deno.dev";
const targetUrl = "https://t.co/shortened-url";

const response = await axios.get(`${proxyUrl}/${targetUrl}`);
const finalUrl = response.headers["x-final-url"];
console.log("Resolved URL:", finalUrl);
```

## Deployment

```bash
deno task deploy
```

Current deployment: https://epic-nose-80.deno.dev

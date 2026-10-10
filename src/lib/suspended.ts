// Served for every request while SITE_SUSPENDED=true (see src/proxy.ts).
// Self-contained: no Sanity, no next-intl, no layout.

export function isSiteSuspended(): boolean {
    return process.env.SITE_SUSPENDED === "true";
}

export const SUSPENDED_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>Temporarily Unavailable</title>
<style>
  body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#eaeaea;color:#000;font-family:Georgia,'Times New Roman',serif;text-align:center;padding:24px}
  main{max-width:520px}
  h1{font-size:28px;font-weight:400;margin:0 0 16px}
  p{font-size:16px;line-height:1.6;color:#494949;margin:0}
</style>
</head>
<body>
<main>
<h1>Temporarily Unavailable</h1>
<p>This website is currently unavailable. Please check back soon.</p>
</main>
</body>
</html>`;
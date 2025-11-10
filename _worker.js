// _worker.js
export default {
  async fetch(request, env, ctx) {
    // 1️⃣ Eğer siteye direkt erişiliyorsa index.html dosyasını döndür
    if (request.method === "GET" && request.url.endsWith("/")) {
      const html = await env.ASSETS.fetch("https://cyberjre.github.io/index.html");
      return new Response(await html.text(), {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }

    // 2️⃣ Örnek dış isteğe TLS 1.2–1.3 aralığı zorlaması
    const target = "https://cyberjre.github.io"; // kendi test URL’in varsa buraya koy
    const response = await fetch(target, {
      cf: {
        minTlsVersion: "1.2",
        maxTlsVersion: "1.3",
      },
    });

    // 3️⃣ Hedeften gelen cevabı döndür
    return new Response(response.body, response);
  },
};

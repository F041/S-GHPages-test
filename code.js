window.onload = function () {
  const ui = SwaggerUIBundle({
    url: "swagger.json", // Path to your swagger.json
    dom_id: "#swagger-ui",
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
    layout: "StandaloneLayout",
    requestInterceptor: (request) => {
      // Intercept the request for the `/add` endpoint
      if (request.url.startsWith("/S-GHPages-test/add") && request.method === "GET") {
        const urlParams = new URLSearchParams(request.url.split("?")[1]);
        const a = parseFloat(urlParams.get("a"));
        const b = parseFloat(urlParams.get("b"));
        const result = { result: a + b }; // Perform addition
        return {
          ok: true,
          status: 200,
          json: async () => result,
          text: async () => JSON.stringify(result),
        };
      }
      return request;
    },
  });
};

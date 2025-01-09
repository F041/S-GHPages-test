window.onload = function () {
  const ui = SwaggerUIBundle({
    url: "swagger.json", // Path to your swagger.json
    dom_id: "#swagger-ui",
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
    layout: "StandaloneLayout",
    requestInterceptor: (request) => {
      if (request.url.includes("/add") && request.method === "GET") {
        // Parse query parameters
        const urlParams = new URLSearchParams(request.url.split("?")[1]);
        const a = parseFloat(urlParams.get("a"));
        const b = parseFloat(urlParams.get("b"));

        // Check for valid inputs
        if (isNaN(a) || isNaN(b)) {
          return {
            ok: true,
            status: 400,
            json: async () => ({ error: "Invalid input" }),
            text: async () => JSON.stringify({ error: "Invalid input" }),
          };
        }

        // Perform addition
        const result = { result: a + b };
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

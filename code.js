window.onload = function () {
  const ui = SwaggerUIBundle({
    url: "swagger.json", // Path to your swagger.json
    dom_id: "#swagger-ui",
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
    layout: "StandaloneLayout",
    requestInterceptor: (request) => {
      // Intercept the request for the `/add` endpoint
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
            headers: { "Content-Type": "application/json" }, // Add Content-Type header
            json: async () => ({ error: "Invalid input" }), // Return error in JSON format
          };
        }

        // Perform addition
        const result = { result: a + b };
        return {
          ok: true,
          status: 200,
          headers: { "Content-Type": "application/json" }, // Add Content-Type header
          json: async () => result, // Return the result in JSON format
        };
      }
      return request; // Let other requests pass through without modification
    },
  });
};

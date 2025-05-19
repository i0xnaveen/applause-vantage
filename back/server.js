const Hapi = require("@hapi/hapi");
// Bootstrap modules
const config = require("./config");
const { setupGraphQL } = require("./bootstrap/graphql");

async function init() {
  const server = Hapi.server({
    port: config.server.port || 3001,
    host: config.server.host || "0.0.0.0",
  });
  await setupGraphQL(server);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

init();

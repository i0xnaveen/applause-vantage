const Hapi = require("@hapi/hapi");
// Bootstrap modules
const config = require("./config");
const { setupGraphQL } = require("./bootstrap/graphql");
const {init: initMysql} = require('./bootstrap/mysql')
async function init() {
  console.log("Helo");
  
  const server = Hapi.server({
    port: config.server.port || 3001,
    host: config.server.host || "0.0.0.0",
  });
  console.log("jioo");
  
  await setupGraphQL(server);
  console.log("Vannakkam");
  
  await initMysql({force: true})
  console.log("Locaal");
  
  await server.start()

  console.log(`Server running at: ${server.info.uri}`)
}


process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

init();

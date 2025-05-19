const Hapi = require("@hapi/hapi");

const init = async () => {
  const server = Hapi.server({
    port: 3001,
    host: "localhost",
  });
  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Hello";
    },
  });
  await server.start();
  console.log("server is running on the port");
};
init();

const PDI = require("pdi-js")
const config = require("../config")
const mySqlServices = require("./mysql")
const PDI = require("pdi-js")
const config = require("../config")
const mySqlServices = require("./mysql")

const di = new PDI(`${__dirname}/../services`)

di.set("config", config)
di.set("config", config)

Object.entries(mySqlServices).forEach(([name, model]) => {
  di.set(`mysql/${name}`, model)
})
  di.set(`mysql/${name}`, model)
})

PDI.setStaticDi(di)
module.exports = di
PDI.setStaticDi(di)
module.exports = di

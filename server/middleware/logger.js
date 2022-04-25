
function logger(req, _res, next) {
  console.log(`🚀 Request for pokemon received: ${req.method} - ${req.url}`)
  next()
}

module.exports = logger
function errorHandler(err, _req, res, next) {
  console.log('🔥There was an error🔥\n', err.name, '\n', err)

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid parameter given' })
  }

  if (err.name === 'NotFound') {
    return res.status(404).json({ message: 'Not found' })
  }

  res.sendStatus(500)
  next(err)
}

module.exports = errorHandler
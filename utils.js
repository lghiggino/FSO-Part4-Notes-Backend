const generateId = (notes) => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0
  return maxId + 1
}

const requestLogger = (request, response, next) => {
  request.context = request.body.content
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('Context', request.context)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = { generateId, requestLogger, unknownEndpoint, errorHandler }

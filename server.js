const fastify = require('fastify')({ logger: true })
const path = require('path')

fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'view'),
    prefix: '/view/', // optional: default '/'
  })

fastify.get('/', function (req, reply) {
    return reply.sendFile('index.html') // serving path.join(__dirname, 'public', 'myHtml.html') directly
  })
  
// fastify.get('/path/with/different/root', function (req, reply) {
//     return reply.sendFile('about.html', path.join(__dirname, 'build')) // serving a file from a different root location
//   })

const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
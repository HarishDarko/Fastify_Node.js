const fastify = require('fastify')({ logger: true })
const path = require('path')
const fs = require('fs');

let book={}
fs.readFile('data.json', (err, data) => {
  if (err) throw err;
  book = JSON.parse(data);
  console.log(book);
});

//to use ejs file 
fastify.register(require('point-of-view'), {
  engine: {
    ejs: require('ejs')
  }
})

fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'view'),
    prefix: '/view/', // optional: default '/'
  })

fastify.get('/', function (req, reply) {
    reply.view('index.ejs',{data:book}) 
    // request.log.info('Some info about the current request')
    // serving path.join(__dirname, 'public', 'myHtml.html') directly
  })
  
fastify.get('/about', function (req, reply) {
     reply.view('about.html') // serving a file from a different root location
  })
// listening for the request
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
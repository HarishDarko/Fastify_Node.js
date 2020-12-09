const fastify = require('fastify')({ logger: true })
const path = require('path')
const fs = require('fs');

let student={}
fs.readFile('data.json', (err, data) => {
  if (err) throw err;
  student = JSON.parse(data);
  console.log(student);
});


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
    reply.view('index.ejs',{data:student}) 
    
    // serving path.join(__dirname, 'public', 'myHtml.html') directly
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
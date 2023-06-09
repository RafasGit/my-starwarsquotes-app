

console.log('May Node be with you')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
//const MongoClient = require('mongodb').MongoClient
const connectionString = "mongodb+srv://joshraphael424:0129384756Mongo@cluster0.xatvzru.mongodb.net/?retryWrites=true&w=majority"
//const connectionString = 'mongodb+srv://raphaelnganga4:0129384756Cluster@clusterstars.c56mug8.mongodb.net/'

const { MongoClient, ServerApiVersion } = require('mongodb');
//const connect = "mongodb+srv://joshraphael424:<password>@cluster0.xatvzru.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(connectionString, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')
    app.set('view engine', 'ejs')
    
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static('public'))
    app.use(bodyParser.json())

app.get('/', (req, res) => {
    db.collection('quotes')
    .find()
    .toArray()
    .then(results => {
      console.log(results)
      res.render('index.ejs', { quotes: results})
    })
    .catch(error => console.error(error))
    // const cursor = db.collection('quotes').find()
    // console.log(cursor)
   
   //res.sendFile(__dirname + '/index.html')
    
  })
app.post('/quotes', (req, res) => {
    
        quotesCollection
          .insertOne(req.body)
          .then(result => {
            res.redirect('/')
            console.log(result)
    // console.log('Hellooooooooooooooooo!')
    // console.log(req.body)
          })
          .catch(error => console.error(error))
      })

    // console.log('Hellooooooooooooooooo!')
    // console.log(req.body)
 app.put('/quotes',(req, res) => {
   // console.log(req.body)
    quotesCollection
  .findOneAndUpdate(
    { name: 'Josh' },
    {
      $set: {
        name: req.body.name,
        quote: req.body.quote,
      },
    },
    {
      upsert: true,
    }
  )
  .then(result => {
    res.json('Success')
  })
 .catch(error => console.error(error))
})
//handling our delete request using deleteOne Mongo method with query: body.name property and no option
// We then send back response indicating deletion
//We also check if there are no quotes to delete and respond with message saying so
app.delete('/quotes', (req, res) => {
    quotesCollection
      .deleteOne({ name: req.body.name })
      .then(result => {
        if (result.deletedCount === 0) {
        return res.json('No quote to delete')
        }
        // return 
        res.json(`Deleted Darth Vader's quote`)
      })
     
      .catch(error => console.error(error))
  })


 app.listen(4000, function () {
  console.log('listening on 4000')
   })
  } 
  finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);

































// MongoClient.connect(connectionString,  {
//     useUnifiedTopology: true
// },
    
    
//     (err, client) => {
//     if(err) return console.error(err)
//     console.log('Connected to database')


//   })

//   app.use(bodyParser.urlencoded({ extended: true }))

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
    
//   })
// app.post('/quotes', (req, res) => {
//     console.log('Hellooooooooooooooooo!')
//     console.log(req.body)
//   })

//  app.listen(4000, function () {
//   console.log('listening on 4000')
//    })
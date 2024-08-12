const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;

// middleware
app.use(express.json());
app.use(cors());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://moincse022:123@cluster0.sjvao.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (this is necessary for running database operations)
    // await client.connect();  
    // Send a ping to confirm a successful connection
// Start the Express server
const db= client.db("portfolio");
const collection = db.collection("blog");

app.post('/', async (req, res) => {
    const data = req.body;
    console.log(data);
    const result= await collection.insertOne(data);
    res.send(result);

    
})
app.get('/blog', async (req, res) => {
   const result= await collection.find({}).toArray();
    res.send(result);
})
 app.get('/blog/:id', async (req, res) =>{
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await collection.findOne(query);
    res.send(result);

 })
app.get('/', (req, res) => {
  res.send('Hello World!');
});


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    // Add your database operations here
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  await run();  // Connect to the database when the server starts
});

// Optionally, handle process termination to close the MongoDB connection cleanly
process.on('SIGINT', async () => {
//   await client.close();
  console.log('MongoDB client disconnected due to app termination');
  process.exit(0);
});

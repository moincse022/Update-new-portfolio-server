
// const express = require('express')
// const app = express()
// const cors = require('cors')
// const port = process.env.PORT || 3000;

// // middleware
// app.use(cors())
// app.use(express.json())


// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const uri = "mongodb+srv://moincse022:123@cluster0.sjvao.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//   const db= client.db('portfolio')
//   const collection = db.collection('blog')
//   // await client.connect();
    
    
//   app.get("/blog", async (req, res) => {
//     const result = await collection.find({}).toArray();
//     res.send(result);
//   });

//     // Connect the client to the server	(optional starting in v4.7)
    
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = 3000
;

// Middleware
app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://moincse022:123@cluster0.sjvao.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server
    // await client.connect();

    const db = client.db("portfolio");
    const collection = db.collection("blog"); // Initialize the collection

    // Ping MongoDB to confirm connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Routes should be defined inside the run function after collection is initialized

    // POST route to add a new blog
    app.post("/", async (req, res) => {
      try {
        const data = req.body;
        const result = await collection.insertOne(data);
        res.send(result);
      } catch (error) {
        console.error('Error adding blog:', error);
        res.status(500).send('Internal Server Error');
      }
    });

    // GET route to fetch all blogs
    app.get("/blog", async (req, res) => {
      try {
        const result = await collection.find({}).toArray();
        res.send(result);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).send('Internal Server Error');
      }
    });

    // GET route to fetch a specific blog by ID
    app.get("/blog/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await collection.findOne(query);
        res.send(result);
      } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).send('Internal Server Error');
      }
    });

    // Basic home route
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    // Start the Express server after routes are defined
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
    
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit the process with failure
  }
}

// Run the server
run();

// Optionally, handle process termination to close the MongoDB connection cleanly
// process.on("SIGINT", async () => {
// //   await client.close();
//   console.log("MongoDB client disconnected due to app termination");
//   process.exit(0);
// });

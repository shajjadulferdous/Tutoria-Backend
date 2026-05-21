const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})



const uri = process.env.MONGO_URI;

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
    
    await client.connect();
    const db = client.db('tutoria');
    const tutorCollection = db.collection('tutors');
    const BookingCollection = db.collection('bookings');

    app.get('/tutors' , async(req , res)=>{
         const ans = req.query.limit;
         const limit = Number(ans);
         const tutors = await tutorCollection.find().limit(limit).toArray();
         res.send(tutors);
    })

    app.get('/tutors/:id' , async(req , res)=>{
        const ans = req.params.id;
        const tutor = await tutorCollection.findOne(
          {_id:new ObjectId(ans)}
        )
        res.send(tutor);
    })

    app.post('/my-tutors', async(req , res)=>{
         const tutor = req.body;
         const add = await tutorCollection.insertOne(tutor);
         res.json(add);
    })

    app.get('/my-tutors/:id', async(req , res)=>{
         const {id} = req?.params;
         const result = await tutorCollection.find({
          addedBy:id
         }).toArray();
         res.send(result);
    })

    app.delete('/my-tutors/:id' , async(req , res)=>{
         const {id} = req?.params;
         const result = await tutorCollection.deleteOne({_id:new ObjectId(id)});
         res.send(result);
    })

    app.patch('/my-tutors/:id' , async(req , res)=>{
         const {id} = req?.params;
         const data = req?.body;
         const result = await tutorCollection.updateOne({
          _id:new ObjectId(id) },
          { $set:{
              ...data
           }}
         );
         res.send(result);
    })

    app.post('/my-session' , async(req , res)=>{
         const data = req?.body;
         const result = await BookingCollection.insertOne(
           data
         );
         res.json(result);
    })
    app.get('/my-session/:id' , async( req , res)=>{
        const id = req.params.id;
        const result = await BookingCollection.find(
          {userId:id}
        ).toArray();
        res.json(result);
    })
    app.patch('/my-session/:id' , async(req , res)=>{
          const id = req.params.id;
          const data = req.body;
          const result = await BookingCollection.updateOne({
             _id:new ObjectId(id)
          },
          {
            $set:{
               ...data
            }
          }
        )
        res.send(result)
    })
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
   
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
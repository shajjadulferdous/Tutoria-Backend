const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { jwtVerify, createRemoteJWKSet } = require('jose-cjs');
const app = express()
const port = process.env.PORT;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function validateToken(token) {
  try {
    const JWKS = createRemoteJWKSet(
      new URL('http://localhost:3000/api/auth/jwks')
    )
    const { payload } = await jwtVerify(token, JWKS)
    return payload;
  } catch (error) {
    console.error('Token validation failed:', error)
    return null;
  }
}

const JwtVerify = async(req , res , next)=>{
     const autheader = req?.headers?.authorization;
     if(!autheader){
         return res.status(404).json({
            message :'Unauthorize access'
         })
     }
     const token = autheader.split(" ")[1];
     if (!token) {
      return res.status(401).send({
        message: 'Token Missing',
      });
    }

     const answer = await validateToken(token)
     if(!answer){
        return res.status(403).send({
        message: 'Invalid Token',
        });
     }
     next();
}

async function run() {
  try {
    
    await client.connect();
    const db = client.db('tutoria');
    const tutorCollection = db.collection('tutors');
    const BookingCollection = db.collection('bookings');

    app.get('/tutors' ,  async(req , res)=>{
         const ans = req.query.limit;
         const limit = Number(ans);
         const tutors = await tutorCollection.find().limit(limit).toArray();
         res.send(tutors);
    })

    app.get('/tutors/:id'  ,JwtVerify, async(req , res)=>{
        const ans = req.params.id;
        const tutor = await tutorCollection.findOne(
          {_id:new ObjectId(ans)}
        );
        res.send(tutor);
    })

    app.post('/my-tutors', JwtVerify ,  async(req , res)=>{
         const tutor = req.body;
         const add = await tutorCollection.insertOne(tutor);
         res.json(add);
    })

    app.get('/my-tutors/:id', JwtVerify ,  async(req , res)=>{
         const {id} = req?.params;
         const result = await tutorCollection.find({
          addedBy:id
         }).toArray();
         res.send(result);
    })

    app.delete('/my-tutors/:id', JwtVerify , async(req , res)=>{
         const {id} = req?.params;
         const result = await tutorCollection.deleteOne({_id:new ObjectId(id)});
         res.send(result);
    })

    app.patch('/my-tutors/:id', JwtVerify , async(req , res)=>{
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

    app.post('/my-session', JwtVerify , async(req , res)=>{
         const data = req?.body;
         const bookingResult = await BookingCollection.insertOne(
           data
         );
         
         const tutorId = data.tutorId;

        const updateResult = await tutorCollection.updateOne(
          { _id: tutorId },
          {
            $inc: {
              totalSlot: -1,
            },
          }
        );
         res.json(bookingResult , updateResult);
    })

    app.get('/my-session/:id', JwtVerify , async( req , res)=>{
        const id = req.params.id;
        const result = await BookingCollection.find(
          {userId:id}
        ).toArray();
        res.json(result);
    })

    app.patch('/my-session/:id', JwtVerify , async(req , res)=>{
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
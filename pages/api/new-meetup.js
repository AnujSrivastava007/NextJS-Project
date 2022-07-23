// /api/new-meetup
// post /api/new-meetup
import { MongoClient } from "mongodb";
import { useRouter}from 'next/router';

async function handler(req, res) {
    
  if (req.method === "POST") {
    const data = req.body;

    // const { title, image, adress, description } = data;

    const client = await MongoClient.connect('mongodb+srv://Anuj:2RRhM2JXbupjD4Et@cluster0.mtrhp.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({message: 'Meetup Inserted!!'});

    
  }
}

export default handler;

// 2RRhM2JXbupjD4Et

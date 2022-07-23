import React from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import {MongoClient,ObjectId} from 'mongodb';


const MeetupmainDetail = (props) => {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
};

export async function getStaticPaths() {

  const client = await MongoClient.connect('mongodb+srv://Anuj:2RRhM2JXbupjD4Et@cluster0.mtrhp.mongodb.net/meetups?retryWrites=true&w=majority')
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find({},{_id:1}).toArray();

  return {
    fallback: false,
    paths: meetups.map( meetup => ({ params:{ meetupId: meetup._id.toString()}}))
    
    // [
    //   {
    //     params: {
    //       meetupId: "m1",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "m2",
    //     },
    //   },
    // ],
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup from db
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect('mongodb+srv://Anuj:2RRhM2JXbupjD4Et@cluster0.mtrhp.mongodb.net/meetups?retryWrites=true&w=majority')
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const selectedmeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)})
  client.close();
  console.log(selectedmeetup);
  return {
    props: {
      meetupData: {
        id: selectedmeetup._id.toString(),
        title: selectedmeetup.title,
        address: selectedmeetup.address,
        image: selectedmeetup.image,
        description: selectedmeetup.description
      }
    },
  };
}

export default MeetupmainDetail;

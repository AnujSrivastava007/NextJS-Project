import { useRouter } from "next/router";
import React from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";


const NewMeetupPage = () => {
  const router = useRouter();
  const addMeetupHandler = async (enteredmeetupdata) => {
    // console.log(data);
    const response = await fetch('/api/new-meetup',{
      method: 'POST',
      body: JSON.stringify(enteredmeetupdata),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json();
    console.log(data);

    // Redirecting
    router.push('/');
  };
  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetupPage;

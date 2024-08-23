import React from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/messageSkeleton";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  console.log("messages: ",messages);

  return (
    <div className="px-4 flex-1 overflow-auto">
         {!loading && messages.length>0 && messages.map((message, _id)=> <Message key={_id} message={message}/>
         )}

        {loading && [...Array(4)].map((_, idx)=> <MessageSkeleton key={idx}/>)}
        {!loading && messages.length===0 && (
            <p className="text-center">Send a Message to start the conversation</p>
        )}
    </div>
  )
};

export default Messages;

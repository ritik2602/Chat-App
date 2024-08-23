import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";

// const Message = ({ message }) => {
//   const { authUser } = useAuthContext();
//   const { selectedConversation } = useConversation();
//   const fromMe = message.senderId === authUser._id;
//   const chatClassName = fromMe ? "chat-end" : "chat-start";
//   console.log("fromeme:",fromMe,"  auth: ",authUser, "  conv", selectedConversation,"  chat:", chatClassName,"  messs",message)
//   const profilePic = fromMe
//     ? authUser?.profilePic
//     : selectedConversation?.profilePic;
//   const bubbleBg= fromMe? 'bg-blue-500' : '';
//   return (
//     <div className={`chat ${chatClassName}`}>
//       <div className="chat-image avatar">
//         <div className=" w-10 rounded-full">
//           <img
//           alt="Tailwind CSS chat bubble component"
//           src={profilePic}
//           />
//         </div>
//       </div>
//       <div className={`chat-bubble text-white ${bubbleBg}`}>{message.message}</div>
//       <div className="chat-footer opacity-50 text-xs flex items-center gap-1">{message.createdAt}</div>

//     </div>
//   )
// };

// export default Message;

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const {selectedConversation}=useConversation();
  if (!authUser || !message) return null; // Ensure authUser and message are available

  const fromMe = message.senderId === authUser._id;

  const chatClassName = fromMe ? "chat-end" : "chat-start";

  console.log("authUser ID:", authUser._id);
  console.log("Message sender ID:", message.senderId);
  console.log("fromMe:", fromMe);

  const profilePic = fromMe
    ? authUser?.profilePic
    : selectedConversation?.profilePic;
  const bubbleBg = fromMe ? "bg-blue-500" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBg}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex items-center gap-1">
        {message.createdAt}
      </div>
    </div>
  );
};

export default Message;
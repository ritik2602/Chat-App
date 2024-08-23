import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage=async (req, res)=>{
    try {
        const { message} = req.body;
        const {id: receiverId} = req.params;
        const senderId=req.user._id;
        
        let conversation = await Conversation.findOne({
            participants: { $all:[senderId, receiverId]},
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })
        
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        //SOCKET IO functionality will go here 


        //here both processes run one after another
        // await newMessage.save();
        // await conversation.save();

        //this will run both process in parallel
        await Promise.all([newMessage.save(), conversation.save()])
        res.status(201).json({newMessage});
    } catch (error) {
        console.log("Error in sendMessage controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.params.id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages"); // Populate the actual messages

        // If no conversation is found, return an empty array and stop further execution
        if (!conversation) {
            return res.status(200).json([]);
        }

        const messages = conversation.messages;
        return res.status(200).json(messages);

    } catch (error) {
        console.error("Error in getMessage controller:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

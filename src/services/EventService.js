const Event=require('../models/Event')

const generateCustomId = async () => {
    const eventCount = await Event.countDocuments();
    return eventCount + 1;
};


const createEvent=async(data)=>{
    const id=await generateCustomId();
     const event=new Event({...data,id:id});
     await event.save();
     return event;
}

const getAllEvent=async()=>{
    return await Event.find();
}

const getEventById=async(id)=>{
    return await Event.findOne({id:id});
}

const updateEvent=async(id,data)=>{
    return await Event.findOneAndUpdate({id:id},data,{new:true})
}

const deleteEvent=async(id)=>{
    return await Event.findOneAndDelete({id:id})
}


const registerForEvent=async(id,data)=>{
    const event=await Event.findOne({id:id});
    if(!event){
    throw new Error("Event not found")
    }
    event.participants.push(data);
    await event.save();
    return event;

}


module.exports={createEvent,getAllEvent,getEventById,updateEvent,deleteEvent,registerForEvent}
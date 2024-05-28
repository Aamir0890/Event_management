const EventService=require('../services/EventService')

const createEvent=async(req,res)=>{
    try {
        const event=await EventService.createEvent(req.body);
         res.status(200).json(event)
    } catch (error) {

        res.status(400).json({message:error.message})
    }
     
}

const getALLEvent=async(req,res)=>{
    try {
        const event=await EventService.getAllEvent();
        res.status(200).json(event)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
const getEventById=async(req,res)=>{
    try {
        const event=await EventService.getEventById(req.params.id);
      if(!event){
        res.status(404).json({message:"Event not found"})
      }
      res.status(200).json(event)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const updateEvent=async(req,res)=>{
    try {
          const event=await EventService.updateEvent(req.params.id,req.body);
          if(!event){
            res.status(404).json({message:"evnet not found"})
          }
          res.status(200).json(event)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const deleteEvent=async (req,res)=>{
    try {
        const event=await EventService.deleteEvent(req.params.id);
        if(!event){
            res.status(404).json({message:"event not found"})
        }
        res.status(200).json({message:"Event deleted successfully"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}


const registerEvent=async(req,res)=>{
    try {
        const event=await EventService.registerForEvent(req.params.id,req.user);
        console.log(event)
        res.status(200).json({message:"Successfully registered for the event "})
    } catch (error) {
        if (error.message === 'Event not found' || error.message === 'User not found') {
      return res.status(404).json({ message: error.message });
    } else if (error.message === 'User already registered for this event') {
      return res.status(400).json({ message: error.message });
    } else {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server error' });
    }
    }
}


module.exports={createEvent,updateEvent,getEventById,getALLEvent,deleteEvent,registerEvent}
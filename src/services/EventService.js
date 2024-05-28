const Event=require('../models/Event')
const nodemailer=require("nodemailer")
require('dotenv').config();
const User=require('../models/User')

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

const transporter = nodemailer.createTransport({
    service:'gmail',
    host: `${process.env.MAIL_SERVICE}`,
    port: 587,
    auth: {
        user: `${process.env.USER}`,
        pass: `${process.env.PASSWORD}`
    }
});


const registerForEvent=async(id,data)=>{
    try {
        const event=await Event.findOne({id:id});
   
    if(!event){
    throw new Error("Event not found")
    }
    const user = await User.findOne({ id: data.id });
     if (!user) {
      throw new Error('User not found');
    }

    if (event.participants.includes(data.id)) {
        throw new Error('User already registered for this event');
      }
    
     
    event.participants.push(id);
    console.log(user.email)
    await event.save();
    const mailOptions = {
        from: process.env.USER,
        to: user.email,
        subject: 'Event Registration Confirmation',
        text: `Hello ${user.name},\n\nYou have successfully registered for the event: ${event.description}.\n\nEvent Details:\nDate: ${event.date}\nTime: ${event.time}\n\nThank you for registering!`,
      };
      
      await transporter.sendMail(mailOptions);
      return { message: 'User registered for event and confirmation email sent' };

    } catch (error) {
        throw new Error(error.message)
    }

}


module.exports={createEvent,getAllEvent,getEventById,updateEvent,deleteEvent,registerForEvent}
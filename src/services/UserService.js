const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');


require('dotenv').config();
const generateCustomId = async () => {
    const userCount = await User.countDocuments();
   
    return userCount + 1;
};


const createUser=async(userData)=>{
   const existingUser=await User.findOne({email:userData.email});

   if(existingUser){
    throw new Error("User Already exist")
   }
   const customId = await generateCustomId();
    const user=new User({...userData,id:customId});
    user.password=bcrypt.hashSync(userData.password,10);
    await user.save();
    return user;
}

const getAllUser=async()=>{
    return User.find();
}

const getUserbyId=async(id)=>{
  
    return await User.findOne({id:id});
}
  
const updateUser=async(id,data)=>{
   if(data.password){

    data.password=bcrypt.hashSync(data.password,10);
   }
   return await User.findOneAndUpdate({id:id},data,{new:true})
}


const deleteUser=async(id)=>{
    return await User.findOneAndDelete({id:id})
}

const logInUser=async(email,password)=>{
     try {
        const existingUser=await User.findOne({email:email});
         if(existingUser){
              const isPasswordMatch=bcrypt.compareSync(password,existingUser.password);
             
              if(isPasswordMatch===true){
                     const token=jwt.sign({id:existingUser},process.env.SECRET_KEY, { expiresIn: '1h' })
                          
                           return token;
              }else{
                throw new Error('Invalid Password');
              }
         }else{
                throw new Error('Invalid login credentials');
         }
     } catch (error) {
        throw new Error('Invalid Password');
     }
}



module.exports={createUser,getAllUser,getUserbyId,updateUser,deleteUser,logInUser}

const userService=require('../services/UserService')
const User=require('../models/User')
const z=require('zod');

const requestBodySchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z
      .string()
      .min(4, 'Password must be at least 8 characters long')
      .max(100, 'Password must be at most 100 characters long')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()])[A-Za-z\d@$!%*?&()]+$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      }),
    name: z
      .string()
      .min(3, 'Username must be at least 3 characters long')
      .max(20, 'Username must be at most 20 characters long'),

      role: z.enum(['admin', 'user']),

  });


const createUser=async(req,res)=>{
    try {
        const validatedData = requestBodySchema.parse(req.body);

        const body=await userService.createUser(req.body);

        res.status(200).json("User created Successfully")
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Handle validation errors
            res.status(400).json({ errors: error.issues });
          }
        res.status(400).json({message:error.message})
    }
}

const getAllUser=async(req,res)=>{
    try {
        const body=await userService.getAllUser();
        res.status(200).json(body)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const getUserbyId=async(req,res)=>{
    try {
        console.log(req.params.id)
        const body=await userService.getUserbyId(req.params.id);
        if(!body){
            res.status(404).json({message:"User not found"})
        }
        res.status(200).json(body);
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
const verifYEmail= z.object({email:z.string().email('Invalid email format')});
const pass=z.object({password:z
    .string()
    .min(4, 'Password must be at least 8 characters long')
    .max(100, 'Password must be at most 100 characters long')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()])[A-Za-z\d@$!%*?&()]+$/, {
      message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    })})
  
const updateUser=async(req,res)=>{
    try {
        if(req.body.email){
            const verifyEmail = verifYEmail.parse(req.body.email);
        }
        if(req.body.password){
            const password = pass.parse(req.body.password);
        }
          const body=await userService.updateUser(req.params.id,req.body);
          if(!body){
            res.status(404).json({message:"User not found"})
          }
          res.status(200).json({message:body})
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Handle validation errors
            res.status(400).json({ errors: error.issues });
          }

        res.status(400).json({ message: error.message });
    }
}

const deleteUser=async(req,res)=>{
    try {
        const data=await userService.deleteUser(req.params.id);
        if(!data){
            res.status(404).json({message:"user not found"})
        }
        res.status(200).json({message:"User deleted successfully"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const LogIn = z.object({
    email: z.string().email('Invalid email format'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .max(100, 'Password must be at most 100 characters long')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()])[A-Za-z\d@$!%*?&()]+$/, {
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        })
    })
    
const logInUser=async(req,res)=>{
    try {
        const valid=LogIn.parse(req.body)
        const {email,password}=req.body;
        const token=await userService.logInUser(email,password);
        res.status(200).json({token:token})
    } catch (error) {
        if (error instanceof z.ZodError) {
           
            res.status(400).json({ errors: error.issues });
          }
          res.status(400).json({message:error.message})
    }
}

module.exports={createUser,getAllUser,getUserbyId,updateUser,deleteUser,logInUser};

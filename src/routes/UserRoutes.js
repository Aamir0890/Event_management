const express=require('express');
const UserController=require('../controllers/UserController')
const {authMiddleware,AdminAuth}=require('../middleware/Auth')

const router=express.Router();

router.post('/register',UserController.createUser);
router.get('/users',authMiddleware,AdminAuth,UserController.getAllUser)
router.get('/user/:id',authMiddleware,AdminAuth,UserController.getUserbyId)
router.put('/user/:id',authMiddleware,UserController.updateUser)
router.delete('/delete/:id',authMiddleware,UserController.deleteUser)
router.post('/login',UserController.logInUser);


module.exports=router
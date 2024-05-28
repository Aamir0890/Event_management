
const express=require('express')
const EventController=require('../controllers/EventController')
const {authMiddleware,AdminAuth}=require('../middleware/Auth')
const router=express.Router();

router.use(authMiddleware)
router.get('/events',EventController.getALLEvent)
router.get('/event/:id',EventController.getEventById)
router.post('/event/:id/register',EventController.registerEvent)
router.use(AdminAuth)
router.post('/events',EventController.createEvent)
router.put('/event/:id',EventController.updateEvent)
router.delete('/event/:id',EventController.deleteEvent)

module.exports=router




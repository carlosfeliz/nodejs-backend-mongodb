import {Router} from 'express';
import {createUser, deleteUser, getUsers, updateUser, getUser} from '../controllers/user.controller'


const router: Router = Router();
router.post('/user', createUser)
router.get('/user', getUsers)
router.put('/user/:_id', updateUser)
router.delete('/user/:_id', deleteUser)
router.get('/user/:_id', getUser)

router.get('/', (req, res) => {
    res.send("Response OK");
})


export default router;
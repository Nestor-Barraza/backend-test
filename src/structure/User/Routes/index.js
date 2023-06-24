import { Router } from 'express'
const router = Router();

import { signUp, signIn } from 'structure/User/Application'

//Sign Up
router.post('/sign-up', signUp);

//Sign In
router.post('/sign-in', signIn);



module.exports = router;
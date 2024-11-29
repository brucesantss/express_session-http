import { Router } from "express";
import { cadastro, dashboard, login, logout } from '../controllers/userController';

const router = Router();

router
    .post('/cadastro', cadastro)
    .post('/login', login)
    .post('/logout', logout)
    .get('/dashboard', dashboard)

export default router;
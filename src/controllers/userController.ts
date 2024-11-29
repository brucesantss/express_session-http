import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const cadastro = async (req: Request, res: Response) => {

    try {

        const { nome, email, senha } = req.body;

        // um ou + campos vazios
        if(!nome || !email || !senha){
            res.status(400).json({ message: 'todos os campos são obrigatório.' })
            return;
        }

        // conta já existente
        const existenteConta = await prisma.usuario.findFirst({ where: {email} });
        if(existenteConta){
            res.status(400).json({ message: 'conta já existente. faça login!' })
            return;
        }

        const novaConta = await prisma.usuario.create({
            data: {
                nome,
                email,
                senha
            }
        });

        if(!novaConta){
            res.status(400).json({ message: 'não foi possível criar uma conta.' })
            return;
        }
        
        console.log(novaConta);
        res.status(201).json({ message: `conta criada, faça login!.` })
    

    } catch (err) {
        res.status(500).json({ message: 'erro no servidor :(' });
        console.log('erro: ', err);
    }

}

export const login = async (req: Request, res: Response) => {

    const { email, senha } = req.body;

    // um ou + campos vazios
    if(!email || !senha){
        res.status(400).json({ message: 'todos os campos são obrigatório.' })
        return;
    }

    // conta já existente
    const existenteConta = await prisma.usuario.findFirst({ where: {email} });
    if(!existenteConta){
        res.status(400).json({ message: 'conta não encontrada. criar conta?' })
        return;
    }

    if(existenteConta.senha != senha){
        res.status(400).json({ message: 'senha incorreta. esqueceu a senha?' })
        return;
    }

    // armazenar nome
    const nomeConta = existenteConta.nome;
    req.session.user = { nome: nomeConta };
    res.status(200).json({ message: `bem-vindo, ${nomeConta}` });
    
};

export const dashboard = (req: Request, res: Response) => {
    if (!req.session.user) {
        res.status(401).json({ message: "dashboard sem acesso: faça login." });
    }

    console.log('acessou o dashboard, ', req.session);
    res.status(200).json({ message: 'Dashboard de compras.' });
};


export const logout = (req: Request, res: Response) => {

    if (!req.session.user) {
        res.status(400).json({ message: 'você já está desconectado. fazer login?' })
    }

    const username = req.session.user.nome;

    req.session.destroy(err => {
        if (err) {
            console.log('erro ao sair da conta.', err);
            res.status(500).json({ message: 'erro ao sair da conta, tente novamente.' })
        }
    });

    res.clearCookie('connect.sid');
    res.status(200).json({ message: `${username} saiu da conta.` });
};

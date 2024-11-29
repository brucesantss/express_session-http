import { Request, Response } from "express";

export const cadastro = (req: Request, res: Response) => {

    try {
        
        res.status(201).json({ message: 'cadastro ainda não está pronto.' })

    } catch (err) {
        res.status(500).json({ message: 'erro no servidor :(' });
        console.log('erro: ', err);
    }

}

export const login = (req: Request, res: Response) => {

    const { username } = req.body;

    if (!username) {
        res.status(400).json({ message: "username é obrigatório." });
        console.log('o username não foi digitado.');
        return;
    }

    req.session.user = { username };

    console.log(req.sessionID);
    res.status(200).json({ message: `bem-vindo, ${username}.` });
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

    const username = req.session.user.username;

    req.session.destroy(err => {
        if (err) {
            console.log('erro ao sair da conta.', err);
            res.status(500).json({ message: 'erro ao sair da conta, tente novamente.' })
        }
    });

    res.clearCookie('connect.sid');
    res.status(200).json({ message: `${username} saiu da conta.` });
};

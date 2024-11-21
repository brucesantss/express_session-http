import session from 'express-session';

export const sessionConfig = session({
    secret: 'sapocururunabeiradorio',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 60000
    }
})
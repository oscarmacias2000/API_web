const jwt = require('jsonwebtoken');
const prisma  = require('../config/database').default

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({error: 'Accesp denegadp, token no proporcionado'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        //buscar sesion activa
        const session = await prisma.session.findFirst({
            where: {
                token: token,
                expiresAt: {
                    gt: new Date()
                },
                include: {
                    user: true
                }
            }
        });

        if (!session) {
            return res.status(401).json({error: 'Sesión inválida o expirada'});
        }
        res.user
        req.token = token;
        next();
    } catch (err) {
        console.error('Error en auth middleware:', err);
        return res.status(401).json({error: 'Token inválido'});
    }
};

module.exports = authMiddleware;
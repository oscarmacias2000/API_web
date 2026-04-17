const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { register, login, logout, getCurrentUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');


// Validaciones

router.post('/register', [
    body('email').isEmail().withMessage('Email invalido'),
    body('password').isLength({min: 6}).withMessage('La contrase;a debe tener al menos 6 caracteres'),
    body('name').optional().notEmpty().withMessage('El nombre no puede estar vacio')
], register);

router.post('/login', [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('La contraseña es requerida')
], login);  // ← NO poner login()

// Ruta de prueba (opcional)
router.get('/test', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
});


router.get('/test', (req, res) => {
  res.json({ message: 'Backend funcionando' });
});
module.exports = router;
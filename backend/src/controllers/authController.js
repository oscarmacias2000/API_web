const { prisma } = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  console.log('=== REGISTRO - Iniciando ===');
  console.log('Body recibido:', JSON.stringify(req.body, null, 2));
  console.log('Headers:', req.headers);
  
  try {
    const { email, password, name } = req.body;
    
    // Validaciones
    if (!email || !password) {
      console.log('❌ Email o password faltante');
      return res.status(400).json({ 
        success: false,
        error: 'Email y contraseña son requeridos' 
      });
    }
    
    console.log('✅ Validación pasada');
    console.log('Buscando usuario existente...');
    
    // Verificar si ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      console.log('❌ Usuario ya existe:', email);
      return res.status(400).json({ 
        success: false,
        error: 'El email ya está registrado' 
      });
    }
    
    console.log('✅ Usuario no existe, procediendo a crear...');
    
    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('✅ Contraseña encriptada');
    
    console.log('Creando usuario en la base de datos...');
    console.log('Datos a guardar:', {email, name: name || null });
    // Crear usuario
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
      }
    });
    
    console.log('✅ Usuario creado exitosamente:', { id: user.id, email: user.email });
    
    // Generar token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'secreto-temporal',
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
    
  } catch (error) {
    console.error('❌ Error en registro:', error);
    console.error('Stack:', error.stack);
    res.status(500).json({ 
      success: false,
      error: 'Error interno del servidor',
      details: error.message 
    });
  }
};

// Agrega la función login si no la tienes
const login = async (req, res) => {
  console.log('=== LOGIN - Iniciando ===');
  console.log('Body recibido:', req.body);
  try {
    const { email, password } = req.body;
     
    if(!email || !password){
       console.log('❌ Email o password faltante');
      return res.status(400).json({ 
        error: 'Email y contraseña son requeridos' 
      });
    }
    
    console.log('🔍 Buscando usuario:', email);

    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      console.log('❌ Usuario no encontrado:', email);
      return res.status(401).json({ error: 'Credenciales inválidas', error: 'Credenciales inválidas - Usuario no existe'  });
      
    }

    console.log('Usuario encontrado', user.id)
    console.log('Verificando contrae;a...')
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'secreto-temporal',
      { expiresIn: '7d' }
    );
    
    console.log('✅ Login exitoso para:', email);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
};

// ✅ Exportación correcta
module.exports = { register, login };
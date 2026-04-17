const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function test() {
  try {
    console.log('🔍 Probando Prisma...');
    
    // Verificar conexión
    await prisma.$connect();
    console.log('✅ Conectado a la base de datos');
    
    // Listar usuarios existentes
    const users = await prisma.user.findMany();
    console.log(`📋 Usuarios en BD: ${users.length}`);
    console.log(users);
    
    // Crear usuario de prueba
    const hashedPassword = await bcrypt.hash('123456', 10);
    const newUser = await prisma.user.create({
      data: {
        email: `test${Date.now()}@test.com`,
        password: hashedPassword,
        name: 'Usuario Prueba'
      }
    });
    console.log('✅ Usuario creado:', newUser);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

test();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';   // ← NUEVO

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Helmet → Cabeceras de seguridad
  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" }
  }));

  // 2. CORS ultra estricto
  app.enableCors({
    origin: [
      'https://rently-backend-production-a4c6.up.railway.app',
      'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  });

  // 3. 🔥 GLOBAL VALIDATION PIPE (la nueva capa de seguridad)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // elimina propiedades que no están en el DTO
      forbidNonWhitelisted: true, // rechaza si mandan propiedades extras
      transform: true,           // convierte automáticamente strings a números, booleanos, etc.
      transformOptions: { enableImplicitConversion: true },
    })
  );

  await app.listen(process.env.PORT || 3000);
  console.log(`🚀 HABITTAT corriendo SUPER SEGURO en puerto ${process.env.PORT || 3000}`);
}
bootstrap();


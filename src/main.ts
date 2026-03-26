import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Helmet → Cabeceras de seguridad automáticas
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

  // 3. Rate Limiting activado (100 peticiones cada 60 segundos por IP)
  // Ya está configurado en app.module.ts, solo lo activamos aquí
  // app.useGlobalGuards(new ThrottlerGuard());   ← se activa automáticamente

  await app.listen(process.env.PORT || 3000);
  console.log(`🚀 HABITTAT corriendo seguro en puerto ${process.env.PORT || 3000}`);
}
bootstrap();
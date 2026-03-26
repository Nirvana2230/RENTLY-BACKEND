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

  // 2. CORS ultra estricto (solo permitimos tu frontend)
  app.enableCors({
    origin: [
      'https://rently-backend-production-a4c6.up.railway.app',
      'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  });

  // 3. Rate Limiting (lo configuraremos correctamente en el siguiente paso)
  // Por ahora lo dejamos comentado para que no dé error
  // app.useGlobalGuards(new ThrottlerGuard({ ttl: 60, limit: 100 }));

  await app.listen(process.env.PORT || 3000);
  console.log(`🚀 HABITTAT corriendo en puerto ${process.env.PORT || 3000}`);
}
bootstrap();
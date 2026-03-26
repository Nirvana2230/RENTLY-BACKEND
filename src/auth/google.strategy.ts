import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      
      // 🔥 Este es el que más importa (copia y pega tal cual)
      callbackURL: 'https://rently-backend-production-a4c6.up.railway.app/auth/google/callback',
      
      scope: ['email', 'profile'],
      accessType: 'offline',      // ← agregado (buena práctica)
      prompt: 'select_account',   // ← agregado (evita cacheos raros)
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return {
      googleId: profile.id,
      email: profile.emails?.[0]?.value,
      name: profile.displayName,
      // puedes agregar más campos después
    };
  }
}


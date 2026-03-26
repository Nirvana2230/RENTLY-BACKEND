import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(userFromGoogle: any) {
    const email = userFromGoogle.email;

    // 1. Buscar o crear usuario
    let user = await this.userRepository.findOneBy({ email });

    if (!user) {
      console.log('🆕 Usuario nuevo detectado. Guardando en la Base de Datos...');
      
      const newUser = this.userRepository.create({
        email: email,
        firstName: userFromGoogle.firstName || userFromGoogle.name,
        lastName: userFromGoogle.lastName || 'No especificado',
        picture: userFromGoogle.picture,
        googleId: userFromGoogle.googleId,
        role: 'user', 
      });
      
      user = await this.userRepository.save(newUser);
    } else {
      console.log('✅ Usuario existente. Iniciando sesión...');
    }

    // 2. 🔥 GENERAR TOKEN SEGURO (15 minutos de duración)
    const payload = { 
      email: user.email, 
      sub: user.id, 
      role: user.role 
    };

    return {
      message: 'Login exitoso',
      user: user,
      access_token: this.jwtService.sign(payload, {
        expiresIn: '15m',                    // ← Token expira en 15 minutos
      }),
    };
  }
}


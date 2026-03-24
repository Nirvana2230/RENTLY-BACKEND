import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity'; // Importamos la entidad

@Injectable()
export class AuthService {
  constructor(
    // Inyectamos el repositorio (es la herramienta para leer/escribir en la DB)
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(userFromGoogle: any) {
    const email = userFromGoogle.email;

    // 1. BUSCAR: ¿Ya existe este usuario en mi base de datos?
    let user = await this.userRepository.findOneBy({ email });

    // 2. SI NO EXISTE: Lo creamos y guardamos
    if (!user) {
      console.log('Usuario nuevo detectado. Guardando en la Base de Datos...');
      
      const newUser = this.userRepository.create({
        email: email,
        firstName: userFromGoogle.firstName || userFromGoogle.name,
        lastName: userFromGoogle.lastName || 'No especificado',
        picture: userFromGoogle.picture,
        googleId: userFromGoogle.googleId,
        role: 'user', 
      });
      
      // Aquí ocurre la magia de guardar 👇
      user = await this.userRepository.save(newUser);
    } else {
      console.log('El usuario ya existe. Iniciando sesión...');
    }

    // 3. GENERAR EL TOKEN (Esto ya lo tenías, pero ahora usa el ID real de la base de datos)
    const payload = { email: user.email, sub: user.id, role: user.role };
    
    return {
      message: 'Login exitoso',
      user: user,
      access_token: this.jwtService.sign(payload),
    };
  }
}

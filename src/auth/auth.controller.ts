import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import type { Response } from 'express'; // Importamos el tipo para evitar errores de TS

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    // Este método inicia el flujo con Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req, @Res() res: Response) {
    // 1. Llamamos al servicio para que busque/cree al usuario y nos dé sus datos
    const data = await this.authService.login(req.user);
    
    // 2. Extraemos los datos necesarios
    const token = data.access_token;
    const name = data.user.firstName;
    const id = data.user.id; // <--- Este es el ID que necesitamos para las propiedades

    // 3. Redirigimos al Frontend (index.html) pasando los 3 datos en la URL
    // Usamos comillas invertidas `` para poder usar ${}
    res.redirect(`http://localhost:3000?token=${token}&name=${name}&id=${id}`);
  }
}
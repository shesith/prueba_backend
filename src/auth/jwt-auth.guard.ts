import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// JwtAuthGuard es un guardia de autenticación que utiliza JWT para proteger rutas
// Extiende de AuthGuard para usar la estrategia 'jwt' definida en JwtStrategy
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

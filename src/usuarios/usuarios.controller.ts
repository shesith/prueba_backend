import {
  Controller,
  Get,
  UseGuards,
  Request,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UsuariosService } from './usuarios.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('usuarios')
@ApiBearerAuth()
// UsuariosController maneja las rutas relacionadas con los usuarios
// Incluye operaciones CRUD y consultas específicas como paginación de usuarios
@Controller('usuarios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}
  @ApiOperation({ summary: 'Obtener perfil del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil del usuario.' })
  // Método para obtener el perfil del usuario autenticado
  @Get('perfil')
  getPerfil(@Request() req) {
    return req.user;
  }
  @ApiOperation({
    summary: 'Obtener lista paginada de usuarios',
    description: 'Solo ADMIN puede ver la lista completa.',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Lista paginada de usuarios.' })
  // Método para buscar un usuario por email
  @Get()
  @Roles('ADMIN')
  async findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    const result = await this.usuariosService.findAllPaginated(page, pageSize);
    // Se elimina la contraseña de cada usuario antes de retornar
    return {
      ...result,
      data: result.data.map(({ password, ...rest }) => rest),
    };
  }
  @Delete(':id')
  async deleteUser(@Request() req, @Param('id') id: number) {
    return this.usuariosService.deleteUser(req.user, +id);
  }
}

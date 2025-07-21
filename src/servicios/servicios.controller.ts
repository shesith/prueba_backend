import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { ServiciosService } from './servicios.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { BuscarServiciosDto } from './dto/buscar-servicios.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('servicios')
@ApiBearerAuth()
// ServiciosController maneja las rutas relacionadas con los servicios
// Incluye operaciones CRUD y consultas específicas como búsqueda por fecha, rango de fechas, etc.
@Controller('servicios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  // Método para crear un nuevo servicio
  @ApiOperation({
    summary: 'Crear un nuevo servicio médico',
    description: 'Solo ADMIN puede crear servicios.',
  })
  @ApiResponse({ status: 201, description: 'Servicio creado exitosamente.' })
  @Post()
  @Roles('ADMIN')
  create(@Body() createServicioDto: CreateServicioDto) {
    return this.serviciosService.create(createServicioDto);
  }

  // Método para actualizar un servicio existente
  @Patch(':id')
  @Roles('ADMIN')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateServicioDto: UpdateServicioDto,
  ) {
    return this.serviciosService.update(id, updateServicioDto);
  }

  // Método para eliminar un servicio (marcar como eliminado)
  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.serviciosService.delete(id);
  }

  // Métodos para obtener servicios
  @ApiOperation({
    summary: 'Obtener servicios paginados',
    description: 'Disponible para cualquier usuario autenticado.',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Lista paginada de servicios.' })
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.serviciosService.findAllPaginated(page, pageSize);
  }

  @ApiOperation({
    summary: 'Buscar servicios por mes',
    description: 'Filtra servicios por año y mes.',
  })
  @ApiQuery({ name: 'anio', required: true, type: String })
  @ApiQuery({ name: 'mes', required: true, type: String })
  // Métodos para buscar servicios por diferentes criterios
  @Get('mes')
  findByMonth(@Query('anio') anio: string, @Query('mes') mes: string) {
    return this.serviciosService.findByMonth(parseInt(anio), parseInt(mes));
  }

  @ApiOperation({
    summary: 'Buscar servicios por día',
    description: 'Filtra servicios por fecha específica.',
  })
  @ApiQuery({ name: 'fecha', required: true, type: String })
  @Get('dia')
  findByDay(@Query('fecha') fecha: string) {
    return this.serviciosService.findByDay(fecha);
  }

  @ApiOperation({
    summary: 'Buscar servicios por rango de fechas',
    description: 'Filtra servicios entre dos fechas.',
  })
  @ApiQuery({ name: 'desde', required: true, type: String })
  @ApiQuery({ name: 'hasta', required: true, type: String })
  @Get('rango-fechas')
  findByDateRange(@Query() rango: BuscarServiciosDto) {
    return this.serviciosService.findByDateRange(rango.desde, rango.hasta);
  }

  // Método para obtener un servicio por ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.serviciosService.findOne(id);
  }
}

import { SimpleWorkforceDTO } from './../dto/simple-workforce.dto';
import { Workforce } from './../entities/workforce.entity';
import { WorkforceDTO } from './../dto/workforce.dto';
import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards, BadRequestException } from '@nestjs/common';
import { WorkforcesService } from '../services/workforces.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Roles } from '@core/decorators/roles.decorator';
import { EUserRoles } from '@modules/users/enums/user-roles.enum';
import { JwtAuthGuard } from '@core/guards/jwt-auth.guard';
import { RolesGuard } from '@core/guards/roles.guard';
import { CreateWorkforceDTO } from '../dto/create-workforce.dto';
import { UpdateWorkforceDTO } from '../dto/update-workforce.dto';
import { validate } from 'class-validator';

@Controller('workforces')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiTags('workforces')
@ApiBearerAuth()
export class WorkforcesController {
  constructor(private readonly workforcesService: WorkforcesService) {}

  @Get()
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: WorkforceDTO,
    isArray: true
  })
  async findAll(): Promise<WorkforceDTO[]> {
    const workforces: Workforce[] = await this.workforcesService.findAll();
    return plainToClass(WorkforceDTO,workforces);
  }
  
  @Get(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: WorkforceDTO,
  })
  async findOne(@Param('id') id: number ): Promise<WorkforceDTO> {
    const workforce: Workforce = await this.workforcesService.findOneById(id);
    return plainToClass(WorkforceDTO,workforce);
  }

  @Post()
  @Roles(EUserRoles.ADMIN)
  @ApiResponse({
    status: 201,
    type: SimpleWorkforceDTO,
  })
  async create(@Body() createWorkforceDto: CreateWorkforceDTO): Promise<SimpleWorkforceDTO>  {
    createWorkforceDto = new CreateWorkforceDTO(createWorkforceDto);
    const errors = await validate(createWorkforceDto);
    if (errors.length) throw new BadRequestException;

    const createdWorkforce: Workforce = await this.workforcesService.create(createWorkforceDto);
    return plainToClass(SimpleWorkforceDTO,createdWorkforce);
  }

  @Patch(':id')
  @Roles(EUserRoles.ADMIN)
  @ApiResponse({
    status: 200,
    type: SimpleWorkforceDTO,
  })
  async update(@Param('id') id: number, @Body() updateWorkforceDTO: UpdateWorkforceDTO): Promise<SimpleWorkforceDTO> {
    updateWorkforceDTO = new UpdateWorkforceDTO(updateWorkforceDTO);
    const errors = await validate(updateWorkforceDTO);
    if (errors.length) throw new BadRequestException;
    
    const workforce: Workforce | undefined = await this.workforcesService.findOneById(id);
    if (workforce == undefined) throw new NotFoundException;
    updateWorkforceDTO.updatedAt = new Date();
    const updatedWorkforce: Workforce = await this.workforcesService.update(id, updateWorkforceDTO);
    updatedWorkforce.id = id;
    return plainToClass(SimpleWorkforceDTO,updatedWorkforce);
  }

  @Delete(':id')
  @Roles(EUserRoles.ADMIN)
  async remove(@Param('id') id: number) {
    const workforce: Workforce | undefined = await this.workforcesService.findOneById(id);
    if (workforce == undefined) throw new NotFoundException;
    await this.workforcesService.remove(+id);
    return [];
  }
}

import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Roles } from '@core/decorators/roles.decorator';
import { EUserRoles } from '@modules/users/enums/user-roles.enum';
import { JwtAuthGuard } from '@core/guards/jwt-auth.guard';
import { RolesGuard } from '@core/guards/roles.guard';
import { validate } from 'class-validator';
import { CreateWorkforceWorksheetDTO } from '../dto/create-workforce-worksheet.dto';
import { SimpleWorkforceWorksheetDTO } from '../dto/simple-workforce-worksheet.dto';
import { UpdateWorkforceWorksheetDTO } from '../dto/update-workforce-worksheet.dto';
import { WorkforceWorksheetDTO } from '../dto/workforce-worksheet.dto';
import { WorkforceWorksheet } from '../entities/workforce-worksheet.entity';
import { WorkforceWorksheetsService } from '../services/workforce-worksheets.service';
import { WorksheetsService } from '@modules/worksheets/worksheets/services/worksheets.service';
import { WorkforcesService } from '@modules/workforces/services/workforces.service';
import { Worksheet } from '@modules/worksheets/worksheets/entities/worksheet.entity';
import { Workforce } from '@modules/workforces/entities/workforce.entity';

@Controller('workforce-worksheets')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiTags('workforce-worksheets')
@ApiBearerAuth()
export class WorkforceWorksheetsController {
  constructor(
    private readonly workforceWorksheetsService: WorkforceWorksheetsService,
    private readonly workforceService: WorkforcesService,
    private readonly worksheetService: WorksheetsService,
  ) { }

  @Get()
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: WorkforceWorksheetDTO,
    isArray: true
  })
  async findAll(): Promise<WorkforceWorksheetDTO[]> {
    const worksheets: WorkforceWorksheet[] = await this.workforceWorksheetsService.findAll();
    return plainToClass(WorkforceWorksheetDTO, worksheets);
  }

  @Get(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: WorkforceWorksheetDTO,
  })
  async findOne(@Param('id') id: number): Promise<WorkforceWorksheetDTO> {
    const worksheet: WorkforceWorksheet = await this.workforceWorksheetsService.findOneById(id);
    return plainToClass(WorkforceWorksheetDTO, worksheet);
  }

  @Post()
  @Roles(EUserRoles.ADMIN)
  @ApiResponse({
    status: 201,
    type: SimpleWorkforceWorksheetDTO,
  })
  async create(@Body() createWfWsDto: CreateWorkforceWorksheetDTO): Promise<SimpleWorkforceWorksheetDTO> {
    createWfWsDto = new CreateWorkforceWorksheetDTO(createWfWsDto);
    const errors = await validate(createWfWsDto);
    if (errors.length) throw new BadRequestException;

    await this.checkFK(createWfWsDto);

    const createdWorkforceWorksheet: WorkforceWorksheet = await this.workforceWorksheetsService.create(createWfWsDto);
    return plainToClass(SimpleWorkforceWorksheetDTO, createdWorkforceWorksheet);
  }

  @Patch(':id')
  @Roles(EUserRoles.ADMIN)
  @ApiResponse({
    status: 200,
    type: SimpleWorkforceWorksheetDTO,
  })
  async update(@Param('id') id: number, @Body() updateWfWsDTO: UpdateWorkforceWorksheetDTO): Promise<SimpleWorkforceWorksheetDTO> {
    updateWfWsDTO = new UpdateWorkforceWorksheetDTO(updateWfWsDTO);
    const errors = await validate(updateWfWsDTO);
    if (errors.length) throw new BadRequestException;

    await this.checkFK(updateWfWsDTO);

    const workforceWorksheet: WorkforceWorksheet | undefined = await this.workforceWorksheetsService.findOneById(id);
    if (workforceWorksheet == undefined) throw new NotFoundException;
    updateWfWsDTO.updatedAt = new Date();
    const updatedWorkforceWorksheet: WorkforceWorksheet = await this.workforceWorksheetsService.update(id, updateWfWsDTO);
    updatedWorkforceWorksheet.id = id;
    return plainToClass(SimpleWorkforceWorksheetDTO, updatedWorkforceWorksheet);
  }

  @Delete(':id')
  @Roles(EUserRoles.ADMIN)
  async remove(@Param('id') id: number) {
    const worksheet: WorkforceWorksheet | undefined = await this.workforceWorksheetsService.findOneById(id);
    if (worksheet == undefined) throw new NotFoundException;
    await this.workforceWorksheetsService.remove(+id);
    return [];
  }

  async checkFK(createWfWsDto: CreateWorkforceWorksheetDTO | UpdateWorkforceWorksheetDTO): Promise<void> {
    const worksheet: Worksheet = await this.worksheetService.findOneById(createWfWsDto.worksheetId);
    if (!worksheet) throw new HttpException(`There is no worksheet with id: ${createWfWsDto.worksheetId}`, HttpStatus.BAD_REQUEST);
    createWfWsDto.worksheet = worksheet;
    delete createWfWsDto.worksheetId;

    const workforce: Workforce = await this.workforceService.findOneById(createWfWsDto.workforceId);
    if (!workforce) throw new HttpException(`There is no workforce with id: ${createWfWsDto.workforceId}`, HttpStatus.BAD_REQUEST);
    createWfWsDto.workforce = workforce;
    delete createWfWsDto.workforceId;
  }
}

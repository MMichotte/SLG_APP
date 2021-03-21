import { AddressesService } from '../../adresses/services/addresses.service';
import { UpdatePersonDTO } from '../dto/update-person.dto';
import { CreatePersonDTO } from '../dto/create-person.dto';
import { SimplePersonDTO } from '../dto/simple-person.dto';
import { Body, Controller, Delete, Get, Param, Post, UseGuards, ConflictException, NotFoundException, Patch, BadRequestException } from '@nestjs/common';
import { Roles } from '../../../core/decorators/roles.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EUserRoles } from '../../users/enums/user-roles.enum';
import { PersonsService } from '../services/persons.service';
import { PersonDTO } from '../dto/person.dto';
import { Person } from '../entities/person.entity';
import { plainToClass } from 'class-transformer';
import { JwtAuthGuard } from '../../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../../core/guards/roles.guard';
import { Address } from '../../adresses/entities/address.entity';
import { validate } from 'class-validator';

@Controller('persons')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiTags('persons')
@ApiBearerAuth()
export class PersonsController {
  constructor(
    private readonly personsService: PersonsService,
    private readonly addressService: AddressesService
  ) {}

  @Get()
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: PersonDTO,
    isArray: true
  })
  async findAll(): Promise<PersonDTO[]> {
    const persons: Person[] = await this.personsService.findAll();
    return plainToClass(PersonDTO,persons);
  }

  @Get(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: PersonDTO
  })
  async findOne(@Param('id') id: number): Promise<PersonDTO> {
    const person: Person = await this.personsService.findOneById(id);
    return plainToClass(PersonDTO,person);
  }

  @Post()
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  @ApiResponse({
    status: 201,
    type: SimplePersonDTO,
  })
  async create(@Body() dto: CreatePersonDTO): Promise<SimplePersonDTO>  {
    dto = new CreatePersonDTO(dto);
    const errors = await validate(dto);
    if (errors.length) throw new BadRequestException;

    const existingPerson: Person = await this.personsService.findOneByEmail(dto.email);
    if (existingPerson) throw new ConflictException;
    const newPerson: Person = await this.personsService.create(dto);
    return plainToClass(SimplePersonDTO,newPerson);
  }
  
  @Patch(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  @ApiResponse({
    status: 201,
    type: SimplePersonDTO,
  })
  async update(@Param('id') id: number, @Body() dto: UpdatePersonDTO): Promise<SimplePersonDTO>  {
    dto = new UpdatePersonDTO(dto);
    const errors = await validate(dto);
    if (errors.length) throw new BadRequestException;

    const existingPerson: Person = await this.personsService.findOneById(id);
    if (!existingPerson) throw new NotFoundException;
    const emailConflict = await this.personsService.findOtherByEmail(id, dto.email);
    if (emailConflict) throw new ConflictException;

    if (existingPerson.address && dto.address) {
      // update address
      const addr: Address = await this.addressService.findOneById(existingPerson.address.id);
      for (const [prop, val] of Object.entries(dto.address)){
        addr[prop] = val;
      }
      await this.addressService.update(addr.id, addr);
      dto.address.id = addr.id;
    } else if (!existingPerson.address && dto.address) {
      // create address
      const addrId = await this.addressService.create(dto.address);
      dto.address = addrId;
    } else if (existingPerson.address && !dto.address) {
      // remove address
      const addr: Address = await this.addressService.findOneById(existingPerson.address.id);
      this.addressService.remove(addr.id);
    }
    const updatedPerson: Person = await this.personsService.update(id, dto);
    updatedPerson.id = id;
    
    return plainToClass(SimplePersonDTO,updatedPerson);
  }

  @Delete(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  async remove(@Param('id') id: number) {
    const person: Person | undefined = await this.personsService.findOneById(id);
    if (person == undefined) throw new NotFoundException;
    this.personsService.remove(id);
    if (person.address) await this.addressService.remove(person.address.id);
    return [];
  }
}

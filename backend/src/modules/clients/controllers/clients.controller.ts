import { AddressesService } from './../../adresses/services/addresses.service';
import { UpdateClientDTO } from './../dto/update-client.dto';
import { CreateClientDTO } from './../dto/create-client.dto';
import { SimpleClientDTO } from './../dto/simple-client.dto';
import { Body, Controller, Delete, Get, Param, Post, UseGuards, ConflictException, NotFoundException, Patch } from '@nestjs/common';
import { Roles } from '../../../core/decorators/roles.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EUserRoles } from '../../../modules/users/enums/user-roles.enum';
import { ClientsService } from '../services/clients.service';
import { ClientDTO } from './../dto/client.dto';
import { Client } from '../entities/client.entity';
import { plainToClass } from 'class-transformer';
import { JwtAuthGuard } from '../../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../../core/guards/roles.guard';
import { Address } from '../../adresses/entities/address.entity';

@Controller('clients')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiTags('clients')
@ApiBearerAuth()
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly addressService: AddressesService
  ) {}

  @Get()
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: ClientDTO,
    isArray: true
  })
  async findAll(): Promise<ClientDTO[]> {
    const clients: Client[] = await this.clientsService.findAll();
    return plainToClass(ClientDTO,clients);
  }

  @Get(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: ClientDTO
  })
  async findOne(@Param('id') id: number): Promise<ClientDTO> {
    const client: Client = await this.clientsService.findOneById(id);
    return plainToClass(ClientDTO,client);
  }

  @Post()
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  @ApiResponse({
    status: 201,
    type: SimpleClientDTO,
  })
  async create(@Body() dto: CreateClientDTO): Promise<SimpleClientDTO>  {
    const existingClient: Client = await this.clientsService.findOneByEmail(dto.email);
    if (existingClient) throw new ConflictException;
    const newClient: Client = await this.clientsService.create(dto);
    return plainToClass(SimpleClientDTO,newClient);
  }
  
  @Patch(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  @ApiResponse({
    status: 201,
    type: SimpleClientDTO,
  })
  async update(@Param('id') id: number, @Body() dto: UpdateClientDTO): Promise<SimpleClientDTO>  {
    const existingClient: Client = await this.clientsService.findOneById(id);
    if (!existingClient) throw new NotFoundException;
    const emailConflict = await this.clientsService.findOtherByEmail(id, dto.email);
    if (emailConflict) throw new ConflictException;

    if (existingClient.address && dto.address) {
      //update address
      const addr: Address = await this.addressService.findOneById(existingClient.address.id);
      for (const [prop, val] of Object.entries(dto.address)){
        addr[prop] = val;
      }
      await this.addressService.update(addr.id, addr);
    } else if (!existingClient.address && dto.address) {
      //create address
      const addrId = await this.addressService.create(dto.address);
      dto.address = addrId;
    }
    const updatedClient: Client = await this.clientsService.update(id, dto);
    updatedClient.id = id;
    
    return plainToClass(SimpleClientDTO,updatedClient);
  }

  @Delete(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  async remove(@Param('id') id: number) {
    const client: Client | undefined = await this.clientsService.findOneById(id);
    if (client == undefined) throw new NotFoundException;
    this.clientsService.remove(id);
    if (client.address) this.addressService.remove(client.address.id);
    return [];
  }
}
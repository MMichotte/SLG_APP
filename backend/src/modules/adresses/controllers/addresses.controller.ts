import { plainToClass } from 'class-transformer';
import { AddressDTO } from './../dto/address.dto';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@core/guards/jwt-auth.guard';
import { RolesGuard } from '@core/guards/roles.guard';
import { EUserRoles } from '@modules/users/enums/user-roles.enum';
import { AddressesService } from '../services/addresses.service';
import { Address } from '../entities/address.entity';
import { Roles } from '@core/decorators/roles.decorator';

@Controller('addresses')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiTags('addresses')
@ApiBearerAuth()
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}
  
  @Get()
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: AddressDTO,
    isArray: true
  })
  async findAll(): Promise<AddressDTO[]>{
    const addresses: Address[] = await this.addressesService.findAll();
    return plainToClass(AddressDTO, addresses);
  }

}

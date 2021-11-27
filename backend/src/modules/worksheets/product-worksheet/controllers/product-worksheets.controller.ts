import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Roles } from '@core/decorators/roles.decorator';
import { EUserRoles } from '@modules/users/enums/user-roles.enum';
import { JwtAuthGuard } from '@core/guards/jwt-auth.guard';
import { RolesGuard } from '@core/guards/roles.guard';
import { validate } from 'class-validator';
import { WorksheetsService } from '@modules/worksheets/worksheets/services/worksheets.service';
import { Worksheet } from '@modules/worksheets/worksheets/entities/worksheet.entity';
import { CreateProductWorksheetDTO } from '../dto/create-product-worksheet.dto';
import { ProductWorksheetDTO } from '../dto/product-worksheet.dto';
import { SimpleProductWorksheetDTO } from '../dto/simple-product-worksheet.dto';
import { UpdateProductWorksheetDTO } from '../dto/update-product-worksheet.dto';
import { ProductWorksheet } from '../entities/product-worksheet.entity';
import { ProductWorksheetsService } from '../services/product-worksheets.service';
import { Product } from '@modules/products/entities/product.entity';
import { ProductsService } from '@modules/products/services/products.service';

@Controller('product-worksheets')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiTags('product-worksheets')
@ApiBearerAuth()
export class ProductWorksheetsController {
  constructor(
    private readonly productWorksheetsService: ProductWorksheetsService,
    private readonly worksheetService: WorksheetsService,
    private readonly productsService: ProductsService
  ) { }

  @Get()
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: ProductWorksheetDTO,
    isArray: true
  })
  async findAll(): Promise<ProductWorksheetDTO[]> {
    const productWorksheets: ProductWorksheet[] = await this.productWorksheetsService.findAll();
    return plainToClass(ProductWorksheetDTO, productWorksheets);
  }

  @Get(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: ProductWorksheetDTO,
  })
  async findOne(@Param('id') id: number): Promise<ProductWorksheetDTO> {
    const productWorksheet: ProductWorksheet = await this.productWorksheetsService.findOneById(id);
    return plainToClass(ProductWorksheetDTO, productWorksheet);
  }

  @Post()
  @Roles(EUserRoles.ADMIN)
  @ApiResponse({
    status: 201,
    type: SimpleProductWorksheetDTO,
  })
  async create(@Body() createPrWsDto: CreateProductWorksheetDTO): Promise<SimpleProductWorksheetDTO> {
    createPrWsDto = new CreateProductWorksheetDTO(createPrWsDto);
    const errors = await validate(createPrWsDto);
    if (errors.length) throw new BadRequestException;

    await this.checkFK(createPrWsDto);

    const createdProductWorksheet: ProductWorksheet = await this.productWorksheetsService.create(createPrWsDto);
    return plainToClass(SimpleProductWorksheetDTO, createdProductWorksheet);
  }

  @Patch(':id')
  @Roles(EUserRoles.ADMIN)
  @ApiResponse({
    status: 200,
    type: SimpleProductWorksheetDTO,
  })
  async update(@Param('id') id: number, @Body() updatePrWsDto: UpdateProductWorksheetDTO): Promise<SimpleProductWorksheetDTO> {
    updatePrWsDto = new UpdateProductWorksheetDTO(updatePrWsDto);
    const errors = await validate(updatePrWsDto);
    if (errors.length) throw new BadRequestException;

    await this.checkFK(updatePrWsDto);

    const productWorksheet: ProductWorksheet | undefined = await this.productWorksheetsService.findOneById(id);
    if (productWorksheet == undefined) throw new NotFoundException;
    updatePrWsDto.updatedAt = new Date();
    const updatedProductWorksheet: ProductWorksheet = await this.productWorksheetsService.update(id, updatePrWsDto);
    updatedProductWorksheet.id = id;
    return plainToClass(SimpleProductWorksheetDTO, updatedProductWorksheet);
  }

  @Delete(':id')
  @Roles(EUserRoles.ADMIN)
  async remove(@Param('id') id: number) {
    const worksheet: ProductWorksheet | undefined = await this.productWorksheetsService.findOneById(id);
    if (worksheet == undefined) throw new NotFoundException;
    await this.productWorksheetsService.remove(+id);
    return [];
  }

  async checkFK(createPrWsDto: CreateProductWorksheetDTO | UpdateProductWorksheetDTO): Promise<void> {
    const worksheet: Worksheet = await this.worksheetService.findOneById(createPrWsDto.worksheetId);
    if (!worksheet) throw new HttpException(`There is no worksheet with id: ${createPrWsDto.worksheetId}`, HttpStatus.BAD_REQUEST);
    createPrWsDto.worksheet = worksheet;
    delete createPrWsDto.worksheetId;

    const product: Product = await this.productsService.findOneById(createPrWsDto.productId);
    if (!product) throw new HttpException(`There is no product with id: ${createPrWsDto.productId}`, HttpStatus.BAD_REQUEST);
    createPrWsDto.product = product;
    delete createPrWsDto.productId;
  }
}

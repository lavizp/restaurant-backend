import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RawMaterialsService } from './raw-materials.service';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw-material.dto';
import { AuthGuard } from 'src/libs/auth/auth.guard';
import * as jwt from 'jsonwebtoken';
@Controller('raw-materials')
export class RawMaterialsController {
  constructor(private readonly rawMaterialsService: RawMaterialsService) {}

  @Post()
  create(@Body() createRawMaterialDto: CreateRawMaterialDto) {
    return this.rawMaterialsService.create(createRawMaterialDto);
  }
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() request: Request) {
    const bearerToken = request.headers['authorization'];
    const [bearer, token] = bearerToken.split(' ');
    if (bearer !== 'Bearer') return;
    const userId = jwt.decode(token)['id'];
    return this.rawMaterialsService.findAll(+userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rawMaterialsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRawMaterialDto: UpdateRawMaterialDto,
  ) {
    return this.rawMaterialsService.update(+id, updateRawMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rawMaterialsService.remove(+id);
  }
}

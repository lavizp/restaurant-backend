import { Injectable } from '@nestjs/common';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw-material.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RawMaterial } from './entities/raw-material.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RawMaterialsService {
  constructor(
    @InjectRepository(RawMaterial)
    private rawMaterialReposotory: Repository<CreateRawMaterialDto>,
  ) {}
  create(createRawMaterialDto: CreateRawMaterialDto) {
    return this.rawMaterialReposotory.save(
      this.rawMaterialReposotory.create(createRawMaterialDto),
    );
  }

  findAll() {
    return this.rawMaterialReposotory.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} rawMaterial`;
  }

  update(id: number, updateRawMaterialDto: UpdateRawMaterialDto) {
    return this.rawMaterialReposotory
      .createQueryBuilder()
      .update()
      .set({
        name: updateRawMaterialDto.name,
        avatar: updateRawMaterialDto.avatar,
      })
      .where('id = :id', { id })
      .execute();
  }

  remove(id: number) {
    return this.rawMaterialReposotory
      .createQueryBuilder()
      .delete()
      .from(RawMaterial)
      .where('id = :id', { id })
      .execute();
  }
}

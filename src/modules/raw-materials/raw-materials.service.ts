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
    private rawMaterialReposotory: Repository<RawMaterial>,
  ) {}
  create(createRawMaterialDto: CreateRawMaterialDto) {
    const newMaterial = this.rawMaterialReposotory.create(createRawMaterialDto);
    console.log(newMaterial);
    return this.rawMaterialReposotory.insert(newMaterial);
  }

  findAll(userId: number) {
    return this.rawMaterialReposotory
      .createQueryBuilder('rawMaterial')
      .innerJoin('rawMaterial.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }

  async findOne(id: number) {
    const rawMaterial = await this.rawMaterialReposotory.findOne({
      where: { id: id },
    });
    return rawMaterial;
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

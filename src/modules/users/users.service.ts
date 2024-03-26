import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userReposotory: Repository<CreateUserDto>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.userReposotory.save(this.userReposotory.create(createUserDto));
  }

  findAll() {
    return this.userReposotory.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userReposotory
      .createQueryBuilder()
      .update()
      .set({
        name: updateUserDto.name,
      })
      .where('id = :id', { id })
      .execute();
  }

  remove(id: number): Promise<any> {
    return this.userReposotory
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id })
      .execute();
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { verify } from 'jsonwebtoken';
import { AuthService } from 'src/libs/auth/auth.service';
import { HelperService } from 'src/common/helpers/helpers.utils';
import { SignInUserDto } from './dto/signin-user.dto';
import { SignUpUserDto } from './dto/signup-user.dto';
import { Response } from 'src/common/response.utils';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userReposotory: Repository<User>,
    private readonly authService: AuthService,
  ) {}
  // create(createUserDto: SignUpUserDto) {
  //   return this.userReposotory.insert(
  //     this.userReposotory.create(createUserDto),
  //   );
  // }

  async signUpUser(signUpUser: SignUpUserDto) {
    const newUser = this.userReposotory.create(signUpUser);
    this.userReposotory.insert(newUser);
    console.log(newUser);
    const data = await this.signInUser({
      email: newUser.email,
      password: newUser.password,
    });
    return Response(true, 'User created successfully', data, 201);
  }

  async signInUser(createUserDto: SignInUserDto) {
    const user = await this.userReposotory.findOne({
      where: { email: createUserDto.email },
    });
    if (!user) throw new NotFoundException('User not found');
    //veryfying password
    const passwordValid = user.password == createUserDto.password;
    if (!passwordValid) throw new BadRequestException('Password is incorrect');
    const userJwtAccessToken = await this.authService.getUserJwt(user);
    const data = HelperService.buildPayloadResponse(
      user,
      userJwtAccessToken,
      null,
    );
    return Response(true, 'User created successfully', data, 201);
  }
  findAll() {
    return this.userReposotory.find();
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

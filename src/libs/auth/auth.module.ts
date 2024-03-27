import { Global, Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';

import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret',

      signOptions: { expiresIn: '60s' },
    }),
  ],

  providers: [AuthService, AuthGuard],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}

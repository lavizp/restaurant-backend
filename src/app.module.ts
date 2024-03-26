import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { RawMaterialsModule } from './modules/raw-materials/raw-materials.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'postgres',
      password: '123',
      database: 'nest',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    RawMaterialsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const devConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5434,
  username: 'postgres',
  password: '123',
  database: 'nest',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};

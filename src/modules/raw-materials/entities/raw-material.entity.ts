import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('RawMaterial')
export class RawMaterial {
  @PrimaryGeneratedColumn()
  id: number;

  name: string;
  avatar: string;
  //   outlet: number;
}

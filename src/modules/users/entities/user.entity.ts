import { RawMaterial } from 'src/modules/raw-materials/entities/raw-material.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @OneToMany(() => RawMaterial, (rawMaterial) => rawMaterial.user)
  rawMaterials: RawMaterial[];
}

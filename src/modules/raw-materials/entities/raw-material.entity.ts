import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('RawMaterial')
export class RawMaterial {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  avatar: string;

  @ManyToOne(() => User, (user) => user.rawMaterials)
  user: User;
}

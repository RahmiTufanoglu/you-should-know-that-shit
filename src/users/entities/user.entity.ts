import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @CreateDateColumn()
  createdDate: Date;

  @ApiProperty()
  @Column()
  firstname: string;

  @ApiProperty()
  @Column()
  lastname: string;

  @ApiProperty({
    example: 'R2T8',
    description: 'A pseudonym of a person',
  })
  @Column({ unique: true })
  username: string;

  @ApiProperty()
  @Column({ unique: true, length: 300 })
  email: string;

  @ApiProperty()
  @Column({ select: false })
  @Column()
  password: string;
}

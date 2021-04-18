import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @CreateDateColumn({ nullable: false })
  createdDate: Date;

  @ApiProperty()
  @Column({ nullable: false })
  firstname: string;

  @ApiProperty()
  @Column({ nullable: false })
  lastname: string;

  @ApiProperty({
    example: 'RaTu',
    description: 'A pseudonym of a person',
  })
  @Column({ nullable: false, unique: true })
  username: string;

  @ApiProperty()
  @Column({ nullable: false, unique: true, length: 300 })
  email: string;

  @ApiProperty()
  @Column({ nullable: false, select: false })
  password: string;
}

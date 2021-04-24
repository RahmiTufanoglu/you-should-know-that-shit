import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class User {

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true, length: 300 })
  email: string;

  @ApiProperty()
  @Column({ select: false })
  password: string;

  @ApiProperty({
    example: 'RaTu',
    description: 'A pseudonym of a person',
  })
  @Column({ nullable: true, unique: true })
  username: string;

  @ApiProperty()
  @Column({ nullable: true })
  firstname: string;

  @ApiProperty()
  @Column({ nullable: true })
  lastname: string;

  @ApiProperty()
  @Column({ nullable: true })
  highscore: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

}

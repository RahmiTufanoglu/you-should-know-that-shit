import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class User {

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ required: true })
  @Column({ unique: true, length: 300 })
  email: string;

  @ApiProperty({ required: true })
  @Column({ select: false })
  password: string;

  @ApiProperty({
    example: 'RaTu',
    description: 'A pseudonym of a person. Used for the ranking list.',
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

  @UpdateDateColumn()
  updatedAt: Date;

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

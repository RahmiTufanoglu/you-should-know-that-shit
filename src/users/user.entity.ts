import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class UserEntity {

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ required: true })
  @Column({ unique: true, length: 300 })
  email: string;

  @ApiProperty({ required: true })
  @Column({ select: false, nullable: true })
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
  @Column({ nullable: true, default: false })
  signedInWith: boolean;

  @ApiProperty()
  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @ApiProperty()
  @CreateDateColumn({ nullable: false })
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

  @BeforeUpdate()
  updateTimestamp(): void {
    this.updatedAt = new Date();
  }

}

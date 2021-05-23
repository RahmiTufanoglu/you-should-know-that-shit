import { ApiProperty } from '@nestjs/swagger';
import { BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'claims' })
export class ClaimEntity {

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ nullable: false, unique: true })
  claim: string;

  @ApiProperty()
  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @ApiProperty()
  @CreateDateColumn({ nullable: false })
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp(): void {
    this.updatedAt = new Date();
  }

}

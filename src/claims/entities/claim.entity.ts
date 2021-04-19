import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'claims' })
export class Claim {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ nullable: false, unique: true })
  claim: string;

  @ApiProperty()
  @CreateDateColumn({ nullable: false })
  createdAt: Date;
}

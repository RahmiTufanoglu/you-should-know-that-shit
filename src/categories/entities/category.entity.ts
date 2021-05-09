import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Fact } from '../../facts/entities/fact.entity';
import { FACT_CATEGORY_ENUM } from '../../enums';

@Entity({ name: 'categories' })
export class Category {

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ nullable: false, unique: true })
  category: FACT_CATEGORY_ENUM;

  @ApiProperty()
  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @ApiProperty()
  @OneToMany(
    () => Fact,
    fact => fact.id,
  )
  facts: Fact[];

}

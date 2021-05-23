import { BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { FactEnitity } from '../../facts/entities/fact.entity';
import { FACT_CATEGORY_ENUM } from '../../enums';

@Entity({ name: 'categories' })
export class CategoryEntity {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty()
  @Column({ nullable: false, unique: true })
  category: FACT_CATEGORY_ENUM;

  @ApiProperty()
  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @ApiProperty()
  @CreateDateColumn({ nullable: false })
  updatedAt: Date;

  @ApiProperty()
  @OneToMany(
    () => FactEnitity,
    fact => fact.id,
  )
  facts: FactEnitity[];

  @BeforeUpdate()
  updateTimestamp(): void {
    this.updatedAt = new Date();
  }

}

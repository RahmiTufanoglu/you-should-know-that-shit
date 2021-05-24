import { BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Fact } from '../../facts/entities/fact.entity';
import { FACT_CATEGORY_ENUM } from '../../enums';

@Entity({ name: 'categories' })
export class Category {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: FACT_CATEGORY_ENUM,
    nullable: false,
    unique: true,
  })
  category: FACT_CATEGORY_ENUM;

  @ApiProperty()
  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @ApiProperty()
  @CreateDateColumn({ nullable: false })
  updatedAt: Date;

  @ApiProperty()
  @OneToMany(
    () => Fact,
    fact => fact.id,
  )
  facts: Fact[];

  @BeforeUpdate()
  updateTimestamp(): void {
    this.updatedAt = new Date();
  }

}

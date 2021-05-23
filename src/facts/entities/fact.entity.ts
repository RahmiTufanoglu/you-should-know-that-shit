import { BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from '../../categories/entities/category.entity';

@Entity({ name: 'facts' })
export class FactEnitity {

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Slugs are able to sleep three consecutibe years.',
    description: 'A fact',
  })
  @Column({ unique: true })
  fact: string;

  @ApiProperty()
  @Column()
  isTrue: boolean;

  @ApiProperty({
    example: '',
    description: 'A fact related image',
  })
  @Column({ nullable: true, default: null })
  image: string;

  @ApiProperty()
  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @ApiProperty()
  @CreateDateColumn({ nullable: false })
  updatedAt: Date;

  @ApiProperty()
  @Column()
  categoryId: string;

  @ManyToOne(
    () => CategoryEntity,
    category => category.id,
  )
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;


  @BeforeUpdate()
  updateTimestamp(): void {
    this.updatedAt = new Date();
  }

}

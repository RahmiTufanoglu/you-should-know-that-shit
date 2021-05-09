import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../categories/entities/category.entity';

@Entity({ name: 'facts' })
export class Fact {

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
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  categoryId: string;

  @ManyToOne(
    () => Category,
    category => category.id,
  )
  @JoinColumn({ name: 'categoryId' })
  category: Category;

}

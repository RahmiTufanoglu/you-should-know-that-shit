import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  @Column()
  image: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Category, category => category.id)
  category: Category;

}

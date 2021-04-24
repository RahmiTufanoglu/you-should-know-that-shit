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
  @Column({ nullable: false, unique: true })
  fact: string;

  @ApiProperty()
  @Column({ nullable: false })
  isTrue: boolean;

  @ApiProperty({
    example: '',
    description: 'A fact related image',
  })
  @Column({ nullable: false, default: 'Default image' })
  image?: string;

  @ApiProperty()
  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @ManyToOne(() => Category, category => category.id)
  category: Category;

}

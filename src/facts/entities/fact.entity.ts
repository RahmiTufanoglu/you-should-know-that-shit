import { BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  @Column({ nullable: false })
  correct: boolean;

  @ApiProperty({
    example: '',
    description: 'A fact related image',
  })
  @Column({ nullable: true, default: null })
  image: string;

  @ApiProperty()
  @Column({ nullable: true })
  imageLink: string;

  @ApiProperty()
  @Column({ nullable: true })
  source: string;

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
    () => Category,
    category => category.id,
  )
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @BeforeUpdate()
  updateTimestamp(): void {
    this.updatedAt = new Date();
  }

}

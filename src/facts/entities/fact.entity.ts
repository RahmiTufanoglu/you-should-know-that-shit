import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { FACT_CATEGORY_ENUM } from '../../enums/fact.enum';

@Entity({ name: 'facts' })
export class Fact {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @CreateDateColumn({ nullable: false })
  createdDate: Date;

  @ApiProperty({
    example: 'Slugs are able to sleep three consecutibe years.',
    description: 'A fact',
  })
  @Column({ nullable: false, unique: true })
  fact: string;

  @ApiProperty({
    example: 'History',
    description: 'A fact category',
  })
  @Column({ nullable: false })
  category: FACT_CATEGORY_ENUM;

  @ApiProperty({
    example: '',
    description: 'A fact related image',
  })
  @Column({ nullable: false, default: 'Default image' })
  image?: string;
}

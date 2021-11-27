import { Workforce } from '@modules/workforces/entities/workforce.entity';
import { Worksheet } from '@modules/worksheets/worksheets/entities/worksheet.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'workforce-worksheet' })
export class WorkforceWorksheet {
  
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Workforce, {nullable: false})
  @JoinColumn({ name: 'id_workforce' })
  workforce: Workforce;
  workforceId: number;
  
  @ManyToOne(() => Worksheet, {nullable: false})
  @JoinColumn({ name: 'id_worksheet' })
  worksheet: Worksheet;
  worksheetId: number;
  
  @Column({name: 'hours', type: 'decimal', nullable: false})
  hours: number;
  
  @Column({name: 'note', type: 'text', nullable: true})
  note?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { WorkflowTemplate } from './workflow-template.entity';
import { WorkflowStatus } from '../enums/workflow-status.enum';

@Entity()
export class WorkflowInstance {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    templateId: string;

    @Column()
    currentStepKey: string;

    @Column({
        type: 'enum',
        enum: WorkflowStatus,
        default: WorkflowStatus.ACTIVE
    })
    status: WorkflowStatus;

    @Column()
    businessEntityId: string;

    @Column('jsonb', { default: {} })
    contextData: Record<string, any>;

    @ManyToOne(() => WorkflowTemplate)
    template: WorkflowTemplate;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

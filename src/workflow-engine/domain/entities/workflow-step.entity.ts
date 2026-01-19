import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { WorkflowTemplate } from './workflow-template.entity';

export interface WorkflowStepConfig {
    allowedRoles: string[];
    canRejectTo?: string[];
    autoTransitionAfter?: number;
}

@Entity()
export class WorkflowStep {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    key: string;

    @Column()
    label: string;

    @Column()
    order: number;

    @Column('jsonb', { default: {} })
    config: WorkflowStepConfig;

    @ManyToOne(() => WorkflowTemplate, template => template.steps)
    template: WorkflowTemplate;
}

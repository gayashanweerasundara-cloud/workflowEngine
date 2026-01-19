import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { WorkflowStep } from './workflow-step.entity';
import { WorkflowInstance } from './workflow-instance.entity';

@Entity()
export class WorkflowTemplate {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ default: 1 })
    version: number;

    @Column({ default: false })
    isPublished: boolean;

    @OneToMany(() => WorkflowStep, step => step.template, { cascade: true })
    steps: WorkflowStep[];

    @OneToMany(() => WorkflowInstance, instance => instance.template)
    instances: WorkflowInstance[];

    constructor(partial: Partial<WorkflowTemplate>) {
        Object.assign(this, partial);
    }
}

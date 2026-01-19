import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { WorkflowInstance } from './workflow-instance.entity';

@Entity()
export class AuditLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    instanceId: string;

    @Column()
    action: string;

    @Column({ nullable: true })
    actorId: string;

    @Column({ nullable: true })
    fromStep: string;

    @Column({ nullable: true })
    toStep: string;

    @Column('jsonb', { nullable: true })
    payload: any;

    @ManyToOne(() => WorkflowInstance, { onDelete: 'CASCADE' })
    instance: WorkflowInstance;

    @CreateDateColumn()
    timestamp: Date;
}

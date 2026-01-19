import { WorkflowInstance } from './workflow-instance.entity';
export declare class AuditLog {
    id: string;
    instanceId: string;
    action: string;
    actorId: string;
    fromStep: string;
    toStep: string;
    payload: any;
    instance: WorkflowInstance;
    timestamp: Date;
}

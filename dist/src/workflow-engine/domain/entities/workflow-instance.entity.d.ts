import { WorkflowTemplate } from './workflow-template.entity';
import { WorkflowStatus } from '../enums/workflow-status.enum';
export declare class WorkflowInstance {
    id: string;
    templateId: string;
    currentStepKey: string;
    status: WorkflowStatus;
    businessEntityId: string;
    contextData: Record<string, any>;
    template: WorkflowTemplate;
    createdAt: Date;
    updatedAt: Date;
}

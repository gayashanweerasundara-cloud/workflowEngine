import { WorkflowTemplate } from './workflow-template.entity';
export interface WorkflowStepConfig {
    allowedRoles: string[];
    canRejectTo?: string[];
    autoTransitionAfter?: number;
}
export declare class WorkflowStep {
    id: string;
    key: string;
    label: string;
    order: number;
    config: WorkflowStepConfig;
    template: WorkflowTemplate;
}

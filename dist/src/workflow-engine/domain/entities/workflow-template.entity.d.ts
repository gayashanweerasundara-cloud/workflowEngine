import { WorkflowStep } from './workflow-step.entity';
import { WorkflowInstance } from './workflow-instance.entity';
export declare class WorkflowTemplate {
    id: string;
    name: string;
    description: string;
    version: number;
    isPublished: boolean;
    steps: WorkflowStep[];
    instances: WorkflowInstance[];
    constructor(partial: Partial<WorkflowTemplate>);
}

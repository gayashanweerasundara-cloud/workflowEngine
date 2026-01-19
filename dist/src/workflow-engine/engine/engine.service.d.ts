import { WorkflowTemplate } from '../domain/entities/workflow-template.entity';
import { WorkflowInstance } from '../domain/entities/workflow-instance.entity';
import { WorkflowAction } from '../domain/enums/workflow-status.enum';
export declare class EngineService {
    transition(instance: WorkflowInstance, template: WorkflowTemplate, action: WorkflowAction, actorRoles: string[]): Promise<WorkflowInstance>;
    private validatePermissions;
}

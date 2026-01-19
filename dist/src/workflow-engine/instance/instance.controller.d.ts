import { InstanceService } from './instance.service';
import { WorkflowAction } from '../domain/enums/workflow-status.enum';
export declare class InstanceController {
    private readonly instanceService;
    constructor(instanceService: InstanceService);
    create(body: {
        templateId: string;
        businessEntityId: string;
        context: any;
    }): Promise<import("../domain/entities/workflow-instance.entity").WorkflowInstance>;
    transition(id: string, body: {
        action: WorkflowAction;
        roles: string[];
        payload?: any;
    }): Promise<import("../domain/entities/workflow-instance.entity").WorkflowInstance>;
}

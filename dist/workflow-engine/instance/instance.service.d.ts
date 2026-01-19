import { Repository } from 'typeorm';
import { EngineService } from '../engine/engine.service';
import { TemplateService } from '../template/template.service';
import { WorkflowInstance } from '../domain/entities/workflow-instance.entity';
import { AuditLog } from '../domain/entities/audit-log.entity';
import { WorkflowAction } from '../domain/enums/workflow-status.enum';
export declare class InstanceService {
    private readonly instanceRepo;
    private readonly auditLogRepo;
    private engineService;
    private templateService;
    constructor(instanceRepo: Repository<WorkflowInstance>, auditLogRepo: Repository<AuditLog>, engineService: EngineService, templateService: TemplateService);
    createInstance(templateId: string, businessEntityId: string, contextData: any): Promise<WorkflowInstance>;
    transition(id: string, action: WorkflowAction, actorRoles: string[], payload: any): Promise<WorkflowInstance>;
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EngineService } from '../engine/engine.service';
import { TemplateService } from '../template/template.service';
import { WorkflowInstance } from '../domain/entities/workflow-instance.entity';
import { AuditLog } from '../domain/entities/audit-log.entity';
import { WorkflowAction } from '../domain/enums/workflow-status.enum';

@Injectable()
export class InstanceService {
    constructor(
        @InjectRepository(WorkflowInstance)
        private readonly instanceRepo: Repository<WorkflowInstance>,
        @InjectRepository(AuditLog)
        private readonly auditLogRepo: Repository<AuditLog>,
        private engineService: EngineService,
        private templateService: TemplateService,
    ) { }

    async createInstance(templateId: string, businessEntityId: string, contextData: any): Promise<WorkflowInstance> {
        const template = await this.templateService.findOne(templateId);
        // Logic to find start step (assuming ordered steps)
        const startStep = template.steps.reduce((prev, curr) => prev.order < curr.order ? prev : curr);

        const instance = this.instanceRepo.create({
            templateId,
            currentStepKey: startStep.key,
            status: 'ACTIVE' as any,
            businessEntityId,
            contextData: contextData || {},
        });

        return this.instanceRepo.save(instance);
    }

    async transition(id: string, action: WorkflowAction, actorRoles: string[], payload: any): Promise<WorkflowInstance> {
        const instance = await this.instanceRepo.findOne({
            where: { id },
            relations: ['template', 'template.steps'],
        });

        if (!instance) throw new NotFoundException('Instance not found');

        const template = instance.template;
        const oldStep = instance.currentStepKey;

        // Execute core logic
        const updatedInstance = await this.engineService.transition(instance, template, action, actorRoles);

        // Save Instance
        const saved = await this.instanceRepo.save(updatedInstance);

        // Save Audit Log
        const log = this.auditLogRepo.create({
            instanceId: saved.id,
            action,
            actorId: 'system', // TODO: user ID
            fromStep: oldStep,
            toStep: saved.currentStepKey,
            payload,
        });
        await this.auditLogRepo.save(log);

        return saved;
    }

    async findAll(): Promise<WorkflowInstance[]> {
        return this.instanceRepo.find({
            order: { createdAt: 'DESC' }
        });
    }

    async findOne(id: string): Promise<WorkflowInstance> {
        const instance = await this.instanceRepo.findOne({
            where: { id },
            relations: ['template', 'template.steps'] // Needed for transitions
        });
        if (!instance) throw new NotFoundException('Instance not found');
        return instance;
    }
}

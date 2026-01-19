"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const engine_service_1 = require("../engine/engine.service");
const template_service_1 = require("../template/template.service");
const workflow_instance_entity_1 = require("../domain/entities/workflow-instance.entity");
const audit_log_entity_1 = require("../domain/entities/audit-log.entity");
let InstanceService = class InstanceService {
    constructor(instanceRepo, auditLogRepo, engineService, templateService) {
        this.instanceRepo = instanceRepo;
        this.auditLogRepo = auditLogRepo;
        this.engineService = engineService;
        this.templateService = templateService;
    }
    async createInstance(templateId, businessEntityId, contextData) {
        const template = await this.templateService.findOne(templateId);
        const startStep = template.steps.reduce((prev, curr) => prev.order < curr.order ? prev : curr);
        const instance = this.instanceRepo.create({
            templateId,
            currentStepKey: startStep.key,
            status: 'ACTIVE',
            businessEntityId,
            contextData: contextData || {},
        });
        return this.instanceRepo.save(instance);
    }
    async transition(id, action, actorRoles, payload) {
        const instance = await this.instanceRepo.findOne({
            where: { id },
            relations: ['template', 'template.steps'],
        });
        if (!instance)
            throw new common_1.NotFoundException('Instance not found');
        const template = instance.template;
        const oldStep = instance.currentStepKey;
        const updatedInstance = await this.engineService.transition(instance, template, action, actorRoles);
        const saved = await this.instanceRepo.save(updatedInstance);
        const log = this.auditLogRepo.create({
            instanceId: saved.id,
            action,
            actorId: 'system',
            fromStep: oldStep,
            toStep: saved.currentStepKey,
            payload,
        });
        await this.auditLogRepo.save(log);
        return saved;
    }
};
exports.InstanceService = InstanceService;
exports.InstanceService = InstanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(workflow_instance_entity_1.WorkflowInstance)),
    __param(1, (0, typeorm_1.InjectRepository)(audit_log_entity_1.AuditLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        engine_service_1.EngineService,
        template_service_1.TemplateService])
], InstanceService);
//# sourceMappingURL=instance.service.js.map
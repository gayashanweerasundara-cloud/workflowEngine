"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EngineService = void 0;
const common_1 = require("@nestjs/common");
const workflow_status_enum_1 = require("../domain/enums/workflow-status.enum");
let EngineService = class EngineService {
    async transition(instance, template, action, actorRoles) {
        const currentStep = template.steps.find(s => s.key === instance.currentStepKey);
        if (!currentStep)
            throw new common_1.BadRequestException(`Invalid current step: ${instance.currentStepKey}`);
        this.validatePermissions(currentStep, action, actorRoles);
        let nextStepKey = instance.currentStepKey;
        if (action === workflow_status_enum_1.WorkflowAction.APPROVE) {
            const nextStep = template.steps.find(s => s.order === currentStep.order + 1);
            if (nextStep) {
                nextStepKey = nextStep.key;
            }
            else {
                instance.status = 'COMPLETED';
            }
        }
        else if (action === workflow_status_enum_1.WorkflowAction.REJECT) {
            instance.status = 'REJECTED';
        }
        else if (action === workflow_status_enum_1.WorkflowAction.SEND_BACK) {
            const prevStep = template.steps.find(s => s.order === currentStep.order - 1);
            if (prevStep)
                nextStepKey = prevStep.key;
        }
        instance.currentStepKey = nextStepKey;
        return instance;
    }
    validatePermissions(step, action, roles) {
        const allowed = step.config.allowedRoles.some(r => roles.includes(r));
        if (!allowed && step.config.allowedRoles.length > 0) {
            throw new common_1.ForbiddenException(`User does not have permission to perform action on step ${step.key}`);
        }
    }
};
exports.EngineService = EngineService;
exports.EngineService = EngineService = __decorate([
    (0, common_1.Injectable)()
], EngineService);
//# sourceMappingURL=engine.service.js.map
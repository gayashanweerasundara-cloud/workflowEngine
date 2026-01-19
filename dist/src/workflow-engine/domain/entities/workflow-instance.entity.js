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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowInstance = void 0;
const typeorm_1 = require("typeorm");
const workflow_template_entity_1 = require("./workflow-template.entity");
const workflow_status_enum_1 = require("../enums/workflow-status.enum");
let WorkflowInstance = class WorkflowInstance {
};
exports.WorkflowInstance = WorkflowInstance;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], WorkflowInstance.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WorkflowInstance.prototype, "templateId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WorkflowInstance.prototype, "currentStepKey", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: workflow_status_enum_1.WorkflowStatus,
        default: workflow_status_enum_1.WorkflowStatus.ACTIVE
    }),
    __metadata("design:type", String)
], WorkflowInstance.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WorkflowInstance.prototype, "businessEntityId", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { default: {} }),
    __metadata("design:type", Object)
], WorkflowInstance.prototype, "contextData", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => workflow_template_entity_1.WorkflowTemplate),
    __metadata("design:type", workflow_template_entity_1.WorkflowTemplate)
], WorkflowInstance.prototype, "template", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], WorkflowInstance.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], WorkflowInstance.prototype, "updatedAt", void 0);
exports.WorkflowInstance = WorkflowInstance = __decorate([
    (0, typeorm_1.Entity)()
], WorkflowInstance);
//# sourceMappingURL=workflow-instance.entity.js.map
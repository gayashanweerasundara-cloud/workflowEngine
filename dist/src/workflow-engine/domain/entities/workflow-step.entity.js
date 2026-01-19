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
exports.WorkflowStep = void 0;
const typeorm_1 = require("typeorm");
const workflow_template_entity_1 = require("./workflow-template.entity");
let WorkflowStep = class WorkflowStep {
};
exports.WorkflowStep = WorkflowStep;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], WorkflowStep.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WorkflowStep.prototype, "key", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WorkflowStep.prototype, "label", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WorkflowStep.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { default: {} }),
    __metadata("design:type", Object)
], WorkflowStep.prototype, "config", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => workflow_template_entity_1.WorkflowTemplate, template => template.steps),
    __metadata("design:type", workflow_template_entity_1.WorkflowTemplate)
], WorkflowStep.prototype, "template", void 0);
exports.WorkflowStep = WorkflowStep = __decorate([
    (0, typeorm_1.Entity)()
], WorkflowStep);
//# sourceMappingURL=workflow-step.entity.js.map
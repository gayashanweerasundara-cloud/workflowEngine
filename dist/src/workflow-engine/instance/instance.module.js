"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const instance_service_1 = require("./instance.service");
const instance_controller_1 = require("./instance.controller");
const engine_service_1 = require("../engine/engine.service");
const template_module_1 = require("../template/template.module");
const workflow_instance_entity_1 = require("../domain/entities/workflow-instance.entity");
const audit_log_entity_1 = require("../domain/entities/audit-log.entity");
let InstanceModule = class InstanceModule {
};
exports.InstanceModule = InstanceModule;
exports.InstanceModule = InstanceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([workflow_instance_entity_1.WorkflowInstance, audit_log_entity_1.AuditLog]),
            template_module_1.TemplateModule
        ],
        controllers: [instance_controller_1.InstanceController],
        providers: [instance_service_1.InstanceService, engine_service_1.EngineService],
    })
], InstanceModule);
//# sourceMappingURL=instance.module.js.map
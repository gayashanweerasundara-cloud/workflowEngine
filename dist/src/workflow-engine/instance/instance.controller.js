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
exports.InstanceController = void 0;
const common_1 = require("@nestjs/common");
const instance_service_1 = require("./instance.service");
let InstanceController = class InstanceController {
    constructor(instanceService) {
        this.instanceService = instanceService;
    }
    create(body) {
        return this.instanceService.createInstance(body.templateId, body.businessEntityId, body.context);
    }
    transition(id, body) {
        return this.instanceService.transition(id, body.action, body.roles, body.payload);
    }
};
exports.InstanceController = InstanceController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InstanceController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/transition'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], InstanceController.prototype, "transition", null);
exports.InstanceController = InstanceController = __decorate([
    (0, common_1.Controller)('instances'),
    __metadata("design:paramtypes", [instance_service_1.InstanceService])
], InstanceController);
//# sourceMappingURL=instance.controller.js.map
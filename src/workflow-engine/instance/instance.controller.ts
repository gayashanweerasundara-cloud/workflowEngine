import { Controller, Post, Body, Param } from '@nestjs/common';
import { InstanceService } from './instance.service';
import { WorkflowAction } from '../domain/enums/workflow-status.enum';

@Controller('instances')
export class InstanceController {
    constructor(private readonly instanceService: InstanceService) { }

    @Post()
    create(@Body() body: { templateId: string; businessEntityId: string; context: any }) {
        return this.instanceService.createInstance(body.templateId, body.businessEntityId, body.context);
    }

    @Post(':id/transition')
    transition(
        @Param('id') id: string,
        @Body() body: { action: WorkflowAction; roles: string[]; payload?: any }
    ) {
        return this.instanceService.transition(id, body.action, body.roles, body.payload);
    }
}

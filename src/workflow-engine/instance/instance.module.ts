import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstanceService } from './instance.service';
import { InstanceController } from './instance.controller';
import { EngineService } from '../engine/engine.service';
import { TemplateModule } from '../template/template.module';
import { WorkflowInstance } from '../domain/entities/workflow-instance.entity';
import { AuditLog } from '../domain/entities/audit-log.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([WorkflowInstance, AuditLog]),
        TemplateModule
    ],
    controllers: [InstanceController],
    providers: [InstanceService, EngineService],
})
export class InstanceModule { }

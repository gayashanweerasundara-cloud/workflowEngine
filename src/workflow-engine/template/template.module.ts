import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { WorkflowTemplate } from '../domain/entities/workflow-template.entity';
import { WorkflowStep } from '../domain/entities/workflow-step.entity';

@Module({
    imports: [TypeOrmModule.forFeature([WorkflowTemplate, WorkflowStep])],
    controllers: [TemplateController],
    providers: [TemplateService],
    exports: [TemplateService]
})
export class TemplateModule { }

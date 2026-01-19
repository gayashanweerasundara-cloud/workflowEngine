import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TemplateModule } from './workflow-engine/template/template.module';
import { InstanceModule } from './workflow-engine/instance/instance.module';
import { WorkflowTemplate } from './workflow-engine/domain/entities/workflow-template.entity';
import { WorkflowStep } from './workflow-engine/domain/entities/workflow-step.entity';
import { WorkflowInstance } from './workflow-engine/domain/entities/workflow-instance.entity';
import { AuditLog } from './workflow-engine/domain/entities/audit-log.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [WorkflowTemplate, WorkflowStep, WorkflowInstance, AuditLog],
      synchronize: true, // Auto-schema sync for dev
    }),
    TemplateModule,
    InstanceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkflowTemplate } from '../domain/entities/workflow-template.entity';
import { WorkflowStep } from '../domain/entities/workflow-step.entity';

@Injectable()
export class TemplateService {
    constructor(
        @InjectRepository(WorkflowTemplate)
        private readonly templateRepo: Repository<WorkflowTemplate>,
    ) { }

    async create(data: Partial<WorkflowTemplate>): Promise<WorkflowTemplate> {
        const template = this.templateRepo.create({
            ...data,
            steps: data.steps ? data.steps.map(s => ({ ...s })) : []
        });
        return this.templateRepo.save(template);
    }

    async findAll(): Promise<WorkflowTemplate[]> {
        return this.templateRepo.find({ relations: ['steps'] });
    }

    async findOne(id: string): Promise<WorkflowTemplate> {
        const template = await this.templateRepo.findOne({
            where: { id },
            relations: ['steps'],
        });
        if (!template) throw new NotFoundException(`Template ${id} not found`);
        return template;
    }
}

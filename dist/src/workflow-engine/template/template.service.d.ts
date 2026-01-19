import { Repository } from 'typeorm';
import { WorkflowTemplate } from '../domain/entities/workflow-template.entity';
export declare class TemplateService {
    private readonly templateRepo;
    constructor(templateRepo: Repository<WorkflowTemplate>);
    create(data: Partial<WorkflowTemplate>): Promise<WorkflowTemplate>;
    findAll(): Promise<WorkflowTemplate[]>;
    findOne(id: string): Promise<WorkflowTemplate>;
}

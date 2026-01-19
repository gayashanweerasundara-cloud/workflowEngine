import { TemplateService } from './template.service';
import { WorkflowTemplate } from '../domain/entities/workflow-template.entity';
export declare class TemplateController {
    private readonly templateService;
    constructor(templateService: TemplateService);
    create(createTemplateDto: Partial<WorkflowTemplate>): Promise<WorkflowTemplate>;
    findAll(): Promise<WorkflowTemplate[]>;
    findOne(id: string): Promise<WorkflowTemplate>;
}

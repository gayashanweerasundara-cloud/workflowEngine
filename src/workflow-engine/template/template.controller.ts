import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TemplateService } from './template.service';
import { WorkflowTemplate } from '../domain/entities/workflow-template.entity';

@Controller('templates')
export class TemplateController {
    constructor(private readonly templateService: TemplateService) { }

    @Post()
    create(@Body() createTemplateDto: Partial<WorkflowTemplate>) {
        return this.templateService.create(createTemplateDto);
    }

    @Get()
    findAll() {
        return this.templateService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.templateService.findOne(id);
    }
}

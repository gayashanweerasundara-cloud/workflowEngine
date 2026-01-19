import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { WorkflowTemplate } from '../domain/entities/workflow-template.entity';
import { WorkflowStep } from '../domain/entities/workflow-step.entity';
import { WorkflowInstance } from '../domain/entities/workflow-instance.entity';
import { WorkflowAction } from '../domain/enums/workflow-status.enum';

@Injectable()
export class EngineService {

    /**
     * Determines if a transition is valid and calculates the next step.
     */
    async transition(
        instance: WorkflowInstance,
        template: WorkflowTemplate,
        action: WorkflowAction,
        actorRoles: string[]
    ): Promise<WorkflowInstance> {

        // 1. Find Current Step Definition
        const currentStep = template.steps.find(s => s.key === instance.currentStepKey);
        if (!currentStep) throw new BadRequestException(`Invalid current step: ${instance.currentStepKey}`);

        // 2. Validate Permissions
        this.validatePermissions(currentStep, action, actorRoles);

        // 3. Determine Next Step
        // For MVP, we assume a linear flow or simple logic. 
        // In a real engine, this would evaluate a directed graph or conditions.
        let nextStepKey = instance.currentStepKey;

        if (action === WorkflowAction.APPROVE) {
            // Find next step by order
            const nextStep = template.steps.find(s => s.order === currentStep.order + 1);
            if (nextStep) {
                nextStepKey = nextStep.key;
            } else {
                // End of workflow
                instance.status = 'COMPLETED' as any; // Todo: fix enum typing
            }
        } else if (action === WorkflowAction.REJECT) {
            instance.status = 'REJECTED' as any;
        } else if (action === WorkflowAction.SEND_BACK) {
            // Find previous step
            const prevStep = template.steps.find(s => s.order === currentStep.order - 1);
            if (prevStep) nextStepKey = prevStep.key;
        }

        // 4. Update Instance
        instance.currentStepKey = nextStepKey;

        return instance;
    }

    private validatePermissions(step: WorkflowStep, action: WorkflowAction, roles: string[]) {
        // Safe access to allowedRoles, defaulting to empty array if undefined
        const allowedRoles = step.config?.allowedRoles || [];

        // If no roles defined, we assume open access (or handle as per requirement)
        if (allowedRoles.length === 0) return;

        const allowed = allowedRoles.some(r => roles.includes(r));
        if (!allowed) {
            throw new ForbiddenException(`User does not have permission to perform action on step ${step.key}`);
        }
    }
}

export enum WorkflowStatus {
    DRAFT = 'DRAFT',
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED',
    REJECTED = 'REJECTED',
    TERMINATED = 'TERMINATED',
}

export enum WorkflowAction {
    SUBMIT = 'SUBMIT',
    APPROVE = 'APPROVE',
    REJECT = 'REJECT',
    SEND_BACK = 'SEND_BACK',
    COMMENT = 'COMMENT',
    CANCEL = 'CANCEL',
}

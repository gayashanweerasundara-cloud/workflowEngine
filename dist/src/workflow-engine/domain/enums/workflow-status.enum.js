"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowAction = exports.WorkflowStatus = void 0;
var WorkflowStatus;
(function (WorkflowStatus) {
    WorkflowStatus["DRAFT"] = "DRAFT";
    WorkflowStatus["ACTIVE"] = "ACTIVE";
    WorkflowStatus["COMPLETED"] = "COMPLETED";
    WorkflowStatus["REJECTED"] = "REJECTED";
    WorkflowStatus["TERMINATED"] = "TERMINATED";
})(WorkflowStatus || (exports.WorkflowStatus = WorkflowStatus = {}));
var WorkflowAction;
(function (WorkflowAction) {
    WorkflowAction["SUBMIT"] = "SUBMIT";
    WorkflowAction["APPROVE"] = "APPROVE";
    WorkflowAction["REJECT"] = "REJECT";
    WorkflowAction["SEND_BACK"] = "SEND_BACK";
    WorkflowAction["COMMENT"] = "COMMENT";
    WorkflowAction["CANCEL"] = "CANCEL";
})(WorkflowAction || (exports.WorkflowAction = WorkflowAction = {}));
//# sourceMappingURL=workflow-status.enum.js.map
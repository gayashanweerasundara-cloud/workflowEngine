<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  <h1 align="center">Workflow Engine Microservice</h1>
</p>

## Overview

This project is a flexible, plug-and-play Workflow Engine built with **NestJS**, **TypeORM**, and **PostgreSQL**. It allows applications to define custom status flows (Workflow Templates) and manage the lifecycle of business entities (Workflow Instances) through those flows.

It supports:
- **Dynamic Workflow Templates**: Define steps, transitions, and rules.
- **Instance Management**: Track the state of any business entity.
- **Role-Based Transitions**: Restrict actions to specific user roles.
- **Status History**: (Planned) Full audit trail of state changes.

## Architecture

The system is designed using Domain-Driven Design (DDD) principles:

- **Entity Layer**: Defines the core data models (`WorkflowTemplate`, `WorkflowStep`, `WorkflowInstance`).
- **Engine Layer**: Contains the business logic for state transitions and permission checks.
- **API Layer**: Exposes REST endpoints for external systems to interact with the engine.

### Tech Stack
- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Containerization**: Docker & Docker Compose

## API Documentation

### Templates
Manage workflow definitions.

- `POST /templates` - Create a new workflow template.
- `GET /templates` - List all templates.
- `GET /templates/:id` - Get a specific template details.

### Instances
Manage the lifecycle of a specific workflow instance.

- `POST /instances` - Start a new workflow instance.
  - Body: `{ "templateId": "uuid", "businessEntityId": "string", "context": {} }`
- `POST /instances/:id/transition` - Transition an instance to a new state.
  - Body: `{ "action": "APPROVE" | "REJECT" | "SEND_BACK", "roles": ["ADMIN"] }`

## Integration Guide

To integrate this engine with your frontend or backend:

1. **Define a Template**: Create a JSON structure defining your steps (e.g., Draft -> Review -> Approved).
2. **Start a Workflow**: When a user creates a resource (e.g., a "Job"), call `POST /instances` with the Job ID.
3. **Handle User Actions**: Map your UI buttons (Approve, Reject) to the `POST /instances/:id/transition` endpoint.
4. **Sync State**: Use the current step key returned by the API to update your UI state.

## Docker Setup

Run the entire stack (App + DB) with a single command:

```bash
docker compose up --build -d
```

- **App**: `http://localhost:3000`
- **DB**: Port `5432`

### Environment Variables
The `docker-compose.yml` sets default values for development. Create a `.env` file to override them if necessary.

```bash
DATABASE_URL=postgres://user:password@localhost:5432/db_name
```

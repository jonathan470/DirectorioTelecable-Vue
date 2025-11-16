// src/swagger/swagger.config.ts

export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API de Gestión de Proyectos",
    version: "1.0.0",
    description:
      "API RESTful para gestionar personas, proyectos y tareas usando Node, Express y TypeScript",
    contact: {
      name: "Jonathan Rosas",
      email: "jonathan@example.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor de desarrollo",
    },
  ],
  tags: [
    {
      name: "People",
      description: "Operaciones relacionadas con personas",
    },
    {
      name: "Projects",
      description: "Operaciones relacionadas con proyectos",
    },
    {
      name: "Tasks",
      description: "Operaciones relacionadas con tareas",
    },
  ],
  paths: {
    "/api/v1/people": {
      get: {
        tags: ["People"],
        summary: "Obtener todas las personas",
        responses: {
          200: {
            description: "Lista de todas las personas",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Person",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["People"],
        summary: "Crear una nueva persona",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "Jonathan Rosas" },
                  email: { type: "string", example: "jonathan@example.com" },
                  role: { type: "string", example: "admin" },
                },
                required: ["name", "email"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Persona creada exitosamente",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Person",
                },
              },
            },
          },
          400: {
            description: "Datos inválidos - Name y email son requeridos",
          },
        },
      },
    },
    "/api/v1/people/{id}": {
      get: {
        tags: ["People"],
        summary: "Obtener una persona por ID con sus proyectos",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "ID de la persona",
          },
        ],
        responses: {
          200: {
            description: "Persona encontrada con sus proyectos",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/PersonWithProjects",
                },
              },
            },
          },
          404: {
            description: "Persona no encontrada",
          },
        },
      },
      put: {
        tags: ["People"],
        summary: "Actualizar una persona existente",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "Jonathan Rosas Updated" },
                  email: {
                    type: "string",
                    example: "jonathan.new@example.com",
                  },
                  role: { type: "string", example: "super-admin" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Persona actualizada",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Person",
                },
              },
            },
          },
          404: {
            description: "Persona no encontrada",
          },
        },
      },
      delete: {
        tags: ["People"],
        summary: "Eliminar una persona",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          204: {
            description: "Persona eliminada exitosamente",
          },
          404: {
            description: "Persona no encontrada",
          },
        },
      },
    },
    "/api/v1/projects": {
      get: {
        tags: ["Projects"],
        summary: "Obtener todos los proyectos",
        responses: {
          200: {
            description: "Lista de todos los proyectos",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Project",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Projects"],
        summary: "Crear un nuevo proyecto",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "Mint" },
                  description: { type: "string", example: "App Dental" },
                  personId: { type: "integer", example: 1 },
                },
                required: ["name"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Proyecto creado exitosamente",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Project",
                },
              },
            },
          },
          400: {
            description: "Datos inválidos - Name es requerido",
          },
          404: {
            description: "Persona no encontrada",
          },
        },
      },
    },
    "/api/v1/projects/{id}": {
      get: {
        tags: ["Projects"],
        summary: "Obtener un proyecto por ID con sus tareas y persona asignada",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: {
            description: "Proyecto encontrado con sus tareas",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ProjectWithTasks",
                },
              },
            },
          },
          404: {
            description: "Proyecto no encontrado",
          },
        },
      },
      put: {
        tags: ["Projects"],
        summary: "Actualizar un proyecto existente",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "Mint Updated" },
                  description: {
                    type: "string",
                    example: "App Dental Actualizada",
                  },
                  personId: { type: "integer", example: 1 },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Proyecto actualizado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Project",
                },
              },
            },
          },
          404: {
            description: "Proyecto o persona no encontrada",
          },
        },
      },
      delete: {
        tags: ["Projects"],
        summary: "Eliminar un proyecto",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          204: {
            description: "Proyecto eliminado exitosamente",
          },
          404: {
            description: "Proyecto no encontrado",
          },
        },
      },
    },
    "/api/v1/tasks": {
      get: {
        tags: ["Tasks"],
        summary: "Obtener todas las tareas",
        responses: {
          200: {
            description: "Lista de todas las tareas",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Task",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Tasks"],
        summary: "Crear una nueva tarea (por defecto en estado todo)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", example: "Diseñar UI" },
                  description: {
                    type: "string",
                    example: "Pantalla principal",
                  },
                  status: {
                    type: "string",
                    enum: ["todo", "in-progress", "done"],
                    example: "todo",
                  },
                  projectId: { type: "integer", example: 1 },
                },
                required: ["title"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Tarea creada exitosamente",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Task",
                },
              },
            },
          },
          400: {
            description: "Datos inválidos - Title es requerido",
          },
          404: {
            description: "Proyecto no encontrado",
          },
        },
      },
    },
    "/api/v1/tasks/{id}": {
      get: {
        tags: ["Tasks"],
        summary: "Obtener una tarea por ID con información del proyecto",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: {
            description: "Tarea encontrada con información del proyecto",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TaskWithDetails",
                },
              },
            },
          },
          404: {
            description: "Tarea no encontrada",
          },
        },
      },
      put: {
        tags: ["Tasks"],
        summary: "Actualizar una tarea existente",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", example: "Diseñar UI Updated" },
                  description: {
                    type: "string",
                    example: "Pantalla principal mejorada",
                  },
                  status: {
                    type: "string",
                    enum: ["todo", "in-progress", "done"],
                    example: "in-progress",
                  },
                  projectId: { type: "integer", example: 1 },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Tarea actualizada",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Task",
                },
              },
            },
          },
          404: {
            description: "Tarea o proyecto no encontrado",
          },
        },
      },
      delete: {
        tags: ["Tasks"],
        summary: "Eliminar una tarea",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          204: {
            description: "Tarea eliminada exitosamente",
          },
          404: {
            description: "Tarea no encontrada",
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Person: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "ID auto-generado de la persona",
            example: 1,
          },
          name: {
            type: "string",
            description: "Nombre de la persona",
            example: "Jonathan Rosas",
          },
          email: {
            type: "string",
            description: "Email de la persona",
            example: "jonathan@example.com",
          },
          role: {
            type: "string",
            description: "Rol de la persona",
            example: "admin",
          },
        },
      },
      PersonWithProjects: {
        allOf: [
          { $ref: "#/components/schemas/Person" },
          {
            type: "object",
            properties: {
              projects: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/ProjectWithTasks",
                },
              },
            },
          },
        ],
      },
      Project: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "ID auto-generado del proyecto",
            example: 1,
          },
          name: {
            type: "string",
            description: "Nombre del proyecto",
            example: "Mint",
          },
          description: {
            type: "string",
            description: "Descripción del proyecto",
            example: "App Dental",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            description: "Fecha de creación",
          },
          personId: {
            type: "integer",
            nullable: true,
            description: "ID de la persona asignada",
            example: 1,
          },
        },
      },
      ProjectWithTasks: {
        allOf: [
          { $ref: "#/components/schemas/Project" },
          {
            type: "object",
            properties: {
              tasks: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Task",
                },
              },
              person: {
                oneOf: [
                  { $ref: "#/components/schemas/Person" },
                  { type: "null" },
                ],
              },
            },
          },
        ],
      },
      Task: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "ID auto-generado de la tarea",
            example: 1,
          },
          title: {
            type: "string",
            description: "Título de la tarea",
            example: "Diseñar UI",
          },
          description: {
            type: "string",
            description: "Descripción de la tarea",
            example: "Pantalla principal",
          },
          status: {
            type: "string",
            enum: ["todo", "in-progress", "done"],
            description: "Estado de la tarea",
            example: "todo",
          },
          projectId: {
            type: "integer",
            nullable: true,
            description: "ID del proyecto asociado",
            example: 1,
          },
        },
      },
      TaskWithDetails: {
        allOf: [
          { $ref: "#/components/schemas/Task" },
          {
            type: "object",
            properties: {
              project: {
                oneOf: [
                  { $ref: "#/components/schemas/Project" },
                  { type: "null" },
                ],
              },
              person: {
                oneOf: [
                  { $ref: "#/components/schemas/Person" },
                  { type: "null" },
                ],
              },
            },
          },
        ],
      },
    },
  },
};
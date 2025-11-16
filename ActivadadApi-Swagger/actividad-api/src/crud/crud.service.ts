// src/crud/crud.service.ts

import {
  Person,
  Project,
  Task,
  PersonWithProjects,
  ProjectWithTasks,
  TaskWithDetails,
  CreatePersonDTO,
  UpdatePersonDTO,
  CreateProjectDTO,
  UpdateProjectDTO,
  CreateTaskDTO,
  UpdateTaskDTO
} from './crud.model';

// "Base de datos" en memoria
const projects: Project[] = [
  { id: 1, name: 'Mint', description: 'App Dental', createdAt: new Date(), personId: 1 }
];

const tasks: Task[] = [
  { id: 1, title: 'Diseñar UI', description: 'Pantalla principal', status: 'todo', projectId: 1 }
];

const peoples: Person[] = [
  { id: 1, name: 'Jonathan Rosas', email: 'jonathan@example.com', role: 'admin' }
];

// Contadores simples para IDs
let currentPersonId = 2;
let currentProjectId = 2;
let currentTaskId = 2;

export class CrudService {
  // ========== PERSONAS ==========
  
  getAllPeople(): Person[] {
    return peoples;
  }

  getPersonById(id: number): PersonWithProjects | undefined {
    const person = peoples.find(p => p.id === id);
    if (!person) {
      return undefined;
    }

    const personProjects = projects.filter(proj => proj.personId === person.id);
    const projectsWithTasks: ProjectWithTasks[] = personProjects.map(project => {
      const projectTasks = tasks.filter(t => t.projectId === project.id);
      return { ...project, tasks: projectTasks };
    });

    return { ...person, projects: projectsWithTasks };
  }

  createPerson(data: CreatePersonDTO): Person {
    const newPerson: Person = {
      id: currentPersonId++,
      name: data.name,
      email: data.email,
      role: data.role || 'user'
    };

    peoples.push(newPerson);
    return newPerson;
  }

  updatePerson(id: number, data: UpdatePersonDTO): Person | null {
    const person = peoples.find(p => p.id === id);
    if (!person) {
      return null;
    }

    if (data.name !== undefined) {
      person.name = data.name;
    }

    if (data.email !== undefined) {
      person.email = data.email;
    }

    if (data.role !== undefined) {
      person.role = data.role;
    }

    return person;
  }

  deletePerson(id: number): boolean {
    const index = peoples.findIndex(p => p.id === id);
    if (index === -1) {
      return false;
    }
    peoples.splice(index, 1);
    return true;
  }

  // ========== PROYECTOS ==========

  getAllProjects(): Project[] {
    return projects;
  }

  getProjectById(id: number): ProjectWithTasks | undefined {
    const project = projects.find(p => p.id === id);
    if (!project) {
      return undefined;
    }

    const projectTasks = tasks.filter(t => t.projectId === project.id);
    const person = peoples.find(p => p.id === project.personId);

    return { ...project, tasks: projectTasks, person: person || null };
  }

  createProject(data: CreateProjectDTO): Project | { error: string } {
    // Validar que la persona existe si se proporciona personId
    if (data.personId !== undefined) {
      const personExists = peoples.find(p => p.id === data.personId);
      if (!personExists) {
        return { error: 'Person not found' };
      }
    }

    const newProject: Project = {
      id: currentProjectId++,
      name: data.name,
      description: data.description || '',
      createdAt: new Date(),
      personId: data.personId || null
    };

    projects.push(newProject);
    return newProject;
  }

  updateProject(id: number, data: UpdateProjectDTO): Project | { error: string } | null {
    const project = projects.find(p => p.id === id);
    if (!project) {
      return null;
    }

    // Validar que la persona existe si se proporciona personId
    if (data.personId !== undefined && data.personId !== null) {
      const personExists = peoples.find(p => p.id === data.personId);
      if (!personExists) {
        return { error: 'Person not found' };
      }
    }

    if (data.name !== undefined) {
      project.name = data.name;
    }

    if (data.description !== undefined) {
      project.description = data.description;
    }

    if (data.personId !== undefined) {
      project.personId = data.personId;
    }

    return project;
  }

  deleteProject(id: number): boolean {
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) {
      return false;
    }
    projects.splice(index, 1);
    return true;
  }

  // ========== TAREAS ==========

  getAllTasks(): Task[] {
    return tasks;
  }

  getTaskById(id: number): TaskWithDetails | undefined {
    const task = tasks.find(t => t.id === id);
    if (!task) {
      return undefined;
    }

    const project = projects.find(p => p.id === task.projectId);
    let person: Person | null = null;

    if (project) {
      person = peoples.find(p => p.id === project.personId) || null;
    }

    return { ...task, project: project || null, person };
  }

  createTask(data: CreateTaskDTO): Task | { error: string } {
    // Validar que el proyecto existe si se proporciona projectId
    if (data.projectId !== undefined) {
      const projectExists = projects.find(p => p.id === data.projectId);
      if (!projectExists) {
        return { error: 'Project not found' };
      }
    }

    const newTask: Task = {
      id: currentTaskId++,
      title: data.title,
      description: data.description || '',
      // Por defecto las tareas se crean en estado "todo"
      status: data.status || 'todo',
      projectId: data.projectId || null
    };

    tasks.push(newTask);
    return newTask;
  }

  updateTask(id: number, data: UpdateTaskDTO): Task | { error: string } | null {
    const task = tasks.find(t => t.id === id);
    if (!task) {
      return null;
    }

    // Validar que el proyecto existe si se proporciona projectId
    if (data.projectId !== undefined && data.projectId !== null) {
      const projectExists = projects.find(p => p.id === data.projectId);
      if (!projectExists) {
        return { error: 'Project not found' };
      }
    }

    if (data.title !== undefined) {
      task.title = data.title;
    }

    if (data.description !== undefined) {
      task.description = data.description;
    }

    if (data.status !== undefined) {
      task.status = data.status;
    }

    if (data.projectId !== undefined) {
      task.projectId = data.projectId;
    }

    return task;
  }

  deleteTask(id: number): boolean {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
      return false;
    }
    tasks.splice(index, 1);
    return true;
  }

  // ========== VALIDACIONES ==========

  // Validar que el estado de la tarea sea uno de los permitidos
  isValidTaskStatus(status: string): status is Task['status'] {
    return status === 'todo' || status === 'in-progress' || status === 'done';
  }

  // Validar que un email tenga formato correcto
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Exportamos una única instancia del servicio
export const crudService = new CrudService();
// src/crud/crud.model.ts

export interface Person {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  personId: number | null;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  projectId: number | null;
}

export interface PersonWithProjects extends Person {
  projects: ProjectWithTasks[];
}

export interface ProjectWithTasks extends Project {
  tasks: Task[];
  person?: Person | null;
}

export interface TaskWithDetails extends Task {
  project: Project | null;
  person: Person | null;
}

export interface Database {
  projects: Project[];
  tasks: Task[];
  peoples: Person[];
}

export interface CreatePersonDTO {
  name: string;
  email: string;
  role?: string;
}

export interface UpdatePersonDTO {
  name?: string;
  email?: string;
  role?: string;
}

export interface CreateProjectDTO {
  name: string;
  description?: string;
  personId?: number;
}

export interface UpdateProjectDTO {
  name?: string;
  description?: string;
  personId?: number | null;
}

export interface CreateTaskDTO {
  title: string;
  description?: string;
  status?: 'todo' | 'in-progress' | 'done';
  projectId?: number;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  status?: 'todo' | 'in-progress' | 'done';
  projectId?: number | null;
}
// src/crud/crud.routes.ts

import { Router, Request, Response } from 'express';
import { crudService } from './crud.service';

const router = Router();

// ========== RUTAS PARA PERSONAS ==========

router.post('/people', (req: Request, res: Response) => {
  const { name, email, role } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  const newPerson = crudService.createPerson({ name, email, role });
  res.status(201).json(newPerson);
});

router.get('/people', (req: Request, res: Response) => {
  const people = crudService.getAllPeople();
  res.json(people);
});

router.get('/people/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const person = crudService.getPersonById(id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).json({ message: 'Person not found' });
  }
});

router.put('/people/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const person = crudService.updatePerson(id, req.body);

  if (person) {
    res.json(person);
  } else {
    res.status(404).json({ message: 'Person not found' });
  }
});

router.delete('/people/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const deleted = crudService.deletePerson(id);

  if (deleted) {
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Person not found' });
  }
});

// ========== RUTAS PARA PROYECTOS ==========

router.post('/projects', (req: Request, res: Response) => {
  const { name, description, personId } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const result = crudService.createProject({ name, description, personId });

  if ('error' in result) {
    return res.status(404).json({ message: result.error });
  }

  res.status(201).json(result);
});

router.get('/projects', (req: Request, res: Response) => {
  const projects = crudService.getAllProjects();
  res.json(projects);
});

router.get('/projects/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const project = crudService.getProjectById(id);

  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});

router.put('/projects/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = crudService.updateProject(id, req.body);

  if (result === null) {
    return res.status(404).json({ message: 'Project not found' });
  }

  if ('error' in result) {
    return res.status(404).json({ message: result.error });
  }

  res.json(result);
});

router.delete('/projects/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const deleted = crudService.deleteProject(id);

  if (deleted) {
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});

// ========== RUTAS PARA TAREAS ==========

router.post('/tasks', (req: Request, res: Response) => {
  const { title, description, status, projectId } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const result = crudService.createTask({ title, description, status, projectId });

  if ('error' in result) {
    return res.status(404).json({ message: result.error });
  }

  res.status(201).json(result);
});

router.get('/tasks', (req: Request, res: Response) => {
  const tasks = crudService.getAllTasks();
  res.json(tasks);
});

router.get('/tasks/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const task = crudService.getTaskById(id);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

router.put('/tasks/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = crudService.updateTask(id, req.body);

  if (result === null) {
    return res.status(404).json({ message: 'Task not found' });
  }

  if ('error' in result) {
    return res.status(404).json({ message: result.error });
  }

  res.json(result);
});

router.delete('/tasks/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const deleted = crudService.deleteTask(id);

  if (deleted) {
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

export default router;
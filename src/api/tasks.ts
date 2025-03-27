import { Task } from "../types/Task.types";
import axios from "./axios";


export const getTasksRequest = () => axios.get<Task[]>('/tasks');

export const getTaskRequest = (id: string) => axios.get<Task>(`/tasks/${id}`);

export const createTaskRequest = (task: Task) => axios.post<Task>('/tasks', task);

export const updateTaskRequest = (id: string, task: Partial<Task>) => axios.put<Task>(`/tasks/${id}`, task);

export const deleteTaskRequest = (id: string) => axios.delete<void>(`/tasks/${id}`);

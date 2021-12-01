import { Task } from "../models/Task";

import axios, { AxiosInstance } from 'axios';

export class TaskService {
    readonly dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

    httpClient: AxiosInstance;


    constructor(baseUrl: string) {
        this.httpClient = axios.create({ 'baseURL': baseUrl });
        this.deserializeDate.bind(this);
    }

    async addTask(task: Task): Promise<Task> {
        task.createdDate = new Date();
        let result = await this.httpClient.post("/tasks", task);
        return result.data;
    }

    async deleteTask(taskId?: string): Promise<boolean> {
        let result = await this.httpClient.delete(`/tasks/${taskId}`);
        return result.status === 200;
    }

    async loadTasks(): Promise<Task[]> {
        let response = await this.httpClient.get("/tasks");
        const tasks = response.data;
        tasks.forEach((task:Task) => {this.deserializeTask(task)});
        return tasks;
    }

    private deserializeTask(task: any): Task {
        if (task) {
            task.createdDate = this.deserializeDate(task.createdDate);
        }
        return task;
    }

    private deserializeDate(value: any): any {
        if (typeof value === "string" && this.dateFormat.test(value)) {
            return new Date(value);
        }
        return value;
    }
}
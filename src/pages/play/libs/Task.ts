import { sha1 } from 'object-hash';

export class User {
    private static readonly USERS: User[] = [];
    public static readonly DEFAULT_USER: User = new User();

    private points: number = 0;

    constructor() {
        User.USERS.push(this);
    }

    public getPoints(): number {
        return this.points;
    }

    public addPoints(points: number): void {
        this.points += points;
    }

    public static saveUserToLocalStorage(): void {
        localStorage.setItem("userPoints", JSON.stringify(User.DEFAULT_USER.points));
    }

    public static loadUserFromLocalStorage(): void {
        const storedPoints = localStorage.getItem("userPoints");
        if (storedPoints) {
            User.DEFAULT_USER.points = JSON.parse(storedPoints);
        }
    }
}

export default class Task {
    private static readonly TASK_LIST: Task[] = [];

    private readonly needUnlock: boolean;
    private readonly points: number;
    private readonly name: string;
    private readonly path: string;
    private readonly unlockPoints: number;

    private completed: boolean = false;
    private unlocked: boolean = false;
    private hashCode: string;

    constructor(points: number, name: string, path: string, unlockPoints: number) {
        if (!points || points === 0 || points < 0 || (unlockPoints === undefined) || unlockPoints < 0 || !name || name.length === 0 || !path || path.length === 0) {
            throw new Error(`Invalid Arguments: points=${points}, text=${name}, path=${path}, unlockPoints=${unlockPoints}`);
        }

        this.points = points;
        this.path = path;
        this.name = name;
        this.unlockPoints = unlockPoints;
        this.needUnlock = unlockPoints > 0;

        if (!this.needUnlock) {
            this.unlocked = true;
        }

        Task.TASK_LIST.push(this);

        this.hashCode = sha1(this);
    }

    public setHashCode(hash: string): void {
        this.hashCode = hash;
    }

    public canUnlock(user: User): boolean {
        if (!this.needUnlock) throw new Error('Task does not need unlock');
        if (this.completed) throw new Error('Task cannot be unlocked after completion');
        if (this.unlocked) throw new Error('Task is already unlocked');

        return user.getPoints() >= this.unlockPoints;
    }

    public completeTask(user: User, forceUpdate: React.DispatchWithoutAction): void {
        if (!this.unlocked) throw new Error("Task is locked");
        if (this.completed) throw new Error("Task is already completed");

        this.completed = true;
        user.addPoints(this.points);

        Task.saveTasksToLocalStorage();
        User.saveUserToLocalStorage();

        forceUpdate();
    }

    public unlockTask(user: User, forceUpdate: React.DispatchWithoutAction): void {
        if (!this.canUnlock(user)) throw new Error("Insufficient points");

        this.unlocked = true;
        user.addPoints(-this.unlockPoints);

        Task.saveTasksToLocalStorage();
        User.saveUserToLocalStorage();

        forceUpdate();
    }

    public static getAllTasks(): Task[] {
        return this.TASK_LIST;
    }

    public static getAllSelectivityTasks(predicate: (task: Task) => boolean): Task[] {
        return this.getAllTasks().filter(predicate);
    }

    public getTaskName(): string {
        return this.name;
    }

    public getPath(): string {
        return this.path;
    }

    public isCompleted(): boolean {
        return this.completed;
    }

    public isUnlocked(): boolean {
        return this.unlocked;
    }

    public getUnlockPoints(): number {
        return this.unlockPoints;
    }

    public getPoints(): number {
        return this.points;
    }

    public getHashCode(): string {
        return this.hashCode;
    }

    public static saveTasksToLocalStorage(): void {
        const tasksData = this.TASK_LIST.map(task => ({
            points: task.points, 
            name: task.name,
            path: task.path,
            unlockPoints: task.unlockPoints,
            completed: task.completed,
            unlocked: task.unlocked,
            hashCode: task.hashCode
        }));
        localStorage.setItem("tasks", JSON.stringify(tasksData));
    }

    public static loadTasksFromLocalStorage(): void {
        const tasksData = localStorage.getItem("tasks");
        if (tasksData) {
            try {
                const existingTasks = new Set(Task.getAllTasks().map(task => task.getTaskName()));
                const parsedTasks = JSON.parse(tasksData);
                parsedTasks.forEach((savedTask: { points: number, name: string, path: string, unlockPoints: number, completed: boolean, unlocked: boolean, hashCode: string }) => {
                    try {
                        if (!existingTasks.has(savedTask.name)) {
                            const task = new Task(savedTask.points, savedTask.name, savedTask.path, savedTask.unlockPoints);
                            task.completed = savedTask.completed;
                            task.unlocked = savedTask.unlocked;
                            task.setHashCode(savedTask.hashCode);
                        }
                    } catch (error) {
                        console.error("Task creation failed", error);
                    }
                });
            } catch (error) {
                console.error("Error loading tasks from localStorage:", error);
            }
        }
    }
}
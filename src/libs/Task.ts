import { sha1 } from 'object-hash';
import { ItemType, MANAGER } from "@/pages/user/ItemHandler";
import { checkAndGetUser } from '@/pages/user/User';
import { isNullish } from 'utility-types';

export class User {
    private static readonly USERS: User[] = [];
    public static readonly DEFAULT_USER: User = new User();

    private points: number = 0;
    private hook: (number: number) => void = (): void => { };

    constructor() {
        User.USERS.push(this);
    }

    public getPoints(): number {
        return this.points;
    }

    public setHook(hook: (number: number) => void) {
        this.hook = hook;
    }

    public getHook(): (number: number) => void {
        return this.hook;
    }

    public addPoints(points: number): void {
        this.points += points;
    }

    public static async saveUserToServer(): Promise<void> {
        await MANAGER.set(checkAndGetUser(), ItemType.USER_POINTS, User.DEFAULT_USER.points);
    }

    public static async loadUserFromServer(): Promise<void> {
        User.DEFAULT_USER.points = MANAGER.getCurrentData()[ItemType.USER_POINTS];
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

    public async completeTask(user: User, forceUpdate: React.DispatchWithoutAction): Promise<void> {
        if (!this.unlocked) throw new Error("Task is locked");
        if (this.completed) throw new Error("Task is already completed");

        this.completed = true;
        user.addPoints(this.points);
        user.getHook()(user.getPoints());

        await Task.saveTasksToServer();
        await User.saveUserToServer();

        forceUpdate();
    }

    public async unlockTask(user: User, forceUpdate: React.DispatchWithoutAction): Promise<void> {
        if (!this.canUnlock(user)) throw new Error("Insufficient points");

        this.unlocked = true;
        user.addPoints(-this.unlockPoints);
        user.getHook()(user.getPoints());

        await Task.saveTasksToServer();
        await User.saveUserToServer();

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

    public static async saveTasksToServer(): Promise<void> {
        await MANAGER.set(checkAndGetUser(), ItemType.TASKS, this.TASK_LIST);
    }

    public static async loadTasksFromServer(): Promise<void> {
        if (isInit) return;
        
        const tasksData = MANAGER.getCurrentData()[ItemType.TASKS];
        if (isNullish(tasksData)) throw new Error("Why is null?");

        tasksData.forEach(savedTask => {
            const task = new Task(savedTask.points, savedTask.name, savedTask.path, savedTask.unlockPoints);
            task.completed = savedTask.completed;
            task.unlocked = savedTask.unlocked;
            task.setHashCode(savedTask.hashCode);
        });
        isInit = true;
    }
}

export let isInit = false;
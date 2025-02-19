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
}

export default class Task {
    private static readonly TASK_LIST: Task[] = [];

    private readonly needUnlock: boolean;
    private readonly points: number;
    private readonly name: string;
    private readonly unlockPoints: number;
    private readonly path: string;

    private completed: boolean = false;
    private unlocked: boolean = false;

    private readonly hashCode: string;

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

    public completeTask(user: User, forceUpdate: React.DispatchWithoutAction): void {
        if (!this.unlocked) throw new Error('Task is locked');
        if (this.completed) throw new Error('Task is already completed');

        this.completed = true;
        user.addPoints(this.points);

        forceUpdate();
    }

    public canUnlock(user: User): boolean {
        if (!this.needUnlock) throw new Error('Task does not need unlock');
        if (this.completed) throw new Error('Task cannot be unlocked after completion');
        if (this.unlocked) throw new Error('Task is already unlocked');

        return user.getPoints() >= this.unlockPoints;
    }

    public unlockTask(user: User, forceUpdate: React.DispatchWithoutAction): void {
        if (!this.canUnlock(user)) throw new Error('Insufficient points');

        this.unlocked = true;
        user.addPoints(-this.unlockPoints);

        forceUpdate();
    }

    public static getAllTasks(): Task[] {
        return this.TASK_LIST;
    }

    public static getAllSelectivityTasks(predicate: (task: Task) => boolean): Task[] {
        return this.TASK_LIST.filter(predicate);
    }

    public static addTask(task: Task): void {
        this.TASK_LIST.push(task);
    }

    public static getTaskId(task: Task): number {
        return this.TASK_LIST.indexOf(task);
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
}
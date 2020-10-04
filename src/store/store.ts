import { DayTasks } from '@/models/DayTasks';
import { State, Getter, Action, Mutation } from 'vuex-simple';

export class MyStore {
    @State()
    public theDay: Date = new Date();

    constructor(d: Date = new Date()) {
        d.setHours(0, 0, 0, 0);
        this.theDay = d;
        var dt = new DayTasks();
        dt.date = this.theDay;
        dt.tasks = ['Выполнить задание'];
        this.taskList = [dt];
    }

    @State()
    public taskList = Array<DayTasks>();

    @Mutation()
    public setTheDay(date: Date) {
        this.theDay = date;
    }

    @Action()
    public actionChangeCurDay(date: Date) {
        this.setTheDay(date);
    }

    @Mutation()
    public setDayTasks(dayTasks: DayTasks) {
        var dt = this.taskList.find(x => x.date.toDateString() === dayTasks.date.toDateString());

        if (dt) {
            var idt = this.taskList.indexOf(dt);
            this.taskList.splice(idt, 1);
        }
        this.taskList.push(dayTasks);
    }

    @Action()
    public actionAddTask(task: string) {
        var dt = this.taskList.find(x => x.date.toDateString() === this.theDay.toDateString());
        var tasks = Array<string>();
        if (dt) {
            tasks = Object.assign([], dt.tasks);

        }
        tasks.push(task);
        var new_dt = new DayTasks();
        new_dt.date = this.theDay;
        new_dt.tasks = tasks;

        this.setDayTasks(new_dt);
    }


    @Getter()
    public get aCurrentDay() {
        return this.theDay;
    }

    @Getter()
    public get dayTasks(): DayTasks {
        var dt = new DayTasks();
        dt.date = this.theDay;
        dt.tasks = Array<string>();
        var t = this.taskList.find(x => x.date.toDateString() === this.theDay.toDateString());
        if (t) dt = t;
        return dt;
    }
}
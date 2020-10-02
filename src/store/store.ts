import { State, Getter, Action, Mutation } from 'vuex-simple';

export class MyStore {
    @State()
    public theDay: number = new Date().getDate();

    // @State()
    // public taskList = [];

    @Mutation()
    public setCurDay(day: number) {
        this.theDay = day;
    }

    @Action()
    public async actionChangeCurDay(day: number) {
        await new Promise(r => setTimeout(r, 100));
        this.setCurDay(day);
    }

    @Getter()
    public get aCurrentDay() {
        return this.theDay;
    }
}
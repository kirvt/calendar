import { Component, Prop, Vue } from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';

import { useStore } from 'vuex-simple';
import { MyStore } from '@/store/store';

import styles from './Calendar.css?module'
import { DayTasks } from '@/models/DayTasks';

interface Props {
    curDay: Date,
    taskList: Array<DayTasks>;
}

@Component
export default class Calendar extends VueComponent<Props> {
    @Prop()
    curDay!: Date;

    @Prop()
    taskList!: Array<DayTasks>;

    public store: MyStore = useStore(this.$store);
    dayNames: Array<string> = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    get curDate(): string {
        var monthName = this.curDay.toLocaleString('ru-RU', { month: 'long' });
        return monthName.charAt(0).toUpperCase() + monthName.slice(1) + ' ' + this.curDay.getFullYear();
    }

    get week(): Array<JSX.Element> {
        var theWeek = Array<JSX.Element>();
        this.dayNames.forEach(dn => { theWeek.push(<span>{dn}</span>) });
        return theWeek;
    }

    get allDays(): Array<JSX.Element> {
        var month = [];

        //get current month's 1st day of week number
        var year = this.curDay.getFullYear(), mnth = this.curDay.getMonth();
        var firstDay = new Date(year, mnth, 1);
        var lastDay = new Date(year, mnth + 1, 0).getDate();
        var dOw = firstDay.getDay();

        for (var i = 1; i < dOw; i++) {
            month.push(<div />);
        }

        for (var d = 1; d <= lastDay; d++) {
            var day = new Date(year, mnth, d)
            month.push(<div class={[this.isCurrent(day) ? styles.active : '', this.hasTasks(day) ? styles.busy : '']} onclick={this.setCurDay.bind(this, day)}>{day.getDate()}</div>);
        }

        return month;
    }

    hasTasks(date: Date): boolean {
        var dt = this.taskList.find(x => x.date.toDateString() === date.toDateString());
        if (dt && dt.tasks.length > 0) return true;
        return false;
    }

    setCurDay(date: Date) {
        date.setHours(0, 0, 0, 0);
        this.store.actionChangeCurDay(date);
    }

    isCurrent(date: Date) {
        date.setHours(0, 0, 0, 0);
        return date.toDateString() === this.curDay.toDateString()
    }

    render() {
        return (
            <div class={[styles.calendar, 'box']}>
                <div class={styles.month}>{this.curDate}</div>
                <div class={styles.week}>{this.week}</div>
                <div class={styles.days}>
                    {this.allDays}
                </div>
            </div>
        )
    }
}
import { Component, Prop, Vue } from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';

import { useStore } from 'vuex-simple';
import { MyStore } from '@/store/store';

import styles from './Calendar.css?module'

interface Props {
    curDay: Date,
    hasTasks: boolean
}

@Component
export default class Calendar extends VueComponent<Props> {
    @Prop()
    curDay!: Date;

    @Prop()
    hasTasks!: boolean;

    public store: MyStore = useStore(this.$store);
    dayNames: Array<string> = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    get curDate(): string {
        var monthName = this.curDay.toLocaleString('ru-RU', { month: 'long' });
        return monthName.charAt(0).toUpperCase() + monthName.slice(1) + ' ' + this.curDay.getFullYear();
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
            month.push(<div class={this.dayClass(day)} onclick={this.setCurDay.bind(this, day)}>{day.getDate()}</div>);
        }

        return month;
    }

    dayClass(date: Date): string {
        var classes = [];
        var classtring = '';
        if (this.isCurrent(date)) classes.push('active');
        if (this.hasTasks) classes.push('styles.busy');
        if (classes.length > 0) {
            classes.forEach(c => classtring += c + ",")
        }
        return classtring.slice(0, -1);
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
            <div>
                <h2>{this.curDate}</h2>
                <div class={styles.days}>
                    {this.allDays}
                </div>
            </div>
        )
    }
}
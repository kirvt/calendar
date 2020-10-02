import { Component, Prop, Vue } from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';
import Day from './day/Day'

//import styles from './Calendar.css?module'

interface Props {
    curDay: number,
}

@Component
export default class Calendar extends VueComponent<Props> {
    @Prop()
    curDay!: number;

    dayNames: Array<string> = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    get curDate(): string {
        var today = new Date();
        var monthName = today.toLocaleString('ru-RU', { month: 'long' });
        return monthName.charAt(0).toUpperCase() + monthName.slice(1) + ' ' + today.getFullYear();
    }

    get allDays(): Array<Array<string>> {
        var month = [];
        //get this month's 1st day of week number
        var today = new Date(), year = today.getFullYear(), mths = today.getMonth();
        console.log(today);

        var firstDay = new Date(year, mths, 1);
        console.log(firstDay);

        var lastDay = new Date(year, mths + 1, 0).getDate();
        console.log(lastDay);

        var dOw = firstDay.getDay();
        console.log(dOw);

        var week = Array.from(Array(dOw - 1), x => '');
        for (var d = 1; d <= lastDay; d++) {
            // if (d < 1 || d > lastDay) { week.push('') } 
            // else {  }

            week.push(d.toString());

            if (week.length === 7 || d === lastDay) {
                month.push(week);
                week = []
            }
        }
        console.log(month);
        return month;
    }

    render() {
        return (
            <div>
                {this.curDate}
                <table>
                    <tr>
                        {this.dayNames.map(dn => <th>{dn}</th>)}
                    </tr>
                    {this.allDays.map(w => <tr>{w.map(d => <td><Day theDay={d} /></td>)}</tr>)}
                </table>
            </div>
        )
    }
}
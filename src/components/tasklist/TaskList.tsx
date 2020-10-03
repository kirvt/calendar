import { Component, Prop, Vue } from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';

import { useStore } from 'vuex-simple';
import { MyStore } from '@/store/store';

import { DayTasks } from '@/models/DayTasks';

import styles from './TaskList.css?module'

interface Props {
    dayTasks: DayTasks,
}

@Component
export default class TaskList extends VueComponent<Props> {
    @Prop()
    dayTasks!: DayTasks;

    public store: MyStore = useStore(this.$store);

    get curDate(): string {
        var today = new Date();
        var monthName = today.toLocaleString('ru-RU', { month: 'long' });
        return monthName.charAt(0).toUpperCase() + monthName.slice(1) + ' ' + today.getFullYear();
    }

    addTask(e: KeyboardEvent) {
        if (e.key === "Enter") {
            var val = (e.target as HTMLInputElement).value
            console.log(val);
            this.store.actionAddTask(val);
            (e.target as HTMLInputElement).value = '';
        }
    }

    render() {
        return (
            <div class={[styles.tasklist, 'box']}>
                <div class={styles.header}>События</div>
                <div class={styles.tasks}>
                    <ul>
                       {this.dayTasks.tasks.map(task => <li> <input type="checkbox"/>{task}</li>)}
                    </ul>

                    <input type="text" placeholder="Текст" onkeypress={this.addTask.bind(this)} />
                </div>
            </div>
        )
    }
}
import { Component, Vue } from 'vue-property-decorator';
import Calendar from './components/calendar/Calendar';
import TaskList from './components/tasklist/TaskList';

import { useStore } from 'vuex-simple';
import { MyStore } from '@/store/store';

import './App.css';
import { DayTasks } from './models/DayTasks';

@Component
export default class App extends Vue {
  public store: MyStore = useStore(this.$store);

  get curDayTasks(): DayTasks {
    return this.store.dayTasks
  }

  get anyTask(): boolean {
    return this.curDayTasks.tasks.length > 0
  }

  render() {
    return (
      <div id="app">
        <Calendar curDay={this.store.theDay} taskList={this.store.taskList} />
        <TaskList dayTasks={this.curDayTasks} />
      </div>
    )
  }
}

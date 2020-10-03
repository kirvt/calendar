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

  windowHeight: number = window.innerHeight;

  get curDayTasks(): DayTasks {
    return this.store.dayTasks
  }

  get anyTask(): boolean {
    return this.curDayTasks.tasks.length > 0
  }

  get wHeight(): string {
    return "height:" + this.windowHeight + "px";
  }

  mounted() {
    window.addEventListener("resize", () => {
      this.windowHeight = window.innerHeight;
    })
  }

  render() {
    return (
      <div id="app" style={this.wHeight}>
        <div id="container">
          <Calendar curDay={this.store.theDay} taskList={this.store.taskList} />
          <TaskList dayTasks={this.curDayTasks} />
        </div>
      </div>
    )
  }
}

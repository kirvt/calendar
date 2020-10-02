import { Component, Vue } from 'vue-property-decorator';
import Calendar from './components/calendar/Calendar';

import { useStore } from 'vuex-simple';
import { MyStore } from '@/store/store';

@Component
export default class App extends Vue {
  public store: MyStore = useStore(this.$store);

  render() {
    return (
      <div id="app">
        {/* <img alt="Vue logo" src={require('./assets/logo.png')} />
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" msg1="111" /> */}
        <Calendar curDay={this.store.theDay} />
      </div>
    )
  }
}

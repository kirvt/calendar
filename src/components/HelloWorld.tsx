import { Component, Prop, Vue } from 'vue-property-decorator';
import { VueComponent } from '../shims-vue';

import styles from './HelloWorld.css?module'

interface Props {
  msg: string,
  msg1: string
}

@Component
export default class HelloWorld extends VueComponent<Props> {

  @Prop()
  private msg!: string;

  @Prop()
  private msg1!: string;
  
  myvar:string = "jopa";

  render() {
    return (
      <div class={styles.hello}>
        <h1>{ this.msg }</h1>

        <p>
          { this.myvar }
        </p>
        { this.msg1 }
      </div>
    )
  }
}

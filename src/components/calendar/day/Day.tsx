import { Component, Prop, Vue } from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';


interface Props {
    theDay: string,
}

@Component
export default class Day extends VueComponent<Props> {
    @Prop()
    theDay!: string;


    render() {
        return (
            <div class={this.theDay === "5" ? 'today' : ''}>{this.theDay}         
            </div>
        )
    }
}
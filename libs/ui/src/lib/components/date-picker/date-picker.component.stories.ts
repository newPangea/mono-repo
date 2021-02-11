import { select } from '@storybook/addon-knobs';
import { DatePickerComponent } from './date-picker.component';
import { Story, Meta } from '@storybook/angular';
import { UiModule } from '../../ui.module';
import { IonicModule } from '@ionic/angular';

export default {
  title: 'atomic/DatePicker',
} as Meta;

export const Default: Story<DatePickerComponent> = () => ({
  moduleMetadata: {
    imports: [IonicModule.forRoot(), UiModule],
  },
  component: DatePickerComponent,
  props: {
    displayFormat: select('displayFormat', ['MM/DD/YY'], 'MM/DD/YY'),
  },
});

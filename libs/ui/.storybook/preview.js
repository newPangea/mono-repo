import { addDecorator } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';


addDecorator(withKnobs);

export const parameters = {
  html: {
    root: '#root',
    prettier: {
      tabWidth: 4,
      useTabs: false,
      htmlWhitespaceSensitivity: 'strict',
    },
  },
};

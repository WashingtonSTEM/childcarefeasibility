import Button from '../components/Button'

import '../styles/globals.css'

const Story = {
  title: 'Button',
  component: Button,
  argTypes: {
    variant: {
      control: false,
    },
    textAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
    }
  },
}

const Template = (args) => <Button {...args}>{args.text}</Button>
const defaulrArgs = {
  text: 'Next',
  textAlign: 'center',
  disabled: false
}

export const Primary = Template.bind({})
Primary.args = defaulrArgs

export const Secondary = Template.bind({})
Secondary.args = {
  variant: 'secondary',
  ...defaulrArgs
}

export default Story

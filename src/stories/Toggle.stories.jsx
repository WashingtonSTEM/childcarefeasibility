import Toggle from "../components/Toggle"

import '../styles/globals.css'

const Story = {
  title: 'Toggle',
  component: Toggle,
  argTypes: {
    textAlign: {
      control: 'select',
      options: ['left', 'right'],
    },
    onChange: { action: "cha" },
  },
}

const Template = (args) => <Toggle {...args} />

export const Uncontrolled = Template.bind({})
Uncontrolled.args = {
  label: 'Uncontrolled toggle',
  textAlign: 'left',
  onChange: (event) => console.log(event.target),
}

export const Controlled = Template.bind({})
Controlled.args = {
  label: 'Controlled toggle',
  textAlign: 'left',
  onChange: (event) => console.log(event.target),
  checked: false
}

export default Story

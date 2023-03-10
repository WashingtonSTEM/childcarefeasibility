import StepBar from "../components/StepBar"

import '../styles/globals.css'

const Story = {
  title: 'Step Bar',
  component: StepBar,
  argTypes: {
    step: {
      control: {
        type: 'number',
        min:0
      }
    }
  }
}

const Template = (args) => (
  <div style={{ width: 360 }}>
    <StepBar {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  step: 2,
  steps: 5
}

export default Story
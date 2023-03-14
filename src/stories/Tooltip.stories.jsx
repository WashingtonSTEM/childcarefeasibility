import Tooltip from '../components/Tooltip'

import '../styles/globals.css'

const Story = {
  title: 'Tooltip',
  component: Tooltip,
  argTypes: {
    trigger: {
      control: false
    }
  },
  parameters: {
    layout: 'padded',
  },
}

const Template = (args) => (
  <div style={{ width: 360 }}>
    <Tooltip {...args} />
  </div>
)

export const TriggerOnHover = Template.bind({})
TriggerOnHover.args = {
  tooltipText: '** 00 Estimated # of child care administrators (center director of family child care owner)',
  position: 'right'
}

export const TriggerOnClick = Template.bind({})
TriggerOnClick.args = {
  tooltipText: '** 00 Estimated # of child care administrators (center director of family child care owner)',
  trigger: 'click',
  position: 'right'
}

export default Story

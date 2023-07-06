import Title from '../components/Title'

import '../styles/globals.css'

const Story = {
  title: 'Title',
  component: Title,
  argTypes: {},
}

const Template = (args) => (
  <div style={{ width: 360 }}>
    <Title>{args.text}</Title>
  </div>
)

export const Default = Template.bind({})
Default.args = {
  text: 'Child Care Business Feasibility Estimator',
}

export default Story

import Dropdown from '../components/Dropdown'

import '../styles/globals.css'

const Story = {
  title: 'Dropdown',
  component: Dropdown,
  argTypes: {
    type: {
      control: false
    }
  },
}

const Template = (args) => (
  <div style={{ width: 360 }}>
    <Dropdown {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  label: 'Early achievers level',
  value: '',
  options: [{
    text: 'Not participating',
    value: 'none'
  },
  {
    text: 'Level 1',
    value: '1'
  },
  {
    text: 'Level 2',
    value: '2'
  },
  {
    text: 'Level 3',
    value: '3'
  }]
}

export const List = Template.bind({})
List.args = {
  label: 'County',
  type: 'list',
  value: 'VE',
  options: [{ text: 'Adams', value: 'Adams' },
  { text: 'Asotin', value: 'Asotin' },
  { text: 'Benton', value: 'Benton' },
  { text: 'Chelan', value: 'Chelan' },
  { text: 'Clallam', value: 'Clallam' },
  { text: 'Clark', value: 'Clark' },
  { text: 'Columbia', value: 'Columbia' },
  { text: 'Cowlitz', value: 'Cowlitz' },
  { text: 'Douglas', value: 'Douglas' },
  { text: 'Ferry', value: 'Ferry' },
  { text: 'Franklin', value: 'Franklin' },
  { text: 'Garfield', value: 'Garfield' },
  { text: 'Grant', value: 'Grant' },
  { text: 'Grays Harbor', value: 'Grays Harbor' },
  { text: 'Island', value: 'Island' },
  { text: 'Jefferson', value: 'Jefferson' },
  { text: 'King', value: 'King' },
  { text: 'Kitsap', value: 'Kitsap' },
  { text: 'Kittitas', value: 'Kittitas' },
  { text: 'Klickitat', value: 'Klickitat' },
  { text: 'Lewis', value: 'Lewis' },
  { text: 'Lincoln', value: 'Lincoln' },
  { text: 'Mason', value: 'Mason' },
  { text: 'Okanogan', value: 'Okanogan' },
  { text: 'Pacific', value: 'Pacific' },
  { text: 'Pend Oreille', value: 'Pend Oreille' },
  { text: 'Pierce', value: 'Pierce' },
  { text: 'San Juan', value: 'San Juan' },
  { text: 'Skagit', value: 'Skagit' },
  { text: 'Skamania', value: 'Skamania' },
  { text: 'Snohomish', value: 'Snohomish' },
  { text: 'Spokane', value: 'Spokane' },
  { text: 'Stevens', value: 'Stevens' },
  { text: 'Thurston', value: 'Thurston' },
  { text: 'Wahkiakum', value: 'Wahkiakum' },
  { text: 'Walla Walla', value: 'Walla Walla' },
  { text: 'Whatcom', value: 'Whatcom' },
  { text: 'Whitman', value: 'Whitman' },
  { text: 'Yakima', value: 'Yakima' }]
}


export default Story

import { Row } from 'styled-bootstrap-grid'

import Dropdown from '@/components/Dropdown'
import Input from '@/components/Input'
import TextBox from '@/components/TextBox'
import FormGroup from '@/components/FormGroup'

const countyOpts = [
  { text: 'Adams', value: 'Adams' },
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
  { text: 'Yakima', value: 'Yakima' }
]

const typeOfFacilityOptions = [
  { text: 'Licensed child care center', value: 'Licensed child care center' },
  { text: 'Licensed family child care home', value: 'Licensed family child care home' },
  { text: 'Licensed school-age program', value: 'Licensed school-age program' },
  { text: 'Licensed outdoor/nature based', value: 'Licensed outdoor/nature based' }
]

const colMd4Lg3 = { md: 4, lg: 3 }
const colMd4Lg6 = { md: 4, lg: 6 }

const StepOne = ({ data, onDataChange, isMobile = false, show = false, errors = {} }) => {
  if (!show) {
    return null
  }

  return (
    <>
      <Row>
        <FormGroup {...colMd4Lg3} error={errors.county}>
          <Dropdown
            label='County'
            type={isMobile ? 'list' : 'menu'}
            options={countyOpts}
            value={data.county}
            onChange={(value) => onDataChange('county', value)}
          />
        </FormGroup>
        <FormGroup {...colMd4Lg3}>
          <Dropdown label='Type of facility' options={typeOfFacilityOptions} />
        </FormGroup>
        <FormGroup {...colMd4Lg6}>
          <Input
            name='indentedFootage'
            type='number'
            label='Squeare footage intended for use by children'
            value={data.indentedFootage}
            onChange={({ target }) => onDataChange(target.name, target.value)}
          />
          {data.indentedFootage && data.indentedFootage !== '' && (
            <>
              <TextBox style={{ margin: '4px 0' }}>
                Maximum # of infant/toddlers supported (must have at least 50 sq. ft. per child)
              </TextBox>
              <TextBox>
                Maximum # of preschoolers/school age supported (must have at least 35 sq. ft. per child)
              </TextBox>
            </>
          )}
        </FormGroup>
      </Row>
      <Row>
        <FormGroup {...colMd4Lg3}>
          <Dropdown label='Early achievers level' options={countyOpts} />
        </FormGroup>
        <FormGroup {...colMd4Lg3}>
          <Dropdown label='Staff compesation' options={typeOfFacilityOptions} />
        </FormGroup>
        <FormGroup {...colMd4Lg6}>
          <Dropdown label='Fees median or 75th percentile' options={typeOfFacilityOptions} />
        </FormGroup>
      </Row>
    </>
  )
}

export default StepOne

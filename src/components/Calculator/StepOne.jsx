import { Row } from 'styled-bootstrap-grid'

import Dropdown from '@/components/Dropdown'
import Input from '@/components/Input'
import TextBox from '@/components/TextBox'
import FormGroup from '@/components/FormGroup'
import costData from '@/data/cost_data.json'
import { isRequired, minInt } from '@/utils/validate'

const optionsType = costData
  .reduce((prev, { county, medianOr75thPercentile }) => {
    if (!prev.county.includes(county)) {
      prev.county.push(county)
    }

    if (!prev.medianOr75thPercentile.includes(medianOr75thPercentile)) {
      prev.medianOr75thPercentile.push(medianOr75thPercentile)
    }

    return prev
  }, { county: [], medianOr75thPercentile: [] })

const mapToOptions = (options) => ({ text: options, value: options })

const COUNTY_OPTIONS = optionsType.county
  .sort()
  .map(mapToOptions)

const MEDIAN_OR_75TH_PERCENTILE_OPTIONS = optionsType.medianOr75thPercentile
  .map(mapToOptions)

const TYPE_FACILITY_OPTIONS = [
  { text: 'Center-Based', value: 'Center-Based' },
  { text: 'FCC', value: 'FCC' },
  { text: 'Nature Based', value: 'Nature Based' }
]

const STAFF_COST_OPTIONS = [
  { text: 'Median', value: 'Median' },
  { text: 'Family Sustaining', value: 'Family Sustaining' }
]

const EARLY_ACHIEVERS_LEVEL_OPTIONS = [
  { text: '1', value: '1' },
  { text: '2', value: '2' },
  { text: '3', value: '3' },
  { text: '3.5', value: '3.5' },
  { text: '4', value: '4' },
  { text: '5', value: '5' },
]

const colMd4Lg3 = { md: 4, lg: 3 }
const colMd4Lg6 = { md: 4, lg: 6 }

export const validationRules = {
  county: [isRequired],
  typeOfFacility: [isRequired],
  indentedFootage: [isRequired, minInt(1)],
  earlyAchieversLevel: [isRequired],
  staffCompesantion: [isRequired],
  medianOr75thPercentile: [isRequired],
}

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
            options={COUNTY_OPTIONS}
            value={data.county}
            onChange={(value) => onDataChange('county', value)}
          />
        </FormGroup>
        <FormGroup {...colMd4Lg3} error={errors.typeOfFacility}>
          <Dropdown
            label='Type of facility'
            options={TYPE_FACILITY_OPTIONS}
            value={data.typeOfFacility}
            onChange={(value) => onDataChange('typeOfFacility', value)}
          />
        </FormGroup>
        <FormGroup {...colMd4Lg6} error={errors.indentedFootage}>
          <Input
            name='indentedFootage'
            type='number'
            label='Squeare footage intended for children'
            min={0}
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
        <FormGroup {...colMd4Lg3} error={errors.earlyAchieversLevel}>
          <Dropdown
            label='Early achievers level'
            options={EARLY_ACHIEVERS_LEVEL_OPTIONS}
            value={data.earlyAchieversLevel}
            onChange={(value) => onDataChange('earlyAchieversLevel', value)}
          />
        </FormGroup>
        <FormGroup {...colMd4Lg6} error={errors.medianOr75thPercentile}>
          <Dropdown
            label='Fees median per child tuition'
            options={MEDIAN_OR_75TH_PERCENTILE_OPTIONS}
            value={data.medianOr75thPercentile}
            onChange={(value) => onDataChange('medianOr75thPercentile', value)}
          />
        </FormGroup>
        <FormGroup {...colMd4Lg3} error={errors.staffCompesantion}>
          <Dropdown
            label='Staff compesation'
            options={STAFF_COST_OPTIONS}
            value={data.staffCompesantion}
            onChange={(value) => onDataChange('staffCompesantion', value)}
          />
        </FormGroup>
      </Row>
    </>
  )
}

export default StepOne

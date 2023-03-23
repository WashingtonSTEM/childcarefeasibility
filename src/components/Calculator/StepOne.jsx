import { useMemo } from 'react'
import { Row } from 'styled-bootstrap-grid'

import Dropdown from '@/components/Dropdown'
import Input from '@/components/Input'
import TextBox from '@/components/TextBox'
import FormGroup from '@/components/FormGroup'
import Tooltip from '@/components/Tooltip'
import costData from '@/data/cost_data.json'
import { isRequired, minInt } from '@/utils/validate'
import { getMaximumNumberOfInfantsSupported, getMaximumNumberOfPreschoolers } from '@/helpers/formulas'

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
  { text: 'Licensed child care center', value: 'Center-Based' },
  { text: 'Licensed in-home child care center', value: 'FCC' },
]

const STAFF_COST_OPTIONS = [
  { text: 'Minimum wage', value: 'Minimum' },
  { text: 'Median wage', value: 'Median' },
  { text: 'Living wage', value: 'Living wage' }
]

const EARLY_ACHIEVERS_LEVEL_OPTIONS = [
  { text: 'Level 1', value: '1' },
  { text: 'Level 2', value: '2' },
  { text: 'Level 3', value: '3' },
  { text: 'Level 3+', value: '3.5' },
  { text: 'Level 4', value: '4' },
  { text: 'Level 5', value: '5' },
]

const ADDITIONAL_COST_OPTIONS = [
  { text: 'As a percent of all cost', value: 'As a percent of all cost' },
  { text: 'Dollar amount', value: 'Dollar amount' }
]

const colMd4Lg3 = { md: 4, lg: 3 }
const colMd4Lg6 = { md: 4, lg: 6 }

export const validationRules = {
  county: [isRequired],
  typeOfFacility: [isRequired],
  intendedFootage: [isRequired, minInt(1)],
  earlyAchieversLevel: [isRequired],
  staffCompesantion: [isRequired],
  medianOr75thPercentile: [isRequired],
  additinoalCost: [isRequired]
}

const StepOne = ({ data, onDataChange, isMobile = false, show = false, errors = {} }) => {
  console.log(data)
  const maximumNumberOfInfantsSupported = useMemo(() => {
    const { typeOfFacility, intendedFootage } = data

    if (!typeOfFacility || !intendedFootage) {
      return null
    }

    return getMaximumNumberOfInfantsSupported(typeOfFacility, intendedFootage)
  }, [data])

  const maximumNumberOfPreschoolers = useMemo(() => {
    const { typeOfFacility, intendedFootage } = data

    if (!typeOfFacility || !intendedFootage) {
      return null
    }

    return getMaximumNumberOfPreschoolers(typeOfFacility, intendedFootage, maximumNumberOfInfantsSupported)
  }, [data, maximumNumberOfInfantsSupported])

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
        <FormGroup {...colMd4Lg6} error={errors.intendedFootage}>
          <Input
            name='intendedFootage'
            type='number'
            label='Square footage intended for children'
            min={0}
            value={data.intendedFootage}
            onChange={({ target }) => onDataChange(target.name, parseInt(target.value))}
          />
          {maximumNumberOfInfantsSupported !== null && (
            <TextBox style={{ marginTop: 4, fontStyle: 'italic' }}>
              <>
                ** {maximumNumberOfInfantsSupported}
                <br />
                Maximum # of infant/toddlers supported (must have at least 50 sq. ft. per child)
              </>
            </TextBox>
          )}
          {maximumNumberOfPreschoolers !== null && (
            <TextBox style={{ marginTop: 4, fontStyle: 'italic' }}>
              <>
                ** {maximumNumberOfPreschoolers}
                <br />
                Maximum # of preschoolers/school age supported (must have at least 35 sq. ft. per child)
              </>
            </TextBox>
          )}
        </FormGroup>
      </Row>
      <Row>
        <FormGroup {...colMd4Lg3} error={errors.earlyAchieversLevel}>
          <Dropdown
            label='Early Achievers level'
            options={EARLY_ACHIEVERS_LEVEL_OPTIONS}
            value={data.earlyAchieversLevel}
            onChange={(value) => onDataChange('earlyAchieversLevel', value)}
          />
        </FormGroup>
        <FormGroup {...colMd4Lg6} error={errors.medianOr75thPercentile}>
          <Dropdown
            label='Per Child Tuition'
            options={MEDIAN_OR_75TH_PERCENTILE_OPTIONS}
            value={data.medianOr75thPercentile}
            onChange={(value) => onDataChange('medianOr75thPercentile', value)}
          />
        </FormGroup>
        <FormGroup {...colMd4Lg3} error={errors.staffCompesantion}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Dropdown
              label='Staff compensation'
              options={STAFF_COST_OPTIONS}
              value={data.staffCompesantion}
              onChange={(value) => onDataChange('staffCompesantion', value)}
            />
            <Tooltip
              trigger={isMobile ? 'click' : 'hover'}
              tooltipText={
                <>
                  &quot;Living Wage&quot; is defined by the <a style={{ color: 'inherit' }} href='https://livingwage.mit.edu'>MIT Living Wage calculator.</a>
                </>
              }
            />
          </div>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup {...colMd4Lg3} error={errors.additinoalCost}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Dropdown
              label='Additional costs'
              options={ADDITIONAL_COST_OPTIONS}
              value={data.additinoalCost}
              onChange={(value) => onDataChange('additinoalCost', value)}
            />
            <Tooltip trigger={isMobile ? 'click' : 'hover'} tooltipText='Consider costs for curriculum, staff professional development, management and administration, and program enhancements, such as family conferences.' />
          </div>
        </FormGroup>
      </Row>
    </>
  )
}

export default StepOne

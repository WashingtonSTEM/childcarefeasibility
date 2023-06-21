import { useMemo } from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Row } from 'styled-bootstrap-grid'

import Dropdown from '@/components/Dropdown'
import Input from '@/components/Input'
import TextBox from '@/components/TextBox'
import FormGroup from '@/components/FormGroup'
import Tooltip from '@/components/Tooltip'
import costData from '@/data/cost_data.json'
import { isRequired, minInt, maxNumber } from '@/utils/validate'
import { getMaximumNumberOfInfantsSupported, getMaximumNumberOfPreschoolers } from '@/helpers/formulas'

const Text = styled.span`
  display: block;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  font-size: 14px;
  margin: 0 15px 18px;
`

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

const colMd4Lg3 = { md: 4, lg: 3 }
const colMd4Lg6 = { md: 4, lg: 6 }

export const validationRules = {
  county: [isRequired],
  typeOfFacility: [isRequired],
  intendedFootage: [isRequired, minInt(1)],
  earlyAchieversLevel: [isRequired],
  staffCompesantion: [isRequired],
  medianOr75thPercentile: [isRequired]
}

const StepOne = ({ data, onDataChange, isMobile = false, show = false, errors = {} }) => {
  const intl = useIntl()
  const maximumNumberOfInfantsSupported = useMemo(() => {
    const { typeOfFacility, intendedFootage } = data

    if (!typeOfFacility || !intendedFootage) {
      return null
    }

    return getMaximumNumberOfInfantsSupported(typeOfFacility, intendedFootage)
  }, [data])

  /* const maximumNumberOfPreschoolers = useMemo(() => {
    const { typeOfFacility, intendedFootage } = data

    if (!typeOfFacility || !intendedFootage) {
      return null
    }

    return getMaximumNumberOfPreschoolers(typeOfFacility, intendedFootage, maximumNumberOfInfantsSupported)
  }, [data, maximumNumberOfInfantsSupported]) */

  const staffCompesantionTooltipText = () => {
    if (data.staffCompesantion === 'Living Wage') {
      return intl.formatMessage({
        id: 'S1_PCT_STAFF_COMP_LIVING_TOOLTIP'
      }, { 
        a_href: <a href="https://livingwage.mit.edu" style={{ color: 'inherit' }} target="blank">{intl.formatMessage({ id: 'S1_PCT_STAFF_COMP_LIVING_TOOLTIP_MIT' })}</a>
      })
    } else if (data.staffCompesantion === 'Median Wage') {
      return intl.formatMessage({ id: 'S1_PCT_STAFF_COMP_MEDIAN_TOOLTIP' })
    }

    return intl.formatMessage({ id: 'S1_PCT_STAFF_COMP_MINIMUN_TOOLTIP' })
  }

  const TYPE_FACILITY_OPTIONS = [
    { text: intl.formatMessage({ id: 'S1_TOF_CB' }), value: 'Center-Based' },
    { text: intl.formatMessage({ id: 'S1_TOF_FCC' }), value: 'FCC' },
  ]

  const STAFF_COST_OPTIONS = [
    { text: intl.formatMessage({ id: 'S1_PCT_STAFF_COMP_MINIMUM' }), value: 'Minimum Wage' },
    { text: intl.formatMessage({ id: 'S1_PCT_STAFF_COMP_MEDIAN' }), value: 'Median Wage' },
    { text: intl.formatMessage({ id: 'S1_PCT_STAFF_COMP_LIVING' }), value: 'Living Wage' }
  ]

  const EARLY_ACHIEVERS_LEVEL_OPTIONS = [
    { text: intl.formatMessage({ id: 'S1_LEVEL_OPT_1' }, { level: '0' }), value: '0' },
    { text: intl.formatMessage({ id: 'S1_LEVEL_OPT' }, { level: '1' }), value: '1' },
    { text: intl.formatMessage({ id: 'S1_LEVEL_OPT' }, { level: '2' }), value: '2' },
    { text: intl.formatMessage({ id: 'S1_LEVEL_OPT' }, { level: '3' }), value: '3' },
    { text: intl.formatMessage({ id: 'S1_LEVEL_OPT' }, { level: '3.5' }), value: '3.5' },
    { text: intl.formatMessage({ id: 'S1_LEVEL_OPT' }, { level: '4' }), value: '4' },
    { text: intl.formatMessage({ id: 'S1_LEVEL_OPT' }, { level: '5' }), value: '5' },
  ]

  const MEDIAN_OR_75TH_PERCENTILE_OPTIONS = optionsType.medianOr75thPercentile
    .map(mapToOptions)
    .map((o) => {
      if (o.text === 'Median') {
        return {
          ...o,
          text: intl.formatMessage({ id: 'S1_PCT_MEDIAN' })
        }
      }
      if (o.text === '75th Percentile') {
        return {
          ...o,
          text: intl.formatMessage({ id: 'S1_PCT_75TH' })
        }
      }

      return o
    })

  if (!show) {
    return null
  }

  return (
    <>
      <Row>
        <Text>{intl.formatMessage({ id: 'S1_INSTRUCTION' })}</Text>
        <FormGroup {...colMd4Lg3} error={errors.county}>
          <Dropdown
            label={intl.formatMessage({ id: 'S1_COUNTY' })}
            type={isMobile ? 'list' : 'menu'}
            options={COUNTY_OPTIONS}
            value={data.county}
            onChange={(value) => onDataChange('county', value)}
          />
        </FormGroup>
        <FormGroup {...colMd4Lg3} error={errors.typeOfFacility}>
          <Dropdown
            label={intl.formatMessage({ id: 'S1_TOF' })}
            options={TYPE_FACILITY_OPTIONS}
            value={data.typeOfFacility}
            onChange={(value) => onDataChange('typeOfFacility', value)}
          />
        </FormGroup>
        <FormGroup {...colMd4Lg6} error={errors.intendedFootage}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            <Input
              name='intendedFootage'
              type='number'
              label={intl.formatMessage({ id: 'S1_FOOTAGE' })}
              min={0}
              value={data.intendedFootage}
              onChange={({ target }) => onDataChange(target.name, parseInt(target.value))}
            />
            <Tooltip
              trigger={isMobile ? 'click' : 'hover'}
              tooltipText={intl.formatMessage({ id: 'S1_FOOTAGE_TOOLTIP' })}
            />
          </div>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup {...colMd4Lg3} error={errors.earlyAchieversLevel}>
          <Dropdown
            label={intl.formatMessage({ id: 'S1_LEVEL' })}
            options={EARLY_ACHIEVERS_LEVEL_OPTIONS}
            value={data.earlyAchieversLevel}
            onChange={(value) => onDataChange('earlyAchieversLevel', value)}
          />
        </FormGroup>
        <FormGroup {...colMd4Lg6} error={errors.medianOr75thPercentile}>
          <Dropdown
            label={intl.formatMessage({ id: 'S1_PCT' })}
            options={MEDIAN_OR_75TH_PERCENTILE_OPTIONS}
            value={data.medianOr75thPercentile}
            onChange={(value) => onDataChange('medianOr75thPercentile', value)}
          />
        </FormGroup>
        <FormGroup {...colMd4Lg3} error={errors.staffCompesantion}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            <Dropdown
              label={intl.formatMessage({ id: 'S1_PCT_STAFF_COMP' })}
              options={STAFF_COST_OPTIONS}
              value={data.staffCompesantion}
              onChange={(value) => onDataChange('staffCompesantion', value)}
            />
            <Tooltip
              disabled={!data.staffCompesantion}
              trigger={isMobile ? 'click' : 'hover'}
              tooltipText={staffCompesantionTooltipText()}
            />
          </div>
        </FormGroup>
      </Row>
    </>
  )
}

export default StepOne

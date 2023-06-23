import { useMemo } from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Row } from 'styled-bootstrap-grid'

import Dropdown from '@/components/Dropdown'
import Input from '@/components/Input'
import TextBox from '@/components/TextBox'
import SubText from '@/components/SubText'
import FormGroup from '@/components/FormGroup'
import Tooltip from '@/components/Tooltip'
import costData from '@/data/cost_data.json'
import { isRequired, minInt } from '@/utils/validate'
import { getMaximumNumberOfInfantsSupported, getMaximumNumberOfPreschoolers } from '@/helpers/formulas'


const moneyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

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
  .reduce((prev, { county }) => {
    if (!prev.county.includes(county)) {
      prev.county.push(county)
    }

    return prev
  }, { county: [] })

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

  const maximumNumberOfPreschoolers = useMemo(() => {
    const { typeOfFacility, intendedFootage } = data

    if (!typeOfFacility || !intendedFootage) {
      return null
    }

    return getMaximumNumberOfPreschoolers(typeOfFacility, intendedFootage, maximumNumberOfInfantsSupported)
  }, [data, maximumNumberOfInfantsSupported])

  const TYPE_FACILITY_OPTIONS = [
    { text: intl.formatMessage({ id: 'S1_TOF_CB' }), value: 'Center-Based' },
    { text: intl.formatMessage({ id: 'S1_TOF_FCC' }), value: 'FCC' },
  ]


  const EARLY_ACHIEVERS_LEVEL_OPTIONS = [
    { text: intl.formatMessage({ id: 'S1_LEVEL_OPT_NOT' }, { level: '0' }), value: '0' },
    { text: intl.formatMessage({ id: 'S1_LEVEL_OPT_1' }, { level: '1' }), value: '1' },
    { text: intl.formatMessage({ id: 'S1_LEVEL_OPT' }, { level: '2' }), value: '2' },
    { text: intl.formatMessage({ id: 'S1_LEVEL_OPT' }, { level: '3' }), value: '3' },
    { text: intl.formatMessage({ id: 'S1_LEVEL_OPT' }, { level: '3.5' }), value: '3.5' },
    { text: intl.formatMessage({ id: 'S1_LEVEL_OPT' }, { level: '4' }), value: '4' },
    { text: intl.formatMessage({ id: 'S1_LEVEL_OPT' }, { level: '5' }), value: '5' },
  ]


  const earlyAcrhiversReactiveBoxes = {
    'Center-Based': {
      message: 'S1_LEVEL_CENTER_RB',
      data: {
        "3": 5000,
        "3.5": 5000,
        "4": 7500,
        "5": 9000
      }
    },
    FCC: {
      message: 'S1_LEVEL_FAMILY_RB',
      data: {
        "2": 1000,
        "3": 2750,
        "3.5": 2750,
        "4": 3000,
        "5": 3250
      }
    }
  }


  const earlyAchieversActiveRB = earlyAcrhiversReactiveBoxes[data.typeOfFacility] ? 
        earlyAcrhiversReactiveBoxes[data.typeOfFacility].data[data.earlyAchieversLevel] ? 
          earlyAcrhiversReactiveBoxes[data.typeOfFacility] 
          : null
        : null 

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
              tooltipText={
                data.typeOfFacility === 'FCC' ?
                  (
                    <>
                      {intl.formatMessage({ id: 'S1_FOOTAGE_TOOLTIP_FCC' })}
                    </>
                  ) : (
                    <>
                      {intl.formatMessage({ id: 'S1_FOOTAGE_TOOLTIP' })}
                    </>
                  )
              }
            />
          </div>
          {maximumNumberOfInfantsSupported !== null && (
            <TextBox style={{ marginTop: 4, fontStyle: 'italic' }}>
              <>
                {intl.formatMessage({ id: 'S1_FOOTAGE_RECOMENDATION' }, {
                  maximumNumberOfInfantsSupported,
                  maximumNumberOfPreschoolers,
                  and_or: data.typeOfFacility === 'FCC' ? ` ${intl.formatMessage({ id: 'S1_AND' })}` : ` ${intl.formatMessage({ id: 'S1_OR' })},`
                })}
              </>
            </TextBox>
          )}
        </FormGroup>
      </Row>
      <Row>
        <FormGroup {...{ lg: 6 }} error={errors.earlyAchieversLevel}>
          <Dropdown
            label={intl.formatMessage({ id: 'S1_LEVEL' })}
            options={EARLY_ACHIEVERS_LEVEL_OPTIONS}
            value={data.earlyAchieversLevel}
            onChange={(value) => onDataChange('earlyAchieversLevel', value)}
          />
          {earlyAchieversActiveRB && (
            <TextBox style={{ marginTop: 4, fontStyle: 'italic' }}>
              <>
                {intl.formatMessage(
                    { id: earlyAchieversActiveRB.message }, 
                    { 
                      level: data.earlyAchieversLevel, 
                      amount:  moneyFormatter.format(earlyAchieversActiveRB.data[data.earlyAchieversLevel]) 
                    }
                  )
                }
              </>
            </TextBox>
          )}
        </FormGroup>
      

        <FormGroup {...colMd4Lg6} error={errors.additionalCost}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            <Input
              name='additionalCost'
              type='number'
              sufix='$'
              label={intl.formatMessage({ id: 'S1_ADDITIONAL_COST' })}
              min={0}
              value={data.additionalCost}
              onChange={({ target }) => onDataChange(target.name, parseFloat(target.value))}
            />
            <Tooltip trigger={isMobile ? 'click' : 'hover'} tooltipText={intl.formatMessage({ id: 'S1_ADDITIONAL_COST_TOOLTIP' })} />
          </div>
        </FormGroup>
      </Row>

      <Row>
        <FormGroup {...{ lg: 6 }} error={errors.scholarshipsDiscounts}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            <Input
              name='scholarshipsDiscounts'
              type='number'
              label={intl.formatMessage({ id: 'S1_SCHOLARSHIP' })}
              min={0}
              value={data.scholarshipsDiscounts}
              onChange={({ target }) => onDataChange(target.name, parseFloat(target.value))}
            />
            <Tooltip trigger={isMobile ? 'click' : 'hover'} tooltipText={intl.formatMessage({ id: 'S1_SCHOLARSHIP_TOOLTIP' })} />
          </div>
          <SubText>{intl.formatMessage({ id: 'S1_SCHOLARSHIP_SUB_TEXT' })}</SubText>
        </FormGroup>

        <FormGroup {...{ lg: 6 }} error={errors.annualRegistration}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            <Input
              name='annualRegistration'
              type='number'
              sufix='$'
              label={intl.formatMessage({ id: 'S1_ANNUAL_REG' })}
              min={0}
              value={data.annualRegistration}
              onChange={({ target }) => onDataChange(target.name, parseFloat(target.value))}
            />
          </div>
        </FormGroup>
      </Row>
    </>
  )
}

export default StepOne

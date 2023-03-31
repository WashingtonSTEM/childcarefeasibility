import { Row, Col } from 'styled-bootstrap-grid'
import styled from 'styled-components'

import Input from '../Input'

const finalResultsFields = [
  { text: 'Expected fee revenue', value: 'expectedFeeRevenue' },
  { text: 'Expected salaries', value: 'expectedSalaries' },
  { text: 'Expected benefits', value: 'expectedBenefits' },
  { text: 'Rent/mortgage cost', value: 'rentOrMortageCost' },
  { text: 'Additional costs as a percentage of all other costs', value: 'additionalCost' },
  { text: 'Dollar amount of additional costs', value: 'dollarAmount' },
]

const Text = styled.span`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #534F4D;
`

const moneyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

const FinalResults = ({ mobile, onDataChange, ...props }) => {
  if (mobile) {
    return (
      <>
        <Row style={{ marginBottom: 16 }}>
          <Col col={12}>
            <Text>Final results</Text>
          </Col>
        </Row>
        {finalResultsFields.map((field, index) => (
          <>
            <Row key={`${field.value}-${index}`} style={{ padding: '28px 0 12px 0' }}>
              <Col col={12}>
                <Text>{field.text}</Text>
              </Col>
            </Row>
            <Row key={`${field.value}-header-${index}`}>
              <Col col={6}>
                <Text style={{ fontWeight: 'bold' }}>Monthly</Text>
              </Col>
              <Col col={6}>
                <Text style={{ fontWeight: 'bold' }}>{field.value !== 'additionalCost' ? 'Annual' : ''}</Text>
              </Col>
            </Row>
            <Row key={`${field.value}-result-${index}`} style={{ padding: `12px 0 ${index < 5 ? '12px' : '60px'} 0` }}>
              <Col col={6}>
                <Text style={{ fontWeight: '400' }}>
                  {field.value !== 'additionalCost' ?
                    <>{moneyFormatter.format(props[field.value] || 0)}</>
                    : <>{`${props[field.value]}%`}</>
                  }
                </Text>
              </Col>
              <Col col={6}>
                {field.value !== 'additionalCost' && <Text>{moneyFormatter.format((props[field.value] || 0) * 12)}</Text>}
              </Col>
            </Row>
          </>
        ))}
      </>
    )
  }

  return (
    <>
      <Row style={{ marginBottom: 60 }}>
        <Col md={4} lg={6}>
          <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Final Results</Text>
        </Col>
        <Col md={4} lg={3} style={{ textAlign: 'center' }}>
          <Text>Monthly</Text>
        </Col>
        <Col md={4} lg={3} style={{ textAlign: 'center' }}>
          <Text>Annual</Text>
        </Col>
      </Row>
      {finalResultsFields.map((field, index) => (
        <Row key={`${field.value}-${index}`} style={{ padding: '34px 0' }}>
          <Col md={4} lg={6}>
            <Text style={{ fontWeight: 'bold' }}>{field.text}</Text>
          </Col>
          <Col md={4} lg={3} style={{ textAlign: 'center' }}>
            {field.value !== 'additionalCost' ? (
              <Text>{moneyFormatter.format(props[field.value] || 0)}</Text>
            ) : (
              <Input
                name='additionalCost'
                type='number'
                sufix='%'
                label='Additional costs'
                min={0}
                max={100}
                value={props.additionalCost}
                onChange={onDataChange}
              />
            )}

          </Col>
          <Col md={4} lg={3} style={{ textAlign: 'center' }}>
            {field.value !== 'additionalCost' && <Text>{moneyFormatter.format((props[field.value] || 0) * 12)}</Text>}
          </Col>
        </Row>
      ))}
    </>
  )
}

export default FinalResults

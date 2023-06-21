import { Row, Col } from 'styled-bootstrap-grid'
import styled from 'styled-components'
import { FormattedMessage, useIntl } from 'react-intl'

import Input from '../Input'
import React from 'react'

const Text = styled.span`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #534F4D;
`

const moneyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

const FinalResults = ({ mobile, onDataChange, ...props }) => {
  const intl = useIntl()

  const finalResultsFields = [
    { text: intl.formatMessage({ id: 'R_E_FEE_REVENUE' }), value: 'expectedFeeRevenue' },
    { text: intl.formatMessage({ id: 'R_E_SALARIES' }), value: 'expectedSalaries' },
    { text: intl.formatMessage({ id: 'R_E_BENEFITS' }), value: 'expectedBenefits' },
    { text: intl.formatMessage({ id: 'R_RENT_COST' }), value: 'rentOrMortageCost' },
    { text: intl.formatMessage({ id: 'R_LICENSING_FEE' }), value: 'childcareLicensingFee' },
    { text: intl.formatMessage({ id: 'R_EDUCATIONAL_PROGRAM_EXPENSES' }), value: 'educationProgramExpenses' },
    { text: intl.formatMessage({ id: 'R_MANAGEMENT_ADMINISTRATION' }), value: 'managementAndAdministration' },
    { text: intl.formatMessage({ id: 'R_ADDITIONAL_COSR' }), value: 'additionalCost' },
  ]

  if (mobile) {
    return (
      <>
        <Row style={{ marginBottom: 16 }}>
          <Col col={12}>
            <Text>
              <FormattedMessage id="R_FINAL" />
            </Text>
          </Col>
        </Row>
        {finalResultsFields.map((field, index) => (
          <React.Fragment key={index}>
            <Row key={`${field.value}-${index}`} style={{ padding: '28px 0 12px 0' }}>
              <Col col={12}>
                <Text>{field.text}</Text>
              </Col>
            </Row>
            <Row key={`${field.value}-header-${index}`}>
              <Col col={6}>
                <Text style={{ fontWeight: 'bold' }}>
                  <FormattedMessage id="R_MONTHLY" />
                </Text>
              </Col>
              <Col col={6}>
                <Text style={{ fontWeight: 'bold' }}>
                  <FormattedMessage id="R_ANNUAL" />
                </Text>
              </Col>
            </Row>
            <Row key={`${field.value}-result-${index}`} style={{ padding: `12px 0 ${index < 5 ? '12px' : '60px'} 0` }}>
              <Col col={6}>
                <Text style={{ fontWeight: '400' }}>
                  {moneyFormatter.format(props[field.value] || 0)}
                </Text>
              </Col>
              <Col col={6}>
                <Text>{moneyFormatter.format((props[field.value] || 0) * 12)}</Text>
              </Col>
            </Row>
          </ React.Fragment>
        ))}
      </>
    )
  }

  return (
    <>
      <Row style={{ marginBottom: 60 }}>
        <Col md={4} lg={1.5}>
          <Text style={{ fontWeight: 'bold', fontSize: 30 }}><FormattedMessage id="R_FINAL" /></Text>
        </Col>
        <Col md={4} lg={4} style={{ textAlign: 'center' }}>
          <Text>
            <FormattedMessage id="R_MONTHLY" />
          </Text>
        </Col>
        <Col md={4} lg={4} style={{ textAlign: 'center' }}>
          <Text>
            <FormattedMessage id="R_ANNUAL" />
          </Text>
        </Col>
      </Row>
      {finalResultsFields.map((field, index) => (
        <Row key={`${field.value}-${index}`} style={{ padding: '30px 0' }}>
          <Col md={4} lg={3}>
            <Text style={{ fontWeight: 'bold' }}>{field.text}</Text>
          </Col>
          <Col md={4} lg={4} style={{ textAlign: 'left' }}>
            <Text>{moneyFormatter.format(props[field.value] || 0)}</Text>
          </Col>
          <Col md={4} lg={3} style={{ textAlign: 'left' }}>
            <Text>{moneyFormatter.format((props[field.value] || 0) * 12)}</Text>
          </Col>
        </Row>
      ))}
    </>
  )
}

export default FinalResults

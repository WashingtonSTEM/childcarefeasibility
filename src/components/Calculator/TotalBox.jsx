import PropTypes from 'prop-types'
import { Row, Col } from 'styled-bootstrap-grid'
import styled from 'styled-components'

const Box = styled.div`
  background: #00AFDA;
  border-radius: 4px;
  padding: 15px 22px;
`

const Text = styled.span`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    text-transform: capitalize;
    color: #F3F3F3;
`

const moneyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencySign: 'accounting' })

const TotalBox = ({ label, monthlyValue, annualValue, mobile, ...props }) => {
  if (mobile) {
    return (
      <Box {...props}>
        <Row>
          <Col col={12}>
            <Text style={{ fontWeight: '600', color: 'white' }}>{label}</Text>
          </Col>
        </Row>
        <Row style={{ padding: '12px 0' }}>
          <Col col={6}>
            <Text style={{ color: 'white' }}>Monthly</Text>
          </Col>
          <Col col={6}>
            <Text style={{ color: 'white' }}>Annual</Text>
          </Col>
        </Row>
        <Row>
          <Col col={6}>
            <Text style={{ color: 'white' }}>{moneyFormatter.format(monthlyValue || 0)}</Text>
          </Col>
          <Col col={6}>
            <Text style={{ color: 'white' }}>{moneyFormatter.format(annualValue || 0)}</Text>
          </Col>
        </Row>
      </Box>
    )
  }

  return (
    <Box {...props}>
      <Row style={{ padding: '30px 0' }}>
        <Col col={12} lg={2} md={3}>
          <Text style={{ fontWeight: '600', color: 'white' }}>{(label)}</Text>
        </Col>
        <Col col={12}
          lg={3}
          md={3}
          style={{ textAlign: 'center' }}>
          <Text style={{ color: 'white' }}>{moneyFormatter.format(monthlyValue || 0)}</Text>
        </Col>
        <Col
          col={12}
          lg={3}
          md={3}
          offset={1}
          style={{ textAlign: 'center' }}
        >
          <Text style={{ color: 'white' }}>{moneyFormatter.format(annualValue || 0)}</Text>
        </Col>
      </Row>
    </Box>
  )
}

TotalBox.propTypes = {
  label: PropTypes.string.isRequired,
  monthlyValue: PropTypes.number.isRequired,
  annualValue: PropTypes.number.isRequired,
  mobile: PropTypes.bool
}

export default TotalBox

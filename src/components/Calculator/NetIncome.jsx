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
const NetIncome = ({ mobile }) => {
  if (mobile) {
    return (
      <Box>
        <Row>
          <Col col={12}>
            <Text style={{ fontWeight: 'bold', color: 'white' }}>Net income</Text>
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
            <Text style={{ color: 'white' }}>$ 0000</Text>
          </Col>
          <Col col={6}>
            <Text style={{ color: 'white' }}>$ 0000</Text>
          </Col>
        </Row>
      </Box>
    )
  }

  return (
    <Box>
      <Row style={{ padding: '30px 0' }}>
        <Col col={12} lg={6}>
          <Text style={{ fontWeight: 'bold', color: 'white' }}>Net income</Text>
        </Col>
        <Col col={4} lg={3} style={{ textAlign: 'center' }}>
          <Text style={{ color: 'white' }}>$ 0000</Text>
        </Col>
        <Col col={4} lg={3} style={{ textAlign: 'center' }}>
          <Text style={{ color: 'white' }}>$ 0000</Text>
        </Col>
      </Row>
    </Box>
  )
}

export default NetIncome

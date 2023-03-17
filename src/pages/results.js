import { useRouter } from 'next/router'
import { BaseCSS, Container, Row, Col } from 'styled-bootstrap-grid'
import styled from 'styled-components'

import Title from '@/components/Title'
import Input from '@/components/Input'
import TextBox from '@/components/TextBox'
import Button from '@/components/Button'
import Tooltip from '@/components/Tooltip'
import FinalResults from '@/components/Calculator/FinalResults'
import TotalBox from '@/components/Calculator/TotalBox'
import useMediaQuery from '@/hooks/useMediaQuery'

import styles from '@/styles/Calculator.module.css'

const Text = styled.span`
  display: block;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #012846;
`

const ResultsPage = () => {
  const router = useRouter()
  const isMobile = useMediaQuery('(max-width: 768px)')

  const handleStartClick = () => router.push('/')

  return (
    <>
      <BaseCSS />
      <header className={styles.header}>
        <div className={styles['header-image']} />
        <div className={styles['header-text']}>
          <Container style={{ padding: '0 30px' }}>
            <Row className="justify-content-md-center">
              <Col xs lg="8">
                <Title>Results</Title>
              </Col>
            </Row>
          </Container>
        </div>
      </header>
      <main className={styles.main}>
        <Container style={{ padding: '0 30px' }}>
          <Row style={{ marginBottom: '1rem' }}>
            <Col col={4} lg={3}></Col>
            <Col col={4}>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Text>Revenue per child (monthly)</Text>
                <Tooltip tooltipText='Expected monthly revenue per child' trigger={isMobile ? 'click' : 'hover'}><Text>?</Text></Tooltip>
              </div>
            </Col>
            <Col col={4}>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Text>Subsidy</Text>
                <Tooltip tooltipText='Working connections child care subsidy per month at 22 days per month' trigger={isMobile ? 'click' : 'hover'}><Text>?</Text></Tooltip>
              </div>
            </Col>
          </Row>
          <Row style={{ marginBottom: '0.5rem' }}>
            <Col col={12}><Text style={{ fontWeight: 'bold' }}># of infants</Text></Col>
          </Row>
          <Row style={{ marginBottom: '1.5rem' }}>
            <Col col={4} lg={3} style={{ display: 'flex', alignItems: 'center' }}>
              <Input />
            </Col>
            <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Text>$ 0000</Text>
            </Col>
            <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Text>$ 0000</Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: '0.5rem' }}>
            <Col col={12}><Text style={{ fontWeight: 'bold' }}># of toddlers</Text></Col>
          </Row>
          <Row style={{ marginBottom: '1.5rem' }}>
            <Col col={4} lg={3}>
              <Input />
            </Col>
            <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Text>$ 0000</Text>
            </Col>
            <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Text>$ 0000</Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: '0.5rem' }}>
            <Col col={12}><Text style={{ fontWeight: 'bold' }}># of preschoolers</Text></Col>
          </Row>
          <Row style={{ marginBottom: '1.5rem' }}>
            <Col col={4} lg={3}>
              <Input />
            </Col>
            <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Text>$ 0000</Text>
            </Col>
            <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Text>$ 0000</Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: '0.5rem' }}>
            <Col col={12}><Text style={{ fontWeight: 'bold' }}># of school-age children</Text></Col>
          </Row>
          <Row style={{ marginBottom: '1.5rem' }}>
            <Col col={4} lg={3} label='# of school-age children'>
              <Input />
            </Col>
            <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Text>$ 0000</Text>
            </Col>
            <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Text>$ 0000</Text>
            </Col>
          </Row>
          <TextBox style={{ marginTop: 8, marginBottom: '1.5rem', fontStyle: 'italic', padding: '28px 18px' }}>** 00<br />Estimated # of child care workers.</TextBox>
          <TextBox style={{ marginTop: 8, marginBottom: '1.5rem', fontStyle: 'italic', padding: '28px 18px' }}>** 00<br />Estimated # of preschool teachers.</TextBox>
          <TextBox style={{ marginTop: 8, marginBottom: '1.5rem', fontStyle: 'italic', padding: '28px 18px' }}>** 00<br />Estimated # of child care administrators (center director of family child care owner).</TextBox>
          <div style={{ margin: '20px 0', display: 'inline-block' }} />
          <Row style={{ marginBottom: '1rem' }}>
            <Col col={4} lg={3}>
              <Text style={{ fontWeight: 'bold' }}></Text>
            </Col>
            <Col col={8} label=''>
              <Text>Expected monthly salary</Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: '0.5rem' }}>
            <Col col={12}>
              <Text style={{ fontWeight: 'bold' }}># of child care workers</Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: '1.5rem' }}>
            <Col col={4} lg={3}>
              <Input />
            </Col>
            <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Text>$ 0000</Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: '0.5rem' }}>
            <Col col={12}>
              <Text style={{ fontWeight: 'bold' }}># of preschool teachers</Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: '1.5rem' }}>
            <Col col={4} lg={3}>
              <Input />
            </Col>
            <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Text>$ 0000</Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: '0.5rem' }}>
            <Col col={12}>
              <Text style={{ fontWeight: 'bold' }}># of child care administrators</Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: '1.5rem' }}>
            <Col col={4} lg={3}>
              <Input />
            </Col>
            <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Text>$ 0000</Text>
            </Col>
          </Row>
          <div style={{ margin: '40px 0', display: 'inline-block' }} />
          <FinalResults mobile={isMobile} />
          {!isMobile && (
            <Row style={{ margin: '60px 0 20px 0' }}>
              <Col offset={6} col={3} style={{ textAlign: 'center' }}>
                <Text style={{ fontSize: 16 }}>
                  Monthly
                </Text>
              </Col>
              <Col col={3} style={{ textAlign: 'center' }}>
                <Text style={{ fontSize: 16 }}>
                  Annual
                </Text>
              </Col>
            </Row>
          )}
          <TotalBox
            label='Total Income'
            monthlyValue={0}
            annualValue={0}
            mobile={isMobile}
          />
          <TotalBox
            label='Total Expenses'
            monthlyValue={0}
            annualValue={0}
            mobile={isMobile}
            style={{ margin: '12px 0' }}
          />
          <TotalBox
            label='Net Income'
            monthlyValue={0}
            annualValue={0}
            mobile={isMobile}
          />
          <Row style={{ display: 'flex', justifyContent: 'space-between', padding: '120px 0 60px 0' }}>
            <Col
              col={12}
              mg={6}
              lg={6}
              style={{ marginBottom: 12 }}
            >
              <Title style={{ margin: 0 }}>Thanks for using</Title>
              <Title style={{ margin: 0, marginTop: 4, fontSize: 20 }}>the Child Care Business Feasibility Calculator</Title>
            </Col>
            <Col
              col={12}
              md={6}
              lg={6}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Button textAlign='center' onClick={handleStartClick}>
                Start again
              </Button>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}

export default ResultsPage
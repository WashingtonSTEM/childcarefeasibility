import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'
import { BaseCSS, Container, Row, Col } from 'styled-bootstrap-grid'

import Title from '@/components/Title'
import Button from '@/components/Button'
import Divider from '@/components/Divider'
import StepBar from '@/components/StepBar'
import useForm from '@/hooks/useForm'
import useMediaQuery from '@/hooks/useMediaQuery'

import StepOne from '@/components/Calculator/StepOne'
import StepTwo from '@/components/Calculator/StepTwo'
import StepThree from '@/components/Calculator/StepThree'

import validate, { isRequired } from '@/utils/validate'

import styles from '@/styles/Calculator.module.css'

const MAX_STEPS = 3

const Text = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  color: #012846;
  margin: 6px 0;
`

const validationRules = {
  county: [isRequired],
}

const Page = () => {
  const router = useRouter()
  const { data, onDataChange } = useForm({})
  const [ errors, setErrors ] = useState({})
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [step, setStep] = useState(1)

  console.log(data)

  const handleStepDirection = (direction) => {
    let nextStep = step + direction

    if (nextStep < 1) {
      nextStep = 1
    }
    window.scrollTo(0, 0)
    setStep(nextStep)

    if (nextStep > MAX_STEPS) {
      router.push('/results')
    }
  }

  const handleSubmit = () => {
    const { errors, isValid } = validate(data, validationRules)
  
    // if (!isValid) {
    //   setErrors(errors)
  
    //   return
    // }
    // setErrors({})
    router.push('/results')
  }

  return (
    <>
      <BaseCSS />
      <header className={styles.header}>
        <div className={styles['header-image']} />
        <div className={`${styles['header-text']}${isMobile ? ` ${styles['header-text-mobile']}` : ''}`}>
          <Container style={{ padding: '0 30px' }}>
            <Row className="justify-content-md-center">
              <Col xs lg="8">
                <Title>Child Care Business Feasibility Calculator</Title>
                <Text>Welcome</Text>
                <Text style={{ maxWidth: 620 }}>Welcome to the child care feasibility calculator! we understand that starting or expanding a childcare business can be a challenging process, and that&apos;s why we&apos;ve developed this tool to help you determine the feasibility of your child care business idea.</Text>
              </Col>
            </Row>
          </Container>
        </div>
      </header>
      {isMobile && <StepBar step={step} steps={MAX_STEPS} />}
      <main className={styles.main}>
        <Container as='form' style={{ padding: '0 30px' }} onSubmit={(e) => e.preventDefault()}>
          <StepOne
            data={data}
            errors={errors}
            onDataChange={onDataChange}
            isMobile={isMobile}
            show={!isMobile || step === 1}
          />
          {!isMobile && <Divider style={{ margin: '72px 0 72px 0' }} />}
          <StepTwo
            data={data}
            errors={errors}
            onDataChange={onDataChange}
            show={!isMobile || step === 2}
          />
          {!isMobile && <Divider style={{ margin: '72px 0 72px 0' }} />}
          <StepThree
            data={data}
            errors={errors}
            onDataChange={onDataChange}
            isMobile={isMobile}
            show={!isMobile || step === 3}
          />
          {!isMobile ? (
            <div style={{ marginTop: 100, marginBottom: 50, display: 'flex', justifyContent: 'space-between' }}>
              <Button type='button' variant='secondary'>Cancel</Button>
              <Button type='button' textAlign='center' onClick={handleSubmit}>View Results</Button>
            </div>
          ) : (
            <div style={{ marginTop: 25, marginBottom: 50, display: 'flex', justifyContent: 'space-between' }}>
              <Button type='button' variant='secondary' onClick={() => handleStepDirection(-1)}>{step === 1 ? 'Cancel' : 'Back'}</Button>
              <Button type='button' textAlign='center' onClick={() => handleStepDirection(1)}>{step < 3 ? 'Next' : 'Finish'}</Button>
            </div>
          )}
        </Container>
      </main>
    </>
  )
}

export default Page

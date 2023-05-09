import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'
import { BaseCSS, Container, Row, Col } from 'styled-bootstrap-grid'
import { useIntl } from 'react-intl'

import Title from '@/components/Title'
import Button from '@/components/Button'
import Divider from '@/components/Divider'
import StepBar from '@/components/StepBar'
import useForm from '@/hooks/useForm'
import useMediaQuery from '@/hooks/useMediaQuery'
import Instructions from '@/components/Calculator/Instructions'

import StepOne, { validationRules as stepOneRules } from '@/components/Calculator/StepOne'
import StepTwo, { validationRules as stepTwoRules } from '@/components/Calculator/StepTwo'
import StepThree, { validationRules as stepThreeRules } from '@/components/Calculator/StepThree'

import styles from '@/styles/Calculator.module.css'

const MAX_STEPS = 3

const Text = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 600;
  color: #012846;
  margin: 6px 0;
`

const validationRules = {
  'step1': stepOneRules,
  'step2': stepTwoRules,
  'step3': stepThreeRules
}

const Page = () => {
  const intl = useIntl()
  const router = useRouter()
  const { data, onDataChange, validate, errors, clean } = useForm({})
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [step, setStep] = useState(1)

  const handleOnChange = (name, value) => {
    onDataChange(name, value)
    if (errors[name]) {
      if (isMobile) {
        validate(data, validationRules[`step${step}`])
      } else {
        validate(data, {
          ...stepOneRules,
          ...stepTwoRules,
          ...stepThreeRules
        })
      }
    }
  }

  const handleStepDirection = (direction) => {
    let nextStep = step + direction

    const isValid = validate(data, validationRules[`step${step}`])

    if (!isValid) {
      return
    }

    if (nextStep < 1) {
      nextStep = 1
    }
    window.scrollTo(0, 0)

    setStep(nextStep)

    if (nextStep > MAX_STEPS) {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    const isValid = validate(data, {
      ...stepOneRules,
      ...stepTwoRules,
      ...stepThreeRules
    })

    if (!isValid) {
      return
    }

    data.language = intl.locale || intl.defaultLocale

    router.push({
      pathname: '/results',
      query: data,
    })
  }

  return (
    <>
      <BaseCSS />
      {isMobile && <StepBar step={step} steps={MAX_STEPS} />}
      <main className={styles.main}>
        <Container as='form' style={{ padding: '0 30px' }} onSubmit={(e) => e.preventDefault()}>
          <StepOne
            data={data}
            errors={errors}
            onDataChange={handleOnChange}
            isMobile={isMobile}
            show={!isMobile || step === 1}
          />
          {!isMobile && <Divider style={{ margin: '72px 0 72px 0' }} />}
          <StepTwo
            data={data}
            errors={errors}
            onDataChange={handleOnChange}
            isMobile={isMobile}
            show={!isMobile || step === 2}
          />
          {!isMobile && <Divider style={{ margin: '72px 0 72px 0' }} />}
          <StepThree
            data={data}
            errors={errors}
            onDataChange={handleOnChange}
            isMobile={isMobile}
            show={!isMobile || step === 3}
          />
          {!isMobile ? (
            <div style={{ marginTop: 100, marginBottom: 50, display: 'flex', justifyContent: 'space-between' }}>
              <Button type='button' variant='secondary' onClick={clean}>
                { intl.formatMessage({ id: 'CANCEL' }) }
              </Button>
              <Button type='button' textAlign='center' onClick={handleSubmit}>
                { intl.formatMessage({ id: 'VIEW_RESULTS' }) }
              </Button>
            </div>
          ) : (
            <div style={{ marginTop: 25, marginBottom: 50, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                type='button'
                variant='secondary'
                onClick={() => step === 1 ? clean() : handleStepDirection(-1)}
              >
                {step === 1 ? 'Cancel' : 'Back'}
              </Button>
              <Button type='button' textAlign='center' onClick={() => handleStepDirection(1)}>{step < 3 ? 'Next' : 'Finish'}</Button>
            </div>
          )}
        </Container>
      </main>
    </>
  )
}

export default Page

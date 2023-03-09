import styled from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled.div`
  width: 100%;
  height: 10px;
  background: #D9D9D9;
`

const ProgressBar = styled.div.attrs(props => ({
  width: (props.step * 100) / props.steps
}))`
  width: ${props => `${props.width}%`};
  height: 100%;
  background: #DF6020;
  border-radius: ${props => props.width < 100 ? '0px 200px 200px 0px' : 'none'};
  transition: 300ms all;
`

const StepBar = ({ step, steps }) => {
  return (
    <Container>
      <ProgressBar step={step <= steps ? step : steps} steps={steps} />
    </Container>
  )
}

StepBar.propTypes = {
  step: PropTypes.number.isRequired,
  steps: PropTypes.number.isRequired
}

export default StepBar
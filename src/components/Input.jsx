import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.label`
  display: flex;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  background: #D9D9D9;
  border: 1px solid #012846;
  border-radius: 4px;
  font-family: 'Roboto';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  border-radius: 4px;
  transition: 300ms all;
  cursor: text;
  opacity: ${props => props.disabled ? '25%' : '100%'};
  &:focus-within {
    background: #948A85;
  }
  &:* {
    cursor: ${props => props.disabled ? 'none' : 'text'};
  }
  @media (max-width: 768px) {
    height: 55px;
    font-size: 17px;
  }
`

const InputWraper = styled.div`
  display: block;
  position: relative;
  flex: 1;
  height: 100%;
`

const Text = styled.span`
  position: absolute;
  top: 10px;
  left: ${props => props.align !== 'right' ? '10px' : null};
  right: ${props => props.align !== 'left' ? '10px' : null};
  color: #012846;
  transition: 200ms all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 768px) {
    top: 17px;
  }
`

const StyledInput = styled.input`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  padding: 0px 10px;
  background: inherit;
  border: none;
  border-radius: 4px;
  font: inherit;
  color: #012846;
  &:focus {
    outline: none;
  }
  &:focus + ${Text} {
    opacity: 0%;
  }
  &:disabled {
    cursor: none;
    pointer-events: none;
  }
`

const Input = ({ sufix, type, disabled, ...props }) => {
  return (
    <Container tabindex="1" disabled={disabled}>
      <InputWraper>
        <StyledInput
          sufix={sufix}
          inputmode={type}
          disabled={disabled}
          type={type === 'text' ? type : null}
          {...props}
        />
        { (!props.value || props.value === '') && <Text>{props.label}</Text> }
      </InputWraper>
      {sufix && <Text align="right" style={{ marginLeft: 8 }}>{ sufix }</Text>}
    </Container>
  )
}

Input.propTypes = {
  sufix: PropTypes.string,
  label: PropTypes.string,
}

Input.defaultProps = {
  type: 'text'
}

export default Input

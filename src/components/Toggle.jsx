import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  cursor: pointer;
  font-size: 16px;
  font-family: 'Roboto';
  font-weight: 400;
  color: #012846;
  @media (min-width: 769px) {
    font-size: 14px;
  }
`

const Switch = styled.div`
  position: relative;
  background: #D9D9D9;
  width: 54px;
  height: 33px;
  border-radius: 38px;
  border: 1px solid #012846;
  transition: 300ms all;
  &:before {
    content: "";
    transition: 300ms all;
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    top: 50%;
    left: 4px;
    background: #012846;
    transform: translate(0, -50%);
    @media (max-width: 768px) {
      width: 41px;
      height: 41px;
      left: 6px;
    }
  }
  @media (max-width: 768px) {
    width: 90px;
    height: 55px;
  }
`

const Input = styled.input`
  opacity: 0;
  position: absolute;

  &:checked + ${Switch} {
    background: #012846;
    border: 1px solid #D9D9D9;
    &:before {
      background: #D9D9D9;
      transform: translate(19px, -50%);
      @media (max-width: 768px) {
        transform: translate(34px, -50%);
      }
    }
  }
`

const Toggle = ({ name, label, textAlign, onChange, checked }) => {
  const handleOnChange = (event) => onChange?.(event)

  return (
    <Container>
      {textAlign === 'left' && <span>{label}</span>}
      <Input
        name={name}
        type="checkbox"
        checked={checked}
        onChange={handleOnChange} />
      <Switch />
      {textAlign === 'right' && <span>{label}</span>}
    </Container>
  )
}

Toggle.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  textAlign: PropTypes.oneOf(['left', 'right'])
}

Toggle.defaultProps = {
  textAlign: 'left',
}

export default Toggle
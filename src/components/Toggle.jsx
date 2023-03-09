import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 16px;
  font-family: 'Freight';
  font-weight: 300;
`

const Switch = styled.div`
  position: relative;
  width: 90px;
  height: 52px;
  background: #D9D9D9;
  border-radius: 38px;
  border: 1px solid #012846;
  transition: 300ms all;
  &:before {
    content: "";
    transition: 300ms all;
    position: absolute;
    width: 41px;
    height: 41px;
    border-radius: 50%;
    top: 50%;
    left: 6px;
    background: #012846;
    transform: translate(0, -50%);
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
      transform: translate(36px, -50%);
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
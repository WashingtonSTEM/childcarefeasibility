import styled from 'styled-components'
import PropTypes from 'prop-types'

const Button = styled.button.attrs(props => ({
  variant: props.variant || 'primary',
  textAlign: props.textAlign || 'left'
}))`
  background: ${props => props.variant === 'primary' ? '#DF6020' : '#F4F4F4'};
  border-radius: 4px;
  min-width: 145px;
  height: 55px;
  border: none;
  padding: 10px 20px;
  color: ${props => props.variant === 'primary' ? '#F4F4F4' : '#DF6020'};
  text-transform: uppercase;
  font-family: 'Freight';
  font-weight: normal;
  font-style: normal;
  text-align: ${props => props.textAlign};
  font-size: 14px;
  cursor: pointer;
  &:hover:not([disabled]) {
    background: #FC864A;
    color: #F4F4F4;
  }
  &:active:not([disabled]) {
    background: ${props => props.variant === 'primary' ? '#F4F4F4' : '#DF6020'};
    color: ${props => props.variant === 'primary' ? '#DF6020' : '#F4F4F4'};
  }
  &:disabled {
    opacity: 50%;
    cursor: none;
    pointer-events: none;
  }
`

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary']),
  textAlign: PropTypes.oneOf(['left', 'center', 'right'])
}

export default Button

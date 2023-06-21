import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from './Button'

const IconButton = styled(Button)`
  width: 35px;
  max-width: 35px;
  min-width: 35px;
  height: 35px;
  border-radius: 31px;
  padding: 0;
  text-transform: none;
  text-align: center;
  background: ${props => props.backgroundColor || Button.background };
  ${ props => props.backgroundColor 
    ? `
      &:hover:not([disabled]) {
        opacity: 75%;
        background: ${props.backgroundColor}
      }
      &:active:not([disabled]) {
        opacity: 90%;
        background: ${props.backgroundColor}
      }
    `
    : ''
}
@media (max-width: 768px) {
  width: 50px;
  max-width: 50px;
  min-width: 50px;
  height: 50px;
}
`

IconButton.propTypes = {
  backgroundColor: PropTypes.string
}

export default IconButton

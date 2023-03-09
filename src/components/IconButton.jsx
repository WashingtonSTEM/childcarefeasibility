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
`

IconButton.propTypes = {
  backgroundColor: PropTypes.string
}

export default IconButton

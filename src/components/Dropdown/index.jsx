import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Menu, { MenuItem } from './Menu'
import List, { ListItem } from './List'

import LinkButton from '../LinkButton'
import DropdownArrowDown from '../../assets/dropdown-arrow.svg'

const Toggle = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  background: #D9D9D9;
  border: 1px solid #012846;
  border-radius: ${props => props.show ? '4px 4px 0 0' : '4px'};
  font-family: inherit;
  font-size: inherit;
  color: #012846;
  text-align: left;
  padding: 0 10px;
  cursor: pointer;
  &:after {
    content: '';
    position: absolute;
    background-image: url(${DropdownArrowDown});
    width: 18px;
    height: 10px;
    top: 22px;
    right: 10px;
    transition: 250ms all;
    transform: rotate(${props => props.show ? '180' : '0'}deg);
  }
}
`

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 55px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  ${Toggle} {
    ${props => props.type === 'list' ? `
    &:after {
      display: none;
    }
    ` : ''}
  }
`

const Back = styled.div`
  display: flex;
`

const Dropdown = ({ label, options, value, onChange, ...props }) => {
  const containerRef = useRef()
  const [show, setShow] = useState(false)

  const selectedOption = value ? options.find(({ value: opValue }) => opValue === value)?.text : null

  const open = () => setShow(true)

  const close = () => setShow(false)

  useEffect(() => {
    const handleClickListener = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        close()
      }
    }

    document.addEventListener('click', handleClickListener)

    return () => {
      document.removeEventListener('click', handleClickListener)
    }
  }, [])

  const handleOnClick = () => show ? close() : open()

  const handleSelection = (value) => {
    onChange?.(value)
    close()
  }

  return (
    <Container ref={containerRef} type={props.type}>
      <Toggle onClick={handleOnClick} show={show}>
        {selectedOption || label}
      </Toggle>
      {props.type !== 'list' && show && (
        <Menu show={show}>
          {options.map(({ text, value }, index) => (
            <MenuItem key={`item-${index}`} value={value} onClick={handleSelection}>{text}</MenuItem>
          ))}
        </Menu>
      )}
      {props.type === 'list' && show && (
        <List show={show}>
          <LinkButton style={{ marginBottom: 12 }} onClick={close}>
            <Back>
              <svg
                width="10"
                height="18"
                viewBox="0 0 10 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0.366138 8.09227C-0.122048 8.59433 -0.122048 9.40968 0.366138 9.91175L7.86467 17.6235C8.35286 18.1255 9.14567 18.1255 9.63386 17.6235C10.122 17.1214 10.122 16.306 9.63386 15.804L3.01796 9L9.62996 2.19603C10.1181 1.69396 10.1181 0.878612 9.62996 0.376548C9.14177 -0.125516 8.34896 -0.125516 7.86077 0.376548L0.362233 8.08825L0.366138 8.09227Z" fill="#012846" />
              </svg>
              <span style={{ marginLeft: 12 }}>Back</span>
            </Back>
          </LinkButton>
          {options.map(({ text, value }, index) => (
            <ListItem key={`item-${index}`} value={value} onClick={handleSelection}>{text}</ListItem>
          ))}
        </List>
      )}
    </Container>
  )
}

Dropdown.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['menu', 'list'])
}

Dropdown.defaultProps = {
  type: 'menu'
}

export default Dropdown

import styled from 'styled-components'

import LinkButton from '../LinkButton'


const ListContainer = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  padding: 24px 0;
  box-sizing: border-box;
  z-index: 1;
`

const Item = styled.a`
  display: block;
  width: 100%;
  color: #012846;
  background: white;
  border-bottom: 1px solid #012846;
  padding: 17px 10px;
  box-sizing: border-box;
  cursor: pointer;
  text-transform: capitalize;
  text-decoration: none;
  &:hover {
    background: #D9D9D9;
  }
`

const Back = styled.div`
  display: flex;
`

export const ListItem = ({ value, onClick, children }) => {
  const handleOnClick = (event) => {
    event.preventDefault()
    onClick?.(value)
  }

  return (
    <Item href={`#/${value}`} onClick={handleOnClick}>{children}</Item>
  )
}

const List = ({ show, onClose, children, ...props }) => {
  return (
    <ListContainer show={show} {...props}>
      <LinkButton style={{ marginBottom: 12, padding: '0 30px' }} onClick={onClose}>
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
      <div style={{ height: '100%', overflowY: 'auto', padding: '0 30px' }}>
        {children}
      </div>
    </ListContainer>
  )
}

export default List

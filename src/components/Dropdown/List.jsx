import styled from 'styled-components'

const List = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  padding: 24px 30px;
  box-sizing: border-box;
  overflow-y: auto;
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

export const ListItem = ({ value, onClick, children }) => {
  const handleOnClick = (event) => {
    event.preventDefault()
    onClick?.(value)
  }

  return (
    <Item href={`#/${value}`} onClick={handleOnClick}>{children}</Item>
  )
}

export default List

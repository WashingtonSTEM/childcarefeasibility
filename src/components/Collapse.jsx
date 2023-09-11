import React, { useState } from "react";
import styled from "styled-components";

const CustomCollapseButton = styled.button`
  background-color: #df6020;
  border-radius: 5px;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #00afda;
  }
`;

const CustomCollapseContent = styled.div`
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  padding: 10px;
  &.show {
    max-height: 1000px;
  }
`;

function CustomCollapse({ title, children }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div>
      <CustomCollapseButton onClick={toggleCollapse}>
        {title}
      </CustomCollapseButton>
      {!isCollapsed && (
        <CustomCollapseContent>{children}</CustomCollapseContent>
      )}
    </div>
  );
}

export default CustomCollapse;

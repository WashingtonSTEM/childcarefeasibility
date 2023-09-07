import React, { useState } from 'react';

function CustomCollapse({ title, children }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div>
      <button onClick={toggleCollapse} className="custom-collapse-button">
        {title}
      </button>
      {!isCollapsed && (
        <div className="custom-collapse-content">
          {children}
        </div>
      )}
    </div>
  );
}

export default CustomCollapse;

import React from 'react';

import styled from "styled-components";

// Style
const StyledSeperate  = styled.div`
  .seperate{
    margin: 50px 0;
    content: "";
    height: 2px;
    flex: 1;
    background-color: ${(props) => props.theme.hover};
  }
`;

const Seperate = () => {
    return (
        <StyledSeperate>
            <div className="seperate"></div>
        </StyledSeperate>
    );
};

export default Seperate;
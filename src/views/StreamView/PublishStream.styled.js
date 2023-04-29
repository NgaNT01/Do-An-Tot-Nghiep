import styled from 'styled-components';

export const StyledPublishStream = styled.div `
  .publish-wrap {
    display: flex;
    height: 650px;
    
    .livestream-box {
      border: 2px solid blue;
      width: 80%;
      background-color: black;
      
      video {
        width: 100%;
        height: 645px;
      }
    }
    
    .chat-box {
      border: 2px solid red;
      width: 20%;
      margin-left: 20px
    }
  }
`
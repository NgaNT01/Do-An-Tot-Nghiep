import styled from 'styled-components';

export const StyledPublishStream = styled.div `
  .publish-wrap {
    display: flex;
    background-color: rgb(232,232,232);
    
    .livestream-box {
      width: 80%;
      margin-left: 10px;
      background-color: rgb(256,256,256);
      border-radius: 10px;
      
      video {
        width: 100%;
        height: 700px;
        background-color: black;
      }
    }
    
    .chat-box {
      background-color: rgb(256,256,256);
      width: 20%;
      border-radius: 10px;
      margin-left: 10px;
      margin-right: 10px;
      position: relative;
      
      .chat-messages {
        display: flex;
        flex-direction: column;
        overflow: auto;
        position: absolute;
        top: 0;
        height: 650px;
        width: 100%;
      }
      
      .box-footer {
        display: flex;
        justify-content: space-around;
        position: absolute;
        bottom: 0;
        
        input {
          margin: 0 10px 0 10px;
        }
        
        .send-button {
          margin-right: 10px;
        }
      }
    }
  }
`
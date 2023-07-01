import styled from 'styled-components';

export const StyledMyInformation = styled.div `
  margin: 0px 80px;
  img {
    border-radius: 999px;
  }
  
  .pp {
    width: 130px;
    height: 130px;
    border-radius: 999px;
    //background-color: deeppink;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    
    .pp:hover {
      background-color: black;
    }
    
    
  }
  
  .tips {
    width: 134px;
    height: 138px;
    border-radius: 999px;
    background-color: #333;
    position: absolute;
    top: 93px;
    left: 402px;
    text-align: center;
    color: #fff;
    opacity: 0; /* Bắt đầu với độ trong suốt là 0 */
    transition: opacity 0.3s ease;
    
    .upload-outline {
      font-size: 48px;
      margin-top: 40px;
      
    }
    
    .input-avatar {
      width: 134px;
      height: 138px;
      border-radius: 999px;
      background-color: black;
      position: absolute;
      opacity: 0;
      top: 0;
      left: 0;
      cursor: pointer;
    }
  }
  .tips:hover {
    opacity: 0.5;
    cursor: pointer;
  }
  
  .information {
    color: #B4B4B4;
    font-size: 20px;
    
    ul {
      li {
        margin: 30px 0px;

        span {
          color: #5A5A5A;
        }
      }
      
    }
  }
`
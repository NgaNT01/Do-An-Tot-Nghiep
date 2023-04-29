import styled from "styled-components";

export const StyledLogin = styled.div `
  .login-wrap {
    margin: auto;
    width: 50%;
    padding: 10px;
    margin-top: 200px;
    
    h1 {
      margin-left: 260px;
      margin-bottom: 50px;
      padding: 10px;
      color: blue;
      font-size: 52px;
    }
    
    .login-form {
      max-width: 500px;
      margin: auto;
      padding: 10px;
    }
    .login-form-forgot {
      float: right;
    }
    .ant-col-rtl .login-form-forgot {
      float: left;
    }
    .login-form-button {
      width: 100%;
    }
  }
  
`
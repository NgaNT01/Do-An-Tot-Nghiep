import styled from 'styled-components';

export const StyledSignUp = styled.div `
  .signup-wrap {
    margin: auto;
    width: 50%;
    padding: 10px;
    margin-top: 200px;

    h1 {
      margin-left: 170px;
      margin-bottom: 50px;
      padding: 10px;
      color: blue;
      font-size: 52px;
    }

    .signup-form {
      max-width: 500px;
      margin: auto;
      padding: 10px;
    }
    .signup-form-forgot {
      float: right;
    }
    .ant-col-rtl .signup-form-forgot {
      float: left;
    }
    .signup-form-button {
      width: 100%;
    }
  }
`
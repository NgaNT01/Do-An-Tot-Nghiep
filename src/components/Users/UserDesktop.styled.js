import styled from "styled-components";

export const StyledUsersDesktop = styled.div`
  .channels-box {
    display: block;
    margin-top: 30px;
    color: ${(props) => props.theme.textColor};

    h1 {
      font-size: 30px;
      font-weight: 500;
      padding: 5px 0;
    }

    .list {
      display: flex;
      gap: 10px;
    }
  }
`;

export const StyledUserDesktop = styled.div`
  .wrapper {
    width: 230px;
    height: 280px;
    margin: 8px 16px 16px 16px;
    border-radius: 999px;
    display: flex;
    flex-direction: column;
    .username {
      align-self: center;
      font-size: 24px;
    }
    .follow-count {
      align-self: center;
      font-size: 18px;
      margin-top: 5px;
    }
  }
`;
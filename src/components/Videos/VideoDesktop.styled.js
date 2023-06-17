import styled from "styled-components";

export const StyledVideosDesktop = styled.div`
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

export const StyledVideoDesktop = styled.div`
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
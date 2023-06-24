import styled from 'styled-components';

export const StyledStatistic = styled.div`
    background-color: #F7F7F8;
    .statis-time-wrapper {
      margin: 50px auto 0px auto;
      width: 1155px;
      
      .month-picker {
        width: 900px;
        height: 60px;
      }
      .statis-button {
        margin-left: 50px;
        width: 200px;
        height: 60px;
        font-size: 20px;
      }
    }
    
    .statis-info-wrapper {
      display: flex;
      justify-content: space-around;
      margin: 10px auto 0px auto;
      width: 1155px;
      
      .statis-info-item {
        width: 383px;
        height: 80px;
        display: flex;
        flex-direction: column;
        text-align: center;
        box-shadow: 0 3px 3px rgba(0, 0, 0.1, 0.3);
        
        .info-number {
          color: #333333;
          font-size: 2.4rem;
        }
        .info-title {
          color: #53535f;
          font-size: 1.3rem;
        }
      }
    }
  
  .statis-chart-wrapper {
    margin: 10px auto 5px auto;
    width: 60%;
    box-shadow: 0 3px 3px rgba(0, 0, 0.1, 0.3);
  }
  
  .export-button {
    margin: auto;
    width: 60%;
    box-shadow: 0 3px 3px rgba(0, 0, 0.1, 0.3);
    background-color: #D9D9DD;
  }
    
`;
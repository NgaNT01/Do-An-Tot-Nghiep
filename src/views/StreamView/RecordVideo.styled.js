import styled from 'styled-components';

export const StyledRecordVideo = styled.div`
    .video-box {
      width: 1536px;
      height: 700px;
    }
  
    .option-bar {
      margin-top: 30px;
      padding-left: 50px;

      .share-dialog {
        position: absolute;
        left: 330px;
        margin-bottom: 10px;
        bottom: 130px;
        background-color: white;
        border-radius: 10px;
        padding: 10px 30px 10px 30px;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
        width: 400px;

        svg {
          background-color: white;
          margin-right: 10px;
          margin-left: 5px;
          cursor: pointer;
        }
      }
    }
    
    
`;
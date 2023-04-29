import styled from "styled-components";

export const StyledStreamView = styled.div`
  .stream-view-wrap {
    display: flex;
    background-color: rgb(232,232,232);
    
    .stream-view-box {
      width: 80%;
      margin-left: 10px;
      background-color: rgb(256,256,256);
      border-radius: 10px;
      
      .video-view {
        video {
          width: 100%;
          height: 700px;
          background-color: black;
        }
      }
      .user-info {
        display: flex;
        justify-content: space-between;
        padding: 30px 5px 10px 5px;

        .left {
          display: flex;

          .pp {
            display: block;

            img {
              width: 100px;
              height: 100px;
              border-radius: 999px;
              cursor: pointer;
            }
          }

          .profile-info {
            padding: 0 10px;
            font-size: 14px;
            color: ${(props) => props.theme.textColor};

            .title {
              font-weight: 500;
              font-size: 1.8rem;
            }
            .username {
              padding: 5px 0;
            }

            .username,
            .game {
              cursor: pointer;
              color: #5c16c5;
              font-size: 1rem;
              padding: 2px 2px 2px 10px;
            }

            .tags {
              display: flex;
              gap: 5px;
              align-items: center;
              margin-top: 5px;

              .tag {
                padding: 4px 8px;
                background-color: ${(props) => props.theme.hover};
                border-radius: 10px;
                cursor: pointer;
              }
            }
          }
        }

        .right {
          cursor: pointer;
        }
      }
    }
    .chat-box {
      background-color: rgb(256,256,256);
      width: 20%;
      border-radius: 10px;
      margin-left: 10px;
      margin-right: 10px;
    }
  }
  }
`;
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

html {
  scroll-behavior: smooth;
}

body {
  background: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};

  .react-loading {
    display: inline-block;
    position: fixed !important;
    top: 35% !important;
    left: 50% !important;
    transform: translate(-50%, -50%);
  }
  
  .ant-layout {
    .ant-layout-sider {
      width: 500px !important;
      max-width: 500px !important;
      min-width: 300px !important;
    }
  }
  
}
body::-webkit-scrollbar {
  width: 5px;
}
 
body::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}

a {
  color: ${(props) => props.theme.text};
}

.app {
  display: block;
}

@media (min-width: 768px) {
  .app {
    .main {
      padding: 55px 15px 55px 75px;

      &.sidebar-open {
        padding-left: 265px;
      }
    }  
  }
}

  

@media (min-width: 768px) {
  body {
    background: ${(props) => props.theme.bodyDesktop};
  }
}

@keyframes pageAnim {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default GlobalStyles;

import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html {
    position: relative;
    padding-bottom: 100px;
    box-sizing: border-box;
  }

  html,
  body {
    font-family: "Source Sans Pro", sans-serif;
    width: 100%;
    min-height: 100vh;
    background-color: #fafafa;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    
    min-height: 100vh;
    min-width: 100%;
  }

  a {
    color: #5CB85C;
    text-decoration: none;
  }

  fieldset {
    min-width: 0;
    padding: 0;
    margin: 0;
    border: 0;
  }

  .form-group {
    margin-bottom: 1rem;
  }
`;

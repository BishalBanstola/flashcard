// GlobalStyle.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* Apply styles to all form elements */
  form {
    margin: 20px 0;
    padding: 0;
  }
  label{
    font-size: 18px;
    padding:0 10px;
  }

  input {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
   button[type="submit"] {
    padding: 8px 36px;
    border-radius: 4px;
    border: none;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
  }
  p{
    font-size: 20px;
    line-height:1.5;
    font-weight: 500;
  }

`;

export default GlobalStyle;

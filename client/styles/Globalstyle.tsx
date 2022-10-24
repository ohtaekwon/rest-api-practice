import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyles = createGlobalStyle`
  ${normalize}
  html {
    box-sizing: border-box;
    outline:none;
    border:none;
    margin:0;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }
  *,*::before, *::after {box-sizing: inherit; };
  a { cursor: pointer; text-decoration: none; }; 
  ul{ list-style:none; padding:0; margin: 0; };
  svg, path{
    color:inherit;
  };
  input,select{
    outline: none;
  }
  button{
    outline:none;
  }
`;

export default GlobalStyles;

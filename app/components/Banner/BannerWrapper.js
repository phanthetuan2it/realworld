import styled from 'styled-components';

const BannerWrapper = styled.div`
  background: #5CB85C;
  box-shadow: inset 0 8px 8px -8px rgba(0, 0, 0, 0.3), inset 0 -8px 8px -8px rgba(0, 0, 0, 0.3);
  padding: 2rem;
  margin-bottom: 2rem;
  color: #fff;

  h1 {
    font-family: "Titillium Web", sans-serif;
    text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
    font-weight: 700 !important;
    text-align: center;
    font-size: 3.5rem;
    padding-bottom: 0.5rem;
    margin: 0;
  }

  p {
    color: #fff;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 300;
    margin: 0;
  }
`;

export default BannerWrapper;

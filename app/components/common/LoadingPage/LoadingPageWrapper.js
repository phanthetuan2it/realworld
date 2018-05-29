import styled, { keyframes } from 'styled-components';

const rotation = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(359deg);
}
`;

const LoadingPageWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;

  &:before {
    content: '';
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 5px solid #5CB85C;
    border-top-color: transparent;
    position: absolute;
    left: 50%;
    top: 50%;
    animation: ${rotation} 1s linear infinite;
  }
`;

export default LoadingPageWrapper;

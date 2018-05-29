import styled from 'styled-components';

const PaginationWrapper = styled.ul`
  a {
    &.active {
      z-index: 2;
      color: #fff;
      cursor: default;
      background-color: #5CB85C;
      border-color: #5CB85C;
    }
  }
`;

export default PaginationWrapper;

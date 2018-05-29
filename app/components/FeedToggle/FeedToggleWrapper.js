import styled from 'styled-components';

const FeedToggleWrapper = styled.ul`
  margin-bottom: -1px;
  overflow: auto;

  .nav-link {
    border-radius: 0px;
    border: none;
    border-bottom: 2px solid transparent;
    background: transparent;
    color: #aaa;

    &:hover {
      color: #555;
    }
  }

  .nav-link.active {
    background: #fff !important;
    border-bottom: 2px solid #5CB85C !important;
    color: #5CB85C !important;
  }
`;

export default FeedToggleWrapper;

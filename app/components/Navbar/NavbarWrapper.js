import styled from 'styled-components';

const NavbarWrapper = styled.nav`
  float: right;
  list-style: none;

  li {
    display: inline-block;
  }

  .nav-link {
    color: rgba(0, 0, 0, 0.3);

    &.active,
    &:hover {
      color: rgba(0, 0, 0, 0.8);
    }
  }
`;

export default NavbarWrapper;

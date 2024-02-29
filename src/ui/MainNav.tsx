import { HomeIcon, ClockIcon } from '@heroicons/react/24/solid';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    justify-content: center;
    gap: 1.2rem;

    color: #888;
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: #000;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: #888;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: #000;
  }
`;

export default function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/home">
            <HomeIcon /> <span>Home</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/history">
            <ClockIcon />
            <span>History</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

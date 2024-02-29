import styled from 'styled-components';
import SearchBar from './SearchBar';

const StyledHeader = styled.header`
  background-color: #555;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  justify-content: center;
  padding: 10rem 0;

  h1 {
    font-size: 3rem;
    font-weight: 600;
    color: #fff;
  }
`;

export default function Header() {
  return (
    <StyledHeader>
      <h1>PixelPals: Sweeftly Amusing Shots</h1>
      <SearchBar />
    </StyledHeader>
  );
}

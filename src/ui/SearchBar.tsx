import styled from 'styled-components';

const Input = styled.input`
  border: 1px solid #555;
  border-radius: 6px;
  padding: 0.8rem 1.2rem;
`;

export default function SearchBar() {
  return <Input placeholder="search for free photos" />;
}

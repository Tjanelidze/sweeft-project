import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledList = styled.ul`
  display: flex;
  gap: 5rem;

  & li {
    border: 1px solid #777;
    padding: 1rem 2rem;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5rem;

  & h2 {
    font-weight: 600;
    color: #222;
  }

  & button {
    background-color: #222;
    color: #fff;
    padding: 1rem;
    border: none;
    border-radius: 1.5rem;
  }
`;

function History() {
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const storedSearchHistory = localStorage.getItem('searchHistory');
    if (storedSearchHistory) {
      setSearchHistory(JSON.parse(storedSearchHistory));
    }
  }, [searchParams]);

  const handleClearHistory = () => {
    localStorage.removeItem('searchHistory');
    setSearchHistory([]);
  };

  return (
    <div>
      <StyledHeader>
        <h2>Search History</h2>
        <button onClick={handleClearHistory}>Clear History</button>
      </StyledHeader>
      <StyledList>
        {searchHistory.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </StyledList>
    </div>
  );
}

export default History;

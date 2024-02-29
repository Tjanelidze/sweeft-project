import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import MainNav from './MainNav';

const StyledAppLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
`;

const Main = styled.main`
  padding: 0 8rem;
  margin-top: 3rem;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 130rem;
  display: flex;
  gap: 5rem;
  flex-direction: column;
`;

export default function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Main>
        <Container>
          <MainNav />
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

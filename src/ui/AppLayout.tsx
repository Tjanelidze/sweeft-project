import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const StyledAppLayout = styled.div`
  height: 100vh;
`;
export default function AppLayout() {
  return (
    <StyledAppLayout>
      <h1>AppLayout</h1>
      <Outlet />
    </StyledAppLayout>
  );
}

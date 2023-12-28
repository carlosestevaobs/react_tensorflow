import React from 'react';
import styled from 'styled-components';
import MenuNavbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  margin: 0;
  width: 100vw;
`;

const Default = () => {
  return (
    <Container>
      <MenuNavbar />
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
};

export default Default;

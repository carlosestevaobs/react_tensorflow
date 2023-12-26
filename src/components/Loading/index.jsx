import React from 'react';
import styled from 'styled-components';

const Spinner = styled.div`
  border: 4px solid #1f77b4;
  border-top: 4px solid #ff7f0e;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Loading = () => {
  return (
    <Spinner />
  );
};

export default Loading;
    
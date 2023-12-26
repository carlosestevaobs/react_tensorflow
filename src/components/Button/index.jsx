import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: #1f77b4;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

function Button({ text, onClick, disabled }) {
    return (
        <StyledButton onClick={onClick} disabled={disabled}>
            {text}
        </StyledButton>
    );
}

export default Button;

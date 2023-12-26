import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
`;

function Input({ type, value, onChange }) {
    const handleChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <StyledInput
            type={type}
            value={value}
            onChange={handleChange}
        />
    );
}

export default Input;

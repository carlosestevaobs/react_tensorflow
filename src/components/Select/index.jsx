import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
`;

function Select({ options, value, onChange }) {
    const handleChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <StyledSelect value={value} onChange={handleChange}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </StyledSelect>
    );
}

export default Select;

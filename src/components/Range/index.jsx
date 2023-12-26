import React from 'react';
import styled from 'styled-components';

const StyledRange = styled.input`
    width: 80%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
`;

function Range({ value, min, max, step, onChange }) {
    return (
        <StyledRange
            type="range"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={onChange}
        />
    );
}

export default Range;

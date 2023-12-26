import React from 'react';
import styled from 'styled-components';

const StyledCheckboxInput = styled.input`
    margin-right: 5px;
`;

const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    cursor: pointer;
`;

function Checkbox({ checked, onChange, text }) {
    const handleCheckboxChange = (e) => {
        onChange(e.target.checked);
    };

    return (
        <CheckboxLabel>
            <StyledCheckboxInput
                type="checkbox"
                checked={checked}
                onChange={handleCheckboxChange}
            />
            {text}
        </CheckboxLabel>
    );
}

export default Checkbox;

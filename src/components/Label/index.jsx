import styled from 'styled-components';

const StyledLabel = styled.div`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #1F77B4;
`;

const Label = ({ text }) => {
  return <StyledLabel>{text}</StyledLabel>;
};

export default Label;

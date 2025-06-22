import styled from "styled-components";

const TextAreaWrapper = styled.div`
  margin-bottom: 16px;
`;

const StyledLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 6px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  min-height: 100px;
`;

export default function BoardTextArea({ label, value, name, onChange }) {
  return (
    <TextAreaWrapper>
      <StyledLabel>{label}</StyledLabel>
      <StyledTextArea value={value} name={name} onChange={onChange} />
    </TextAreaWrapper>
  );
}

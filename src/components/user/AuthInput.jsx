import styled from "styled-components";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 320px;
  width: 100%;
`;
const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;
const Label = styled.label`
  font-size: 14px;
  margin: 8px;
  font-weight: bold;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const SubLabel = styled.span`
  font-size: 12px;
  margin: 5px;
  color: #666;
`;

const StyledInput = styled.input`
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 14px;
  width: 100%;
  margin-bottom: 10px;
  &:focus {
    border-color: royalblue;
  }

  @media (max-width: 768px) {
  padding: 7px;
  }
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 12px;
  margin: 0;
  word-break: keep-all;
  white-space: normal;


  @media (max-width: 768px) {
  font-size: 10px;
  }
`;

export default function AuthInput({
  label,
  subLabel,
  type = "text",
  name,
  value,
  onChange,
  autoComplete,
  error,
}) {
  return (
    <InputWrapper>
      <LabelWrapper>
        <Label htmlFor={name}>{label}</Label>
        {error && <ErrorMsg>{error}</ErrorMsg>}
      </LabelWrapper>
      {subLabel && <SubLabel>{subLabel}</SubLabel>}

      <StyledInput
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
      />
    </InputWrapper>
  );
}

import styled from "styled-components";

const SelectWrapper = styled.div`
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

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export default function BoardSelect({ label, value, name, onChange, options }) {
  return (
    <SelectWrapper>
      <StyledLabel>{label}</StyledLabel>
      <StyledSelect value={value} name={name} onChange={onChange}>
        <option value="">카테고리를 선택해주세요.</option>
        {options.map((opt) => {
          return (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
      </StyledSelect>
    </SelectWrapper>
  );
}

import styled from "styled-components";


const InputWrapper = styled.div`
    margin-bottom: 16px;
`;

const StyledLabel = styled.label`
    display: block;
    font-weight: bold;
    margin-bottom: 6px;

    @media (max-width:768px) {
        font-size: 14px;
    }
`;

const StyledInput = styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
`;


export default function BoardInput({label, value, onChange, type="text", name}){

    return (
        <InputWrapper>
            <StyledLabel>{label}</StyledLabel>
            <StyledInput value={value} onChange={onChange} type={type} name={name}/>
        </InputWrapper>
    )
}
import styled from "styled-components";

export const TextInputField = styled.input`
  background: ${({ theme }) => theme.colors.DP03};
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.BORDER};
  color: ${({ theme }) => theme.colors.TEXT};
  outline: none;
  padding: 10px 12px;

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.filterBgHover};
  }

  &::placeholder {
    color: #ccc;
    font-weight: 300;
  }
`;

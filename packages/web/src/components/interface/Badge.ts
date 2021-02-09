import styled from 'styled-components';

interface IBadgeStyledPros {
  variant?: 'primary'|'secondary'|'success'|'warning'|'error'|'info';
}

export const Badge = styled.span<IBadgeStyledPros>`
  background: ${({ theme, variant }) => theme[variant || 'secondary'].main};
  color: ${({ theme, variant }) => theme[variant || 'secondary'].contrastText};
  padding: 5px;
  margin: 5px;
  font-size: 10px;
  box-shadow: ${({ theme }) => theme.shadow};
  border-radius: 5px;
`;

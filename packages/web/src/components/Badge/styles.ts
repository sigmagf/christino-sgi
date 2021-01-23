import styled from 'styled-components';

interface IBadgeContainerStyledPros {
  variant: 'primary'|'secondary'|'success'|'warning'|'error'|'info';
}

export const BadgeContainer = styled.span<IBadgeContainerStyledPros>`
  background: ${({ theme, variant }) => theme[variant].main};
  color: ${({ theme, variant }) => theme[variant].contrastText};
  padding: 5px;
  margin: 5px;
  font-size: 10px;
  box-shadow: ${({ theme }) => theme.shadow};
  border-radius: 5px;
`;

import styled from 'styled-components';

interface IBadgeContainerStyledPros {
  variant: 'primary'|'secondary'|'success'|'warning'|'error'|'info';
}

export const BadgeContainer = styled.span<IBadgeContainerStyledPros>`
  background: ${({ theme, variant }) => theme[variant].main};
  color: ${({ theme, variant}) => theme[variant].contrastText};
  padding: 5px;
  margin: 5px;
  font-size: 10px;
  box-shadow: 0 0 4px 4px rgba(29, 31, 35, .25);
  border-radius: 10px;
`;

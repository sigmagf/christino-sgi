import { lighten, shade } from 'polished';
import styled, { css } from 'styled-components';

/* INTERFACES */

interface ISidenavCommonStyledProps {
  expanded: boolean;
}

interface ISidenavItemStyledProps {
  selected: boolean;
}

/* CSS ONLY */

const sidenavExpandedItemLabel = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const sidenavCollapseItemLabel = css`
  display: none;
  position: fixed;
  left: 80px;
  background: ${({ theme }) => theme.primary.main};
  padding: 10px;
  border-radius: 5px;
`;

/* STYLED COMPONENTS */

export const SidenavControllers = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: calc(100% - 20px);
  margin: 10px 10px 0 10px;

  button {
    height: 30px;
    width: 50px;
    padding: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: none;
    background: ${({ theme }) => shade(0.2, theme.primary.main)};
    color: ${({ theme }) => theme.primary.contrastText};
    cursor: pointer;
    transition: background-color 250ms ease;

    :hover {
      background: ${({ theme }) => shade(0.5, theme.primary.main)};
    }
  }
`;

export const SidenavHeader = styled.div`
  margin: 10px;
  overflow: hidden;
  width: calc(100% - 20px);

  img {
    max-height: 50px;
  }
`;

export const SidenavContent = styled.div`
  overflow: hidden;
`;

export const SidenavItem = styled.button<ISidenavItemStyledProps>`
  background: ${({ theme, selected }) => (selected ? theme.secondary.main : 'none')};
  width: 100%;
  border: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 25px;
  overflow: hidden;
  color: ${({ theme }) => theme.primary.contrastText};

  :not(:disabled) {
    cursor: pointer;

    :hover {
      ${({ theme, selected }) => (selected ? css`
        background: ${shade(0.1, theme.secondary.main)};
      ` : css`
        background: ${lighten(0.05, theme.primary.main)};
      `)}
    }
  }

  :disabled {
    ${({ theme, selected }) => (selected ? css`
      background: ${shade(0.1, theme.secondary.main)};
    ` : css`
      background: ${shade(0.1, theme.primary.main)};
    `)}
  }

  .sidenav-item-icon {
    margin-right: 10px;
  }
`;

export const SidenavContainer = styled.nav<ISidenavCommonStyledProps>`
  height: 100%;
  width: ${({ expanded }) => (expanded ? 232 : 70)}px;
  background: ${({ theme }) => theme.primary.main};
  transition: width 250ms ease;

  .sidenav-item-label {
    ${({ expanded }) => (expanded ? sidenavExpandedItemLabel : sidenavCollapseItemLabel)}
  }

  ${({ expanded }) => !expanded && css`
    ${SidenavItem}:hover:not(:disabled) {
      .sidenav-item-label {
        display: block;
      }
    }
  `}
`;

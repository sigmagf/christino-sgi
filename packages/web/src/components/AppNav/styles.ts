import { lighten, shade } from 'polished';
import styled, { css } from 'styled-components';

/* INTERFACES */

interface IAppnavCommonStyledProps {
  expanded: boolean;
}

interface IAppnavItemStyledProps {
  selected: boolean;
}

/* CSS ONLY */

const appnavExpandedItemLabel = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  white-space: nowrap;
`;

const appnavCollapseItemLabel = css`
  z-index: 999;
  display: none;
  position: fixed;
  left: 80px;
  background: ${({ theme }) => theme.primary.main};
  padding: 10px;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.shadow};
`;

/* STYLED COMPONENTS */

export const AppnavControllers = styled.div`
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

export const AppnavHeader = styled.div`
  margin: 10px;
  overflow: hidden;
  width: calc(100% - 20px);

  img {
    max-height: 50px;
  }
`;

export const AppnavContent = styled.div`
  overflow: hidden;
`;

export const AppnavItem = styled.button<IAppnavItemStyledProps>`
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
  }
  :not(:disabled):hover {
    background: ${({ theme, selected }) => (selected ? shade(0.1, theme.secondary.main) : lighten(0.05, theme.primary.main))};
  }

  :disabled {
    background: ${({ theme, selected }) => (selected ? shade(0.1, theme.secondary.main) : shade(0.1, theme.primary.main))};
  }

  .appnav-item-icon {
    margin-right: 10px;
  }
`;

export const AppnavContainer = styled.nav<IAppnavCommonStyledProps>`
  height: 100%;
  width: ${({ expanded }) => (expanded ? 232 : 70)}px;
  background: ${({ theme }) => theme.primary.main};
  transition: width 250ms ease;

  .appnav-item-label {
    ${({ expanded }) => (expanded ? appnavExpandedItemLabel : appnavCollapseItemLabel)}
  }

  ${({ expanded }) => !expanded && css`
    ${AppnavItem}:hover:not(:disabled) {
      .appnav-item-label {
        display: block;
      }
    }
  `}
`;

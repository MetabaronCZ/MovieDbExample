import { FC } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquare,
  faCircle,
  faCircleDot,
} from '@fortawesome/free-regular-svg-icons';
import {
  IconDefinition,
  faPlus,
  faGear,
  faInfo,
  faHouse,
  faCheck,
  faXmark,
  faTrashCan,
  faSortUp,
  faSortDown,
  faInfoCircle,
  faSquareCheck,
  faCircleCheck,
  faCircleXmark,
  faExclamation,
  faPenToSquare,
  faArrowUpShortWide,
  faArrowDownWideShort,
  faCircleExclamation,
  faFilterCircleXmark,
  faAngleLeft,
  faAnglesLeft,
  faAngleRight,
  faAnglesRight,
  faAngleDown,
  faAngleUp,
  faCircleNotch,
  faMagnifyingGlass,
  faFilm,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import { ColorId, colors } from 'modules/colors';

const icons = {
  gear: faGear,
  plus: faPlus,
  home: faHouse,
  film: faFilm,
  user: faUser,
  trash: faTrashCan,
  edit: faPenToSquare,
  info: faInfo,
  infoCircle: faInfoCircle,
  exclamation: faExclamation,
  exclamationCircle: faCircleExclamation,
  search: faMagnifyingGlass,
  filterClear: faFilterCircleXmark,
  spinner: faCircleNotch,
  cross: faXmark,
  crossCircle: faCircleXmark,
  success: faCheck,
  successCircle: faCircleCheck,
  angleUp: faAngleUp,
  angleDown: faAngleDown,
  angleLeft: faAngleLeft,
  angleRight: faAngleRight,
  angleLeftDouble: faAnglesLeft,
  angleRightDouble: faAnglesRight,
  caretUp: faSortUp,
  caretDown: faSortDown,
  checkbox: faSquare,
  checkboxChecked: faSquareCheck,
  radio: faCircle,
  radioChecked: faCircleDot,
  sortAscending: faArrowUpShortWide,
  sortDescending: faArrowDownWideShort,
} satisfies Record<string, IconDefinition>;

const iconSize = {
  default: 'sm',
  large: 'lg',
  larger: 'xl',
} satisfies Record<string, SizeProp>;

export type IcoSize = keyof typeof iconSize;
export type IcoId = keyof typeof icons;

export const icoIds = Object.keys(icons) as IcoId[];
export const icoSizes = Object.keys(iconSize) as IcoSize[];

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

interface StyledProps {
  readonly $spin?: boolean;
}

const StyledIco = styled(FontAwesomeIcon)<StyledProps>`
  animation: ${({ $spin }) =>
    $spin
      ? css`
          ${spinAnimation} 2s linear infinite
        `
      : ''};
`;

interface Props {
  readonly className?: string;
  readonly ico: IcoId;
  readonly size?: IcoSize;
  readonly color?: ColorId;
  readonly title?: string;
  readonly spin?: boolean; // enable spin animation
}

export const Ico: FC<Props> = ({
  className,
  ico,
  size = 'default',
  color,
  title,
  spin = false,
}) => (
  <StyledIco
    className={className}
    title={title}
    icon={icons[ico]}
    size={iconSize[size]}
    color={color ? colors[color] : undefined}
    $spin={spin}
  />
);

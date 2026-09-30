import { type FC, type ForwardRefExoticComponent, type MouseEvent, type RefAttributes } from 'react';
import { Tooltip, UnstyledButton } from '@mantine/core';
import { type IconProps } from '@tabler/icons-react';
import classes from './MainLink.module.css';

export interface MainLinkProps {
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  label: string;
  isActive: boolean;
  onClick: (event: MouseEvent) => void;
}

export const MainLink: FC<MainLinkProps> = (props) => {
  const { label, isActive, onClick } = props;
  return (
    <Tooltip
      label={label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={label}
    >

      <UnstyledButton
        onClick={onClick}
        className={classes.mainLink}
        data-active={isActive}
        aria-label={label}
      >
        <props.icon size={22} stroke={1.5}/>
      </UnstyledButton>
    </Tooltip>
  );
};
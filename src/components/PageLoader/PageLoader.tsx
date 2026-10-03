import type { FC } from 'react';
import { Center, Loader } from '@mantine/core';
import classes from './PageLoader.module.css';

export const PageLoader: FC = () => (
  <Center className={classes.loader}>
    <Loader/>
  </Center>
);

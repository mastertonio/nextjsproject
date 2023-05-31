import { useState } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
} from '@mantine/core';
import { useStyles } from '@styles/tableStyle';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons';

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
  style?: string
}

const Th: React.FC<ThProps> = ({ children, reversed, sorted, onSort, style }) => {
  const { classes } = useStyles();
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <th className={style} scope='col'>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart" className="items-center whitespace-nowrap">
          <Text weight={700} size="xs" className="inline-block">
            {children}
          </Text>
          <Center className={`${classes.icon} absolute right-0`}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}


export default Th
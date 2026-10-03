import type { FC } from 'react';
import { ActionIcon, Avatar, Group, Progress, Stack, Text } from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons-react';
import classes from './ChatHeader.module.css';
import { getContactInfo } from '../../api/api.ts';
import { QueryKeys } from '../../api/query-keys.ts';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { formatTime } from '../../shared/lib/format-time.ts';

export const ChatHeader: FC = () => {
  const params = useParams();

  const contactInfo = useQuery({
    queryKey: [QueryKeys.currentContactInfo, { chatId: params.chatId }],
    queryFn: getContactInfo,
    enabled: !!params.chatId,
  });
  const { isPending, isLoading, isError, data } = contactInfo;

  return (
    <div className={classes.header}>
      <Group gap="sm">
        <Avatar src={data?.avatar} radius="xl"/>

        <Stack gap={0}>
          <Text fw={500}>{data?.contactName}</Text>
          {!!data?.lastSeen &&
            <Text size="xs" c="dimmed">был(а) в сети {formatTime(data?.lastSeen)}</Text>
          }
        </Stack>

        {isLoading && <Progress value={100} animated size="xs"/>}
      </Group>

      <ActionIcon variant="subtle" size="lg" aria-label="Меню чата" disabled={isPending || isError}>
        <IconDotsVertical size={20} stroke={1.5}/>
      </ActionIcon>
    </div>
  );
};

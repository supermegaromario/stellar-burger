import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import {
  selectOrdersFeeds,
  selectTotalFeeds,
  selectTotalTodayFeeds
} from '../../services/slices/feedSlice';
import { useAppSelector } from '../../services/hooks';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useAppSelector(selectOrdersFeeds);
  const total = useAppSelector(selectTotalFeeds);
  const totalToday = useAppSelector(selectTotalTodayFeeds);
  const feed = { total: total, totalToday: totalToday };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};

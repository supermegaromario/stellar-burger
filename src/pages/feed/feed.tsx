import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  getAllFeeds,
  selectOrdersFeeds
} from '../../services/slices/feedSlice';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useAppSelector(selectOrdersFeeds);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllFeeds());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(getAllFeeds())} />
  );
};

import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { AppDispatch } from '../../services/store';
import {
  getAllFeeds,
  selectOrdersFeeds
} from '../../services/slices/feedSlice';
import { useDispatch, useSelector } from 'react-redux';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectOrdersFeeds);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllFeeds());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(getAllFeeds())} />
  );
};

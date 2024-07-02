import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { useParams } from 'react-router-dom';
import {
  getOrderById,
  selectOrderModalData
} from '../../services/slices/orderSlice';
import { selectIngredients } from '../../services/slices/ingredientSlice';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const orderId = Number(id);
  const orderData = useAppSelector(selectOrderModalData);
  const ingredients: TIngredient[] = useAppSelector(selectIngredients);

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [dispatch, orderId]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {} as TIngredientsWithCount
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};

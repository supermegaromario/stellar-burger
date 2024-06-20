import React, { FC, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../services/hooks';
import styles from './burger-ingredient.module.css';
import {
  Counter,
  CurrencyIcon,
  AddButton
} from '@zlden/react-developer-burger-ui-components';
import { TBurgerIngredientUIProps } from './type';
import { RootState } from '../../../services/store';
import { selectIngredientCount } from '../../../services/slices/constructorSlice';

export const BurgerIngredientUI: FC<TBurgerIngredientUIProps> = memo(
  ({ ingredient, handleAdd }) => {
    const { image, price, name, _id } = ingredient;
    const location = useLocation();

    const count = useAppSelector((state: RootState) =>
      selectIngredientCount(state, _id)
    );

    const handleAddClick = () => {
      handleAdd();
    };

    return (
      <li className={styles.container}>
        <Link
          className={styles.article}
          to={`/ingredients/${_id}`}
          state={{ backgroundLocation: location }}
        >
          {count > 0 && <Counter count={count} />}
          <img className={styles.img} src={image} alt='картинка ингредиента.' />
          <div className={`${styles.cost} mt-2 mb-2`}>
            <p className='text text_type_digits-default mr-2'>{price}</p>
            <CurrencyIcon type='primary' />
          </div>
          <p className={`text text_type_main-default ${styles.text}`}>{name}</p>
        </Link>
        <AddButton
          text='Добавить'
          onClick={handleAddClick}
          extraClass={`${styles.addButton} mt-8`}
        />
      </li>
    );
  }
);

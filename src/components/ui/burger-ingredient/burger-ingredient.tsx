import React, { FC, memo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './burger-ingredient.module.css';

import {
  Counter,
  CurrencyIcon,
  AddButton
} from '@zlden/react-developer-burger-ui-components';

import { TBurgerIngredientUIProps } from './type';

export const BurgerIngredientUI: FC<TBurgerIngredientUIProps> = memo(
  ({ ingredient, count, handleAdd }) => {
    const { image, price, name, _id } = ingredient;
    const location = useLocation();
    const [addCount, setAddCount] = useState<number>(0);

    const handleAddClick = () => {
      handleAdd();
      setAddCount(addCount + 1);
    };

    return (
      <li className={styles.container}>
        <Link
          className={styles.article}
          to={`/ingredients/${_id}`}
          state={{ backgroundLocation: location }}
        >
          {addCount > 0 && <Counter count={addCount} />} {}
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

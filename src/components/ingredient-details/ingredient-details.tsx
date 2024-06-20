import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks';
import { selectIngredients } from '../../services/slices/ingredientSlice';
export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { id } = useParams();
  const ingredients = useAppSelector(selectIngredients);
  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};

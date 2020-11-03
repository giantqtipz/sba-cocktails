import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  updateCocktail,
  deleteCocktail,
} from '../../../store/cocktails/actions';
import { CocktailAttributes } from '../../../store/cocktails/interface';
import Steps from './Steps';
import Ingredients from './Ingredients';
import './cocktailForm.scss';

const EditCocktail: React.FC<{ data: CocktailAttributes }> = (props) => {
  const {
    data: { id, name, description, image, steps, ingredients },
  } = props;
  const [fields, setFields] = useState<CocktailAttributes>({
    name,
    description,
    image,
    steps,
    ingredients,
  });
  const dispatch = useDispatch();
  const fieldsInputHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    });
  };
  const editCocktail = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(updateCocktail(id, fields));
  };
  const removeCocktail = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(deleteCocktail(id || ''));
  };
  return (
    <form className="cocktail-form" onSubmit={editCocktail}>
      <label htmlFor="image">
        <span>Image</span>
        <input
          type="text"
          name="image"
          onChange={fieldsInputHandler}
          value={fields.image}
          required
        />
      </label>
      <label htmlFor="name">
        <span>Name</span>
        <input
          type="text"
          name="name"
          onChange={fieldsInputHandler}
          value={fields.name}
          required
        />
      </label>
      <label htmlFor="description">
        <span>Description</span>
        <textarea
          name="description"
          onChange={fieldsInputHandler}
          value={fields.description}
          required
        />
      </label>
      <Ingredients
        setFields={setFields}
        fields={fields}
        data={{ ingredients, steps }}
      />
      <Steps
        setFields={setFields}
        fields={fields}
        data={{ ingredients, steps }}
      />
      <button type="submit">Update</button>
      <button type="button" onClick={removeCocktail}>
        DELETE
      </button>
    </form>
  );
};

export default EditCocktail;

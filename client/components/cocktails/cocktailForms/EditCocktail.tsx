import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateCocktail,
  deleteCocktail,
} from '../../../store/cocktails/actions';
import { CocktailAttributes } from '../../../store/cocktails/interface';
import { StoreState } from '../../../store/store';
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
  const {
    authentication: { signedIn, key },
  } = useSelector((state: StoreState) => state);
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
    return signedIn && key
      ? dispatch(updateCocktail(id, fields, key))
      : alert('Not Signed In');
  };
  const removeCocktail = (event: React.FormEvent) => {
    event.preventDefault();
    return signedIn && key
      ? dispatch(deleteCocktail(id || '', key))
      : alert('Not Signed In');
  };
  return (
    <form className="cocktail-form" onSubmit={editCocktail}>
      <button
        type="button"
        className="delete-cocktail"
        onClick={removeCocktail}
      >
        <i className="fas fa-trash-alt" />
      </button>
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
    </form>
  );
};

export default EditCocktail;

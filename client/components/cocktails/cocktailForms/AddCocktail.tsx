import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCocktail } from '../../../store/cocktails/actions';
import { CocktailAttributes } from '../../../store/cocktails/interface';
import { StoreState } from '../../../store/store';
import Steps from './Steps';
import Ingredients from './Ingredients';
import './cocktailForm.scss';

const AddCocktail: React.FC = () => {
  const [fields, setFields] = useState<CocktailAttributes>({
    name: '',
    description: '',
    image: '',
    steps: [{ id: '', step: '', order: 0 }],
    ingredients: [{ id: '', ingredient: '', order: 0 }],
  });

  const {
    authentication: { signedIn, key },
  } = useSelector((state: StoreState) => state);

  const dispatch = useDispatch();
  const fieldsInputHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target.name === 'step' || event.target.name === 'ingredient') {
      setFields({
        ...fields,
        [event.target.name]: { [event.target.name]: event.target.value },
      });
    } else {
      setFields({
        ...fields,
        [event.target.name]: event.target.value,
      });
    }
  };

  const submitCocktail = (event: React.FormEvent) => {
    event.preventDefault();
    return signedIn
      ? dispatch(createCocktail(fields, key))
      : alert('Not Signed In');
  };
  return (
    <form className="cocktail-form" onSubmit={submitCocktail}>
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
      <Ingredients setFields={setFields} fields={fields} />
      <Steps setFields={setFields} fields={fields} />
      <button type="submit">Create Cocktail</button>
    </form>
  );
};

export default AddCocktail;

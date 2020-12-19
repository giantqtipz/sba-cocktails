import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
import './search.scss';

interface Props {
  props: {
    history?: RouteComponentProps;
    location: {
      search: string;
    };
  };
}

const Search: React.FC<Props> = ({ props }) => {
  const {
    location: { search },
  } = props;
  const [searchType, setSearchType] = useState('cocktails');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState('');
  const [searchIngredients, setSearchIngredients] = useState(['']);

  const {
    cocktails: { count },
  } = useSelector((state: StoreState) => state.cocktails);

  const searchParams = search && new URLSearchParams(search);
  const searchTypeDefault = search && (searchParams as any).get('searchType');
  const searchTermDefault = search && (searchParams as any).get('searchTerm');
  const searchIngredientsDefault =
    search && (searchParams as any).get('searchIngredients');
  const updateSearchState = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const { history } = props;
    setSearchType(event.target.value);
    setSearchTerm('');
    setSearchIngredients([]);
    (history as any).push({
      pathname: `/`,
    });
  };

  const updateSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const deleteIngredient = (ingredient: string) => {
    setSearchIngredients(
      searchIngredients.filter(
        (searchedIngredient) => searchedIngredient !== ingredient
      )
    );
  };

  const submitSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    const { history } = props;
    if (searchType === 'cocktails') {
      setSearchIngredients([]);
      (history as any).push({
        pathname: `/`,
        search: `?searchType=${searchType || 'cocktails'}${
          searchTerm && `&searchTerm=${searchTerm}`
        }&page=1`,
      });
    } else {
      setSearchIngredients([...searchIngredients, searchTerm]);
      setSearchTerm('');
    }
  };

  useEffect(() => {
    if (searchIngredientsDefault) {
      setSearchIngredients(
        (searchIngredientsDefault && searchIngredientsDefault.split(',')) || ''
      );
    }
  }, []);

  useEffect(() => {
    setSearchType(searchTypeDefault || 'cocktails');
    setSearchTerm(searchTermDefault);
    // if (searchTerm === '' && count > 0) {
    //   setSearchResults(`Showing all ${count} cocktails!`);
    // } else if (searchTerm !== '' && count > 0) {
    //   setSearchResults(`Found ${count} cocktails!`);
    // } else {
    //   setSearchResults(`No cocktails match your query`);
    // }
    if (!count) {
      if (searchTerm !== '') {
        setSearchResults(`No cocktails match your query`);
      } else {
        setSearchResults('Loading Cocktails');
      }
    } else if (count > 0) {
      if (searchTerm !== '') {
        setSearchResults(`Found ${count} cocktails!`);
      } else {
        setSearchResults(`Showing all ${count} cocktails!`);
      }
    }
  }, [count]);

  useEffect(() => {
    const { history } = props;
    const ingredients =
      searchIngredients.length >= 0
        ? searchIngredients.join(',')
        : [...searchIngredients, searchTerm];
    if (searchType === 'ingredients') {
      (history as any).push({
        pathname: `/`,
        search: `?searchType=${searchType}${
          searchIngredients &&
          ingredients &&
          `&searchIngredients=${ingredients}`
        }&page=1`,
      });
    }
  }, [searchIngredients]);
  return (
    <div className="search-container">
      <div className="search-bar-container">
        <div className="search">
          <select onChange={updateSearchState} value={searchType}>
            <option value="cocktails">Cocktails</option>
            {/* <option value="ingredients">Ingredients</option> */}
          </select>
          <form onSubmit={submitSearch}>
            <input
              type="text"
              placeholder={
                searchType === 'cocktails'
                  ? 'Enter a name or keyword'
                  : 'Enter an ingredient'
              }
              value={searchTerm || ''}
              onChange={updateSearchTerm}
            />
          </form>
        </div>
        <div className="show-all">
          <Link to="/">Show all</Link>
        </div>
        {searchType === 'ingredients' && (
          <ul className="ingredients">
            {searchIngredients &&
              // eslint-disable-next-line prettier/prettier
              (searchIngredients[0] !== '') &&
              searchIngredients.map((ingredient) => {
                return (
                  <li className="ingredient">
                    <p>{ingredient}</p>
                    <button
                      type="button"
                      onClick={() => deleteIngredient(ingredient)}
                    >
                      <i className="fas fa-times" />
                    </button>
                  </li>
                );
              })}
          </ul>
        )}
      </div>
      <p className={!count && searchTerm === '' ? 'loading' : ''}>
        {searchResults}
      </p>
    </div>
  );
};

export default Search;

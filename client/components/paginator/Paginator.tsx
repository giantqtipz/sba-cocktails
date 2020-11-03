import React from 'react';
import { Link } from 'react-router-dom';
import './paginator.scss';

interface Props {
  count: number;
  limit: number;
  search: string;
}

const Paginator: React.FC<Props> = (props) => {
  const { count, limit, search } = props;
  const searchParams = search && new URLSearchParams(search);
  const searchType = search && (searchParams as any).get('searchType');
  const searchTerm = search && (searchParams as any).get('searchTerm');
  const searchIngredients =
    search && (searchParams as any).get('searchIngredients');
  const page = search && (searchParams as any).get('page');
  const pageNum = page && page ? +page.replace('?page=', '') * 1 : 1;
  const pageLimit = Math.ceil(count / limit);
  const urlParser = (type: string) => {
    const checkSearchType = () => {
      return `${
        searchType === '' || searchType === null
          ? '?'
          : searchType && `?searchType=${searchType}&`
      }`;
    };
    const checkSearchTerm = () => {
      if (searchTerm) {
        return `${
          searchTerm === '' || searchTerm === null
            ? ''
            : searchTerm && `searchTerm=${searchTerm}&`
        }`;
      }
      return `${
        searchIngredients === '' || searchIngredients === null
          ? ''
          : searchIngredients && `searchIngredients=${searchIngredients}&`
      }`;
    };
    if (type === 'previous') {
      return `${checkSearchType()}${checkSearchTerm()}page=${
        pageNum === 1 ? pageNum : pageNum - 1
      }`;
    }
    return `${checkSearchType()}${checkSearchTerm()}page=${
      pageNum === pageLimit ? pageNum : pageNum + 1
    }`;
  };
  return (
    <nav className="pagination-container" aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <Link className="page-link" to={`${urlParser('previous')}`}>
            <i className="fas fa-arrow-left" />
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" to={urlParser('next')}>
            <i className="fas fa-arrow-right" />
          </Link>
        </li>
      </ul>
      <div className="page-text">
        <p>{`${page ? pageNum : 1} of ${pageLimit}`}</p>
      </div>
    </nav>
  );
};

export default Paginator;

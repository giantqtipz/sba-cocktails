import React from 'react';
import Cocktails from '../cocktails/cocktails/Cocktails';
import Search from '../search/Search';
import './main.scss';

interface Props {
  location: {
    search: string;
  };
}

const Main: React.FC<Props> = (props) => {
  return (
    <>
      <div className="snowflakes" aria-hidden="true">
        <div className="snowflake">❅</div>
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❄</div>
      </div>
      <Search props={props} />
      <Cocktails props={props} />
    </>
  );
};

export default Main;

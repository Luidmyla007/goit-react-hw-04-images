import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { AiOutlineSearch } from 'react-icons/ai';
import {SearchHeader, SearchForm, SearchFormInput, SearchButton,} from './Searchbar.styled';


export function Searchbar({ onSubmit })  {
  const [query, setQuery] = useState('');

  const handleChange = e => { 
     setQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
     if (query.trim() === '') {
      toast.warn('Please specify your query!');
      return;
    }
    onSubmit(query);
    reset();
  };

  const reset = () => {
    setQuery('');
  }

  
    return (
        <SearchHeader>
        <SearchForm onSubmit={handleSubmit}>
          <SearchButton type="submit" >
            <span >
              <AiOutlineSearch width="12" height="12"/>              
            </span>
          </SearchButton>

          < SearchFormInput            
            type="text"
            name="query"
            value={query}
            onChange={handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"  
            size={40}
          />
        </SearchForm>
      </SearchHeader>
    );
  
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired, 
};
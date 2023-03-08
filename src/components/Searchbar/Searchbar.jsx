import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { AiOutlineSearch } from 'react-icons/ai';
import {
  SearchHeader,
  SearchForm,
  SearchFormInput,
  SearchButton,
} from './Searchbar.styled';


export class Searchbar extends Component {
  state = {
    query: '', 
  };

  handleChange = e => {
 
     this.setState({ query: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
     if (this.state.query.trim() === '') {
      toast.warn('Please specify your query!');
      return;
    }
    this.props.onSubmit(this.state.query);
    this.reset();
  };

  reset() {
    this.setState({ query: '' });
  }

  render() {
    return (
        <SearchHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit" >
            <span >
              <AiOutlineSearch width="12" height="12"/>              
            </span>
          </SearchButton>

          < SearchFormInput            
            type="text"
            name="query"
            value={this.state.query}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"  
            size={40}
          />
        </SearchForm>
      </SearchHeader>
    );
  }
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired, 
};
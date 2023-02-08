import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { BsQuestionLg } from 'react-icons/bs';
import {
  StyledSearchbar,
  StyledForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const heandlerChange = ({ target }) => {
    const { value } = target;
    setSearch(value);
  };

  const heandlerSubmit = e => {
    e.preventDefault();
    onSubmit({ search });
    resetForm();
  };

  const resetForm = () => {
    setSearch('');
  };

  return (
    <StyledSearchbar>
      <StyledForm onSubmit={heandlerSubmit}>
        <SearchFormBtn type="submit">
          <BsQuestionLg
            style={{
              color: '#757575',
              display: 'inline-block',
              width: '100%',
            }}
          />
        </SearchFormBtn>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
          value={search}
          onChange={heandlerChange}
        />
      </StyledForm>
    </StyledSearchbar>
  );
};

export default memo(Searchbar);

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';

import "./SearchForm.scss"
import { useState } from 'react';

SearchForm.propTypes = {
    onSearchSubmit: PropTypes.func,
};

SearchForm.defaultProps = {
    onSearchSubmit: null,
}

function SearchForm(props) {
    const {onSearchSubmit} = props;
    
    const [searchInput, setSearchInput] = useState('');

    function changeSearchInput(e) {
        setSearchInput(e.target.value);
    };

    function handleSearchSubmit(e) {
        
        e.preventDefault();
        
        if(onSearchSubmit) {
            const formValue = {
                value: searchInput,
            }
            onSearchSubmit(formValue);
            setSearchInput('');
        }
    }

    return (
        <form onSubmit={handleSearchSubmit}>
            <input 
            type="text" 
            value={searchInput}
            onChange={changeSearchInput}
            />
        </form>
    );
}

export default SearchForm;
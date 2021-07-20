import React, { useState } from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};

TodoForm.defaultProps = {
    onSubmit: null,
}

function TodoForm(props) {
    const { onSubmit } = props;

    const [inputValue, setInputValue] = useState('');

    function handleChangeInputValue(e) {
        setInputValue(e.target.value);
    }

    function handleSubmit(e) {
        //prevent reloading browser
        e.preventDefault();
        
        if(onSubmit) {
            const formValue = {
                title: inputValue,
            }
            onSubmit(formValue);
            setInputValue('');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={inputValue} onChange={handleChangeInputValue} />
        </form>
    );
}

export default TodoForm;
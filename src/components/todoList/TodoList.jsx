import React from 'react';
import PropTypes from 'prop-types';

TodoList.propTypes = {
    list: PropTypes.array,
    deleteItemClick: PropTypes.func,
};

TodoList.defaultProps = {
    list: [],
    deleteItemClick: null,
}

function TodoList(props) {
    const {list, deleteItemClick} = props;

    function handleDeleteItemClick(item) {
        if(!deleteItemClick) return;
        deleteItemClick(item)
    }

    return (
        <ul>
            {
                list.map(item => {
                    return (
                        <li key={item.id} onClick={() => handleDeleteItemClick(item)}>{item.title}</li>
                    )
                })

            }
        </ul>

    );
}

export default TodoList;
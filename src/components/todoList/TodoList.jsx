import React from 'react';
import PropTypes from 'prop-types';
import { HighlightOff } from "@material-ui/icons"

import "./TodoList.scss"

TodoList.propTypes = {
    list: PropTypes.array,
    deleteItemClick: PropTypes.func,
};

TodoList.defaultProps = {
    list: [],
    deleteItemClick: null,
}

function TodoList(props) {
    const { list, deleteItemClick } = props;

    function handleDeleteItemClick(item) {
        if (!deleteItemClick) return;
        deleteItemClick(item)
    }

    return (
        <ul className="ul-style">
            {
                list.map(item => {
                    return (
                        <li
                            key={item.id}
                            onClick={() => handleDeleteItemClick(item)}
                            className="list-item"
                        >
                            {item.title}

                            <HighlightOff className="iconDelete" />
                        </li>
                    )
                })

            }
        </ul>

    );
}

export default TodoList;
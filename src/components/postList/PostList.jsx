import React from 'react';
import PropTypes from 'prop-types';
import "./PostList.scss"
import "../todoList/TodoList.scss"

PostList.propTypes = {
    postList: PropTypes.array,
};

PostList.defaultProps = {
    postList: [],
}

function PostList(props) {
    const { postList } = props;
    return (
        <ul className="ul-style">
        {
            postList.map(item => {
                return (
                    <li
                        key={item.id}
                        className="list-item"
                    >
                        {item.title}
                    </li>
                )
            })

        }
    </ul>
    );
}

export default PostList;
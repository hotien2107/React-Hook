import React, { useState } from 'react';
import "./ColorBox.scss";


function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function ColorBox() {

    const [color, setColor] = useState(() => {
        return localStorage.getItem('box-color') || 'Pink';
    });

    function handleBoxColorClick() {
        //random color
        const newColor = getRandomColor();
        //setColor = randomColor
        setColor(newColor);
        //save value color before loading
        localStorage.setItem('box-color', newColor);
    }

    return (
        <div
            div className="ColorBox"
            onClick={handleBoxColorClick}
            style={{ backgroundColor: color }}
        >
        </div>
    );
}

export default ColorBox;
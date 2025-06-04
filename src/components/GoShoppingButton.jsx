import React from 'react';
import './GoShoppingButton.scss';

const GoShoppingButton = ({
                              onClick,
                              children = 'Go Shopping',
                              bgColor,      // new prop
                              fontColor,    // new prop
                              ...restProps  // in case you want to pass other <button> attributes
                          }) => {
    // Build a style object that sets CSS variables
    const cssVars = {};
    if (bgColor) cssVars['--bg-color'] = bgColor;
    if (fontColor) cssVars['--font-color'] = fontColor;

    return (
        <button
            className="go-shopping-button"
            onClick={onClick}
            style={cssVars}
            {...restProps}
        >
            {children}
        </button>
    );
};

export default GoShoppingButton;

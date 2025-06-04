import React from 'react';
import './BlueCircle.scss';

const BlueCircle = ({diameter = 600}) => {
    // “diameter” is in pixels. You can pass any number, e.g. <BlueCircleSection diameter={800} />.
    // By default, it will be 600px tall/wide.
    return (
        <div
            className="blue-circle-wrapper"
            style={{height: `${diameter}px`}}
        >
            <div
                className="blue-circle-bg"
                style={{width: `${diameter}px`, height: `${diameter}px`}}
            />
        </div>
    );
};

export default BlueCircle;

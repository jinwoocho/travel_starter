import React from 'react';

let style = {
    'backgroundImage' : 'url(https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg)',
}

const MaskImg = (props) => {
    return (
        <div className="jumbotron city-jumbo"  style={style}>
            <div className="jumbo-content">
                <h1 className="display-4 text-center">{props.header}</h1>
                <p className="lead">{props.lead}</p>
            </div>
            
        </div>
    )
}

export default MaskImg;
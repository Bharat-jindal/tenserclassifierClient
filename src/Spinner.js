import React from 'react';
import './Spinner.css';
import { exp } from '@tensorflow/tfjs';

const Spinner = () => {
    return <div className="spinner-cont">
        <div className="loader">Loading...</div>
    </div>
}

export default Spinner
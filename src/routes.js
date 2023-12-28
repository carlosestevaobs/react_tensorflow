import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Default from './Pages/Default';
import ExampleKNN from './Pages/trains/ExampleKNN';
import ExampleTensorFlow from './Pages/trains/ExampleTensorFlow';
import PredictTensorflow from './Pages/classifications/PredictTensorflow';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Default />}>
                    <Route index element={<ExampleKNN />}></Route>
                        <Route path="predicttensorflow" element={<PredictTensorflow />}/> 
                        <Route path="traintensorflow" element={<ExampleTensorFlow />}/>
                        <Route path="trainknn" element={<ExampleKNN />}/>
                    </Route>
            </Routes>
        </BrowserRouter>);
}
export default AppRoutes
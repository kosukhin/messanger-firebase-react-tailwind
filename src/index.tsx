import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {OperationsConfig} from "./lib/operation/Operation";
import {Request} from "./models/Request";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

OperationsConfig.Request = async (model: Request) => {
    const response = await fetch(model.url, {
        method: model.method,
        headers: model.headers
    })
    return await response.json();
}

root.render(
    <App/>
);

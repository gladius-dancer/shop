import * as React from "react";
import App from "./App";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {setupStore} from "./shop/store/store";

const store = setupStore();

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);

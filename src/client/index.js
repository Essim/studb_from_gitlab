import React from "react";
import { BrowserRouter } from "react-router-dom";
import { hydrate as render } from "react-dom";
import App from "./app";
import { Provider } from "react-redux";
import store from "./store";
import registerServiceWorker from "./registerServiceWorker";

render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("app")
);

registerServiceWorker();

if (module.hot) {
    module.hot.accept();
}

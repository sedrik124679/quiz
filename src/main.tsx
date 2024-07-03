import React from "react";
import ReactDOM from "react-dom/client";
import i18n from "./i18n.tsx";
import { I18nextProvider } from "react-i18next";

import App from "./App.tsx";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <I18nextProvider i18n={i18n}>
        <React.Suspense fallback={<div>Loading...</div>}>
            <App />
        </React.Suspense>
    </I18nextProvider>,
)

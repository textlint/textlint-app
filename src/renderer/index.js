// MIT © 2017 azu
"use strict";
// deps
require("office-ui-fabric-react/dist/css/fabric.css");
import i18next from 'i18next';
const remote = require("electron").remote;
const LanguageDetector = remote.require('i18next-electron-language-detector');

import React from "react";
import ReactDOM from "react-dom";
// use-case
import InitializeUseCase from "./use-case/InitializeUseCase";
// Component
import App from "./components/App";
// Store
import AppStore from "./store/AppStore";

const AlminLogger = require("almin-logger");
const locator = require("textlint-app-locator");
const {Dispatcher, Context} = require("almin");
locator.context = new Context({
    store: AppStore.create(),
    dispatcher: new Dispatcher()
});
const logger = new AlminLogger();
logger.startLogging(locator.context);

i18next.use(LanguageDetector).init({
    // disable
    keySeparator: "",
    nsSeparator: "",
    contextSeparator: "",
    pluralSeparator: "",
    resources: {
        ja: {
            translation: require("../../locales/ja/translation.json")
        }
    }
}, (err, t) => {
    if (err) {
        console.error(err);
        throw new err;
    }
    locator.context.useCase(InitializeUseCase.create()).execute().then(() => {
        // entry point
        ReactDOM.render(<App />, document.getElementById("js-app"));
    });

});

// MIT © 2017 azu
"use strict";
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
locator.context.useCase(InitializeUseCase.create()).execute().then(() => {
    // entry point
    ReactDOM.render(<App />, document.getElementById("js-app"));
});

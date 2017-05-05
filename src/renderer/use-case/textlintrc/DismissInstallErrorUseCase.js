// MIT © 2017 azu
"use strict";
export const DismissInstallErrorType = Symbol("DismissInstallErrorUseCase");
export const DismissInstallErrorUseCase = ({ dispatcher }) => {
    return () => {
        dispatcher.dispatch({
            type: DismissInstallErrorType
        });
    };
};

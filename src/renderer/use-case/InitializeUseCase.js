// MIT © 2017 azu
"use strict";
import {UseCase} from "almin";
// domain
import TextlintApp from "../domain/TextlintApp";
// repository
import textlintAppRepository from "../infra/repository/TextlintAppRepository";
export default class InitializeUseCase extends UseCase {
    static create() {
        return new InitializeUseCase({
            textlintAppRepository
        });
    }

    /**
     * @param {TextlintAppRepository} textlintAppRepository
     */
    constructor({textlintAppRepository}) {
        super();
        this.textlintAppRepository = textlintAppRepository;
    }

    execute() {
        const newApp = new TextlintApp();
        this.textlintAppRepository.save(newApp);
    }
}
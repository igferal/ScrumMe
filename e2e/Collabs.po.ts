import { Utils } from './utils';
import { browser, element, by } from 'protractor';

export class CollabsPage {

    navigateTo() {
        return browser.get('/collabs');
    }

    getHeader(header: string) {

        return element(by.name(header)).getText();

    }

    getCardHeaderText() {
        return element(by.id("collabsprint1")).getText();
    }

    getCardHeaderTextPresent() {

        return element(by.id("collabsprint1")).isPresent();

    }

    declineCollab() {

        Utils.clickButton("declinesprint1")

    }

     acceptCollab() {

        Utils.clickButton("acceptsprint1")

    }

}
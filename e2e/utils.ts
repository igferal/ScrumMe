import { browser, element, by } from 'protractor';

export class Utils {



    public static fillInput(inputName: string, content: string) {

        let input;
        input = element(by.name(inputName)).click();
        input.sendKeys(content);
    }

    public static clickButton(name: string) {

        element(by.name(name)).click();
        browser.driver.sleep(100);

    }


}
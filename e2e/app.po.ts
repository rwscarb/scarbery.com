import { browser, by, element } from 'protractor';

export class AppPage {
  navigateToNewGame() {
    return browser.get('/projects/bowling/new');
  }

  getHeadingText() {
    return element(by.css('app-root h1')).getText();
  }

  getPlayers() {
    return element.all(by.css('.list-item-player'));
  }
}

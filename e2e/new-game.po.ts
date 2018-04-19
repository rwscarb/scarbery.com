import { browser, by, element } from 'protractor';


export class NewGamePage {
  navigateToNewGame() {
    return browser.get('#/projects/bowling/new');
  }

  getHeadingText() {
    return element(by.css('app-root h1')).getText();
  }

  getPlayers() {
    return element.all(by.css('.list-item-player'));
  }

  get newPlayerText() {
    return element(by.id('add-player'));
  }

  get newPlayerSubmit() {
    return element(by.id('btn-add-player'));
  }

  get newGameSubmit() {
    return element(by.id('btn-new-game'));
  }
}

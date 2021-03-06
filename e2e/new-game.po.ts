import { browser, by, element } from 'protractor';
import { BowlingCommon } from './bowling-common';


export class NewGamePage extends BowlingCommon {
  navigateToNewGame() {
    return browser.get('#/projects/bowling/new');
  }

  getHeadingText() {
    return element(by.css('app-root h1')).getText();
  }

  getPlayers() {
    return element.all(by.css('.btn-player'));
  }

  getActivePlayers() {
    return element.all(by.css('.btn-player.active'));
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

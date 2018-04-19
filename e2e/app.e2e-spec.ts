import { NewGamePage } from './new-game.po';


describe('new game page', () => {
  let page: NewGamePage;
  let players = ['Ryan', 'Janelle'];

  beforeEach(() => {
    page = new NewGamePage();
    page.clearDB();
    page.navigateToNewGame();
  });

  function addPlayer(name: string) {
    page.newPlayerText.sendKeys(name);
    page.newPlayerSubmit.click();
  }

  function createMockPlayers() {
    players.forEach((name) => addPlayer(name));
  }

  it('should allow players to be added', () => {
    expect(page.getHeadingText()).toEqual('Choose players');
    expect(page.newGameSubmit.isEnabled()).toBe(false);
    expect(page.getPlayers().count()).toEqual(0);
    expect(page.getActivePlayers().count()).toEqual(0);
    createMockPlayers();
    expect(page.getPlayers().count()).toEqual(2);
    expect(page.getActivePlayers().count()).toEqual(2);
    expect(page.newGameSubmit.isEnabled()).toBe(true);
  });

});

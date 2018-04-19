import { NewGamePage } from './new-game.po';


describe('new game page', () => {
  let page: NewGamePage;
  let players = ['Ryan', 'Janelle'];

  beforeEach(() => {
    page = new NewGamePage();
    page.navigateToNewGame();
  });

  function addPlayer(name: string) {
    page.newPlayerText.sendKeys(name);
    page.newPlayerSubmit.click();
  }

  it('should allow players to be added', () => {
    expect(page.getHeadingText()).toEqual('Choose players');
    expect(page.getPlayers().count()).toEqual(0);
    players.forEach((name) => addPlayer(name));
    expect(page.getPlayers().count()).toEqual(2);
  });
});

import { AppPage } from './app.po';

describe('ng-sandbox App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateToNewGame();
    expect(page.getHeadingText()).toEqual('Choose players');
    expect(page.getPlayers().count()).toEqual(3);
  });
});

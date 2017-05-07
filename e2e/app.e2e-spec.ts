import { LandingPage } from './Landing.po';

describe('Landing Page tests', function() {
  let page: LandingPage;

  beforeEach(() => {
    
    page = new LandingPage();
  });

  it('Debe aparecer un mensaje que diga Scrumme', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ScrumMe');
  });
});

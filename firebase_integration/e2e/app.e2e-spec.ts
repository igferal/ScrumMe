import { FirebaseIntegrationPage } from './app.po';

describe('firebase-integration App', function() {
  let page: FirebaseIntegrationPage;

  beforeEach(() => {
    page = new FirebaseIntegrationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

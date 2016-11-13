import { FirebasePostItPage } from './app.po';

describe('firebase-post-it App', function() {
  let page: FirebasePostItPage;

  beforeEach(() => {
    page = new FirebasePostItPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

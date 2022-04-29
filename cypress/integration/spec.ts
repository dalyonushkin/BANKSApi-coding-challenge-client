/**
 * Default viewports lists
 * 'macbook-16' | 'macbook-15' | 'macbook-13' | 'macbook-11' | 'ipad-2' | 'ipad-mini' | 'iphone-xr' | 'iphone-x' | 'iphone-6+' |
 * 'iphone-se2' | 'iphone-8' | 'iphone-7' | 'iphone-6' | 'iphone-5' | 'iphone-4' | 'iphone-3' | 'samsung-s10' | 'samsung-note9'
 */
describe('Transfers List App', () => {
  beforeEach(() => {
    cy.viewport('iphone-6+');
  });
  describe('Transfers List Page', () => {
    it('Visit Transfers List Page', () => {
      cy.visit('/');
      cy.contains('Transfers List');
    });
    it('should show "Nothing found" when nothing found', () => {
      cy.searchTransferListSearchbar('1232');
      cy.contains('Nothing found!',{timeout:1000});

    });
  });
});


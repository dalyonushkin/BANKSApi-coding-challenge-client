export {};
declare global {
    namespace Cypress {
        interface Chainable {
            searchTransferListSearchbar: (text: string) => Chainable<JQuery<HTMLElement>>;
            openTransferListSearchbar: () => void;
        }
    }
}

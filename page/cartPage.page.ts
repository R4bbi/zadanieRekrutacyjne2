import { Page } from "playwright";

export default class CartPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private async productNameInCart(productName: string) {
        const productNameElement = await this.page.getByRole('link', { name: productName });
        return (await productNameElement.textContent());
    }

    public async checkIfProductWasAddedToCart(productHeading: string) {
        const productName = await this.productNameInCart(productHeading);
        expect(productName).toEqual(productHeading);
    }
}

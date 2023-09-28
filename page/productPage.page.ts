import { Page } from "playwright"
import Env from "../utils/env";

export default class ProductPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //Selectors

    private async productAddToCartBtn(productName: string) {
        return this.page.getByLabel(`Dodaj „${productName}” do koszyka`);
    }

    private get productGoToCartBtn() {
        return this.page.getByRole('link', { name: "Zobacz koszyk"});
    }

    //Actions

    public async addProductToCartFromProductList(productName: string) {
        await (await this.productAddToCartBtn(productName)).click();
    }

    public async goToCartFromProductList() {
        await Promise.all([
            this.productGoToCartBtn.click(),
            this.page.waitForURL(Env.cartUrl)
        ]);
        expect(this.page.url()).toBe(Env.cartUrl);
    }
}

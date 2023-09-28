import { Page } from "playwright";
import Env from "../../utils/env";

export default class HeaderPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //Selectors

    private get shopButton() {
        return this.page.getByRole('link', { name: "Sklep" });
    }

    //Actions
    
    public async navigateToShopPage() {
        await Promise.all([
            this.shopButton.click(),
            this.page.waitForURL(Env.shopUrl)
        ]);
        expect(this.page.url()).toBe(Env.shopUrl);
    }
}

import { Browser, BrowserContext, Page, chromium } from "playwright";
import HeaderPage from "../page/section/headerSection.page";
import ProductPage from "../page/productPage.page";
import Env from "../utils/env";
import CartPage from "../page/cartPage.page";

describe("Basic Test Suite", () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    //Pages
    let header: HeaderPage;
    let product: ProductPage;
    let cart: CartPage;

    beforeEach(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto(Env.url);
        header = new HeaderPage(page);
        product = new ProductPage(page);
        cart = new CartPage(page);
    });

    afterEach(async () => {
        await browser.close();
    });

    test("User adds Test Product to cart and goes to cart page", async () => {
        const productName = "Test Product"

        await header.navigateToShopPage();
        await product.addProductToCartFromProductList(productName);
        await product.goToCartFromProductList();
        await cart.checkIfProductWasAddedToCart(productName);
    });
});

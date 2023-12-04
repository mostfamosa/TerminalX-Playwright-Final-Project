import { expect, test as setup } from '@playwright/test';
import { NavBar } from "../../logic/components/nav-bar"
import { existsSync } from 'fs';
import { auth } from '../../config/auth.json'

setup('authenticate', async ({ browser, request }) => {
    if (existsSync(auth.auth_file)) {
        return
    }
    await request.post(
        auth.auth_url,
        {
            data: {
                username: auth.email,
                password: auth.password
            },
        }
    );
    const state = await request.storageState();
    await request.post(
        auth.auth_url,
        {
            data: {
                sku: [auth.default_sku], attributes: [auth.default_attributes], values: [auth.default_values]
            }
        }
    );
    const context = await browser.newContext({ storageState: state });
    const page = await context.newPage();
    await page.goto(auth.home_page_url);
    const nav = new NavBar(page);
    expect(await nav.getProfileName()).toContain(auth.user_name);
    await page.context().storageState({ path: auth.auth_file });
});
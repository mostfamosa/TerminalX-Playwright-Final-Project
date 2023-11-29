import { expect, test as setup } from '@playwright/test';
import { NavBar } from "../../logic/components/NavBar"
import { existsSync } from 'fs';

const authFile = 'playwright/.auth/user.json';
const userName = "nawras";
const email = "knawras17@gmail.com"
const password = "nawras123N@";
const authUrl = "https://www.terminalx.com/pg/MutationUserLogin";
const url = "https://www.terminalx.com/pg/MutationUserLogin";
const homePageUrl = "https://www.terminalx.com/";

setup('authenticate', async ({ browser, request }) => {
    if (existsSync(authFile)) {
        return
    }
    const res = await request.post(
        authUrl,
        {
            data: {
                username: email,
                password: password
            },
        }
    );
    const state = await request.storageState();
    await request.post(
        url,
        {
            data: {
                sku: ["Z755900001"], attributes: ["93"], values: ["4"]
            }
        }
    );
    const context = await browser.newContext({ storageState: state });
    const page = await context.newPage();
    await page.goto(homePageUrl);
    const nav = new NavBar(page);
    expect(await nav.getProfileName()).toContain(userName);
    await page.context().storageState({ path: authFile });
});
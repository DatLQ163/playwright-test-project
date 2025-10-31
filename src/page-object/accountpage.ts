import { Page } from "@playwright/test";

export class AccountPage{
    readonly allDepartment = this.page.getByText('All departments');

    constructor(private page: Page){
    }

    async navigateToAllDepartmentsSection(){
        await this.allDepartment.click();
    }

    async selectDepartmentsMenu(pageName: string){
        await this.page.getByRole('link', { name: ` ${pageName}` }).click();
    }

    async selectMenuBar(pageName: string){
        await this.page.getByRole('link', { name: `${pageName}` }).click();
    }
}
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Application from "@ioc:Adonis/Core/Application";

export default class extends BaseSeeder {
    private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
        /**
         * Do not run when not in dev mode and seeder is development
         * only
         */
        if (Seeder.default.developmentOnly && !Application.inDev) {
            return
        }

        await new Seeder.default(this.client).run()
    }

    public async run() {
        await this.runSeeder(await import('../User'))
        await this.runSeeder(await import('../DemonstrationCategory'))
        await this.runSeeder(await import('../Demonstration'))
        await this.runSeeder(await import('../Diagram'))
        await this.runSeeder(await import('../ExerciseCategory'))
        await this.runSeeder(await import('../Exercise'))
        await this.runSeeder(await import('../RecipeCategory'))
        await this.runSeeder(await import('../Recipe'))
        await this.runSeeder(await import('../FamilyMember'))
        await this.runSeeder(await import('../ExerciseLog'))
    }
}

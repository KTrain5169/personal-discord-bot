import { BuilderComponent, RegisterCommand } from "@seedcord/gateway";

@RegisterCommand('global')
export class Roll extends BuilderComponent<'command'> {
    constructor() {
        super('command')

        this.instance.setName('roll').setDescription('Roll a 1d20, good luck!')
    }
}

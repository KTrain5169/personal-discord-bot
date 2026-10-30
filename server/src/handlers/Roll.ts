import { randomInt } from 'node:crypto';

import { SlashRoute, SlashHandler } from '@seedcord/gateway';

@SlashRoute('roll')
export class Roll extends SlashHandler<'roll'> {
    public async execute(): Promise<void> {
        await this.reply(JSON.stringify(randomInt(1, 20)));
    }
}

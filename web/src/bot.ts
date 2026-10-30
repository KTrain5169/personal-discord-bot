import { Seedcord } from '@seedcord/http';
import { Converters, Envapter } from 'envapt';

import { Uptime } from '#plugins/Uptime';

export const seedcord = new Seedcord({
    bot: {
        interactions: {
            path: './handlers'
        },
        commands: {
            path: './commands',
            guilds: Envapter.getAs('TESTING_GUILD_IDS', Converters.array(), [])
        }
    },
    subscribers: {
        path: null
    },
    botColor: 'Blurple',
    notifications: {
        developerUsername: 'KTrain5369'
    }
}).attach('uptime', Uptime);

export default seedcord;

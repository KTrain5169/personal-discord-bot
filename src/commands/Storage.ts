import { BuilderComponent, RegisterCommand } from '@seedcord/gateway';

@RegisterCommand('global')
export class Storage extends BuilderComponent<'command'> {
    constructor() {
        super('command');

        this.instance
            .setName('storage')
            .setDescription('Commands related to interacting with KV storage.')
            .addSubcommand((subcommand) =>
                subcommand
                    .setName('list')
                    .setDescription('List all stored keys.')
                    .addStringOption((b) => b.setName('prefix').setDescription('Prefix to filter keys with.').setRequired(false))
            )
            .addSubcommand((subcommand) =>
                subcommand
                    .setName('read')
                    .setDescription('Read a value stored under a key.')
                    .addStringOption((b) => b.setName('key').setDescription('The key to read from.').setRequired(true))
            )
            .addSubcommand((subcommand) =>
                subcommand
                    .setName('write')
                    .setDescription('Write a value stored under a key.')
                    .addStringOption((b) => b.setName('key').setDescription('The key to write to.').setRequired(true))
                    .addStringOption((b) => b.setName('value').setDescription('The value to write to the key.').setRequired(true))
                    .addBooleanOption((b) => b.setName('append').setDescription('Whether or not the bot should append.').setRequired(false))
            )
            .addSubcommand((subcommand) =>
                subcommand
                    .setName('delete')
                    .setDescription('Delete a key and its associated value.')
                    .addStringOption((b) => b.setName('key').setDescription('The key to delete.').setRequired(true))
                    .addBooleanOption((b) => b.setName('display').setDescription('Whether or not to display the value of the key prior to deletion.').setRequired(false))
            );
    }
}

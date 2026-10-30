import { BuilderComponent, RegisterCommand } from '@seedcord/gateway';
import { allTags } from 'content-collections';

@RegisterCommand('global')
export class Tag extends BuilderComponent<'command'> {
    constructor() {
        super('command');

        this.instance
            .setName('tag')
            .setDescription('Tag-related commands')
            .addSubcommand((command) =>
                command
                    .setName('list')
                    .setDescription('List tags loaded.')
                    .addBooleanOption((option) =>
                        option.setName('ephemeral').setDescription('Whether or not only you can view it.')
                    )
            )
            .addSubcommand((command) =>
                command
                    .setName('view')
                    .setDescription('View a tag.')
                    .addStringOption((option) => option.setName('slug').setDescription('Slug of the tag to retrieve.').setChoices(...allTags.map(v => ({ name: v.title, value: v._meta.path }))).setRequired(true))
                    .addBooleanOption((option) =>
                        option.setName('ephemeral').setDescription('Whether or not only you can view it.')
                    )
            );
    }
}

import { SlashRoute, SlashHandler } from '@seedcord/gateway';
import { allTags } from 'content-collections';
import { SeparatorBuilder, TextDisplayBuilder } from 'discord.js';

@SlashRoute('tag/list')
export class TagList extends SlashHandler<'tag/list'> {
    async execute(): Promise<void> {
        const list = allTags.map((v) => v._meta.path);
        await this.reply(
            {
                components: [
                    new TextDisplayBuilder().setContent('Tag list:'),
                    new SeparatorBuilder(),
                    new TextDisplayBuilder().setContent(`- ${list.join('\n- ')}`)
                ]
            },
            {
                ephemeral: this.options.getBoolean('ephemeral') ?? true
            }
        );
    }
}

@SlashRoute('tag/view')
export class TagView extends SlashHandler<'tag/view'> {
    async execute(): Promise<void> {
        const slug = this.options.getString('slug')
        const item = allTags.find(v => v._meta.path === slug)
        if (!item) {
            await this.reply({
                components: [
                    new TextDisplayBuilder().setContent('Tag not found by that slug.')
                ]
            })
        } else {
            await this.reply({
                components: [
                    new TextDisplayBuilder().setContent(`## ${item.title}`),
                    new SeparatorBuilder(),
                    new TextDisplayBuilder().setContent(item.content),
                    new SeparatorBuilder(),
                    new TextDisplayBuilder().setContent(`-# File: \`${item._meta.fileName}\``)
                ]
            }, {
                ephemeral: this.options.getBoolean('ephemeral') ?? true
            })
        }
    }
}

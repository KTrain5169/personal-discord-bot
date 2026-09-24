import { SlashRoute, SlashHandler } from "@seedcord/gateway";

@SlashRoute("storage/list")
export class StorageList extends SlashHandler<'storage/list'> {
    async execute(): Promise<void> {
        const list = await this.core.storage.getStorage().getKeys(this.options.getString('prefix') ?? undefined)
        if (list.length > 0) {
            await this.reply(`Current list of keys:\n\n- ${list.join('\n- ')}`)
        } else {
            await this.reply('No values stored yet.')
        }
    }
}

@SlashRoute("storage/read")
export class StorageRead extends SlashHandler<'storage/read'> {
    override async execute(): Promise<void> {
        const key = this.options.getString('key')
        const value = await this.core.storage.getStorage().get(key)
        if (value) {
            await this.reply(`Value stored under \`${key}\`:\n\n\`\`\`\n${value}\n\`\`\``)
        } else {
            await this.reply(`No value stored under \`${key}\`.`)
        }
    }
}

@SlashRoute("storage/write")
export class StorageWrite extends SlashHandler<'storage/write'> {
    override async execute(): Promise<void> {
        const key = this.options.getString('key')
        const value = this.options.getString('value')
        const append = this.options.getBoolean('append')
        const storage = this.core.storage.getStorage()
        const current = await storage.has(key)
        if (current) {
            switch (append) {
                case null:
                    await this.reply(`Key already exists with value attached to it. Check the value of the key with \`/storage read key:${key}\` If this was intentional, run again with the \`append\` value set.`)
                    break;
                case true: {
                    const current = await storage.get(key)!
                    await storage.set(key, current + '\n' + value)
                    await this.reply(`Appended to \`${key}\`.`)
                    break;
                }
                case false:
                    await storage.set(key, value)
                    await this.reply(`Overwrote \`${key}\`.`)
                    break;
            }
        } else {
            await storage.set(key, value)
            await this.reply(`Wrote to key \`${key}\`.`)
        }
    }
}

@SlashRoute('storage/delete')
export class StorageDelete extends SlashHandler<'storage/delete'> {
    override async execute(): Promise<void> {
        const storage = this.core.storage.getStorage()
        const key = this.options.getString('key')
        const value = this.options.getBoolean('display') ? await storage.get(key) : null
        await storage.del(key)
        let reply = `Key \`${key}\` was deleted.`
        if (value) {
            reply += `\n\nContents prior to deletion:\n\n\`\`\`\n${value}\n\`\`\``
        }
        await this.reply(reply)
    }
}

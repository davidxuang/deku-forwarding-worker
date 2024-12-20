import { TelegramApi } from '@codebam/cf-workers-telegram-bot';
import { OpenAPIRoute, Str } from 'chanfana';
import { Context } from 'hono';
import { z } from 'zod';
import { Environment, DekuMessage } from 'types';

export class ChatPost extends OpenAPIRoute {
    schema = {
        tags: ['Messages'],
        summary: 'Send a new Message',
        request: {
            params: z.object({
                chatId: Str(),
            }),
            body: {
                content: {
                    'application/json': {
                        schema: DekuMessage,
                    },
                },
            },
        },
        responses: {
            '200': {
                description: 'Message forwarded successfully',
            },
            '400': {
                description: 'Invalid request format or chat ID',
            },
            '502': {
                description: 'Telegram API error',
            }
        },
    };

    async handle(c: Context<{ Bindings: Environment }>) {
        const data = await this.getValidatedData<typeof this.schema>();
        const deku = data.body;

        try {
            return await new TelegramApi().sendMessage(
                `https://api.telegram.org/bot${c.env.TELEGRAM_BOT_TOKEN}`,
                {
                    chat_id: data.params.chatId,
                    text: `${deku.text}\n\`${deku.address}\``,
                    parse_mode: 'Markdown',
                }
            );
        } catch (_) {
            return new Response(null, { status: 502 });
        }
    }
}

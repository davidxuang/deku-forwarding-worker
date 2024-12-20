import { Int, Str } from 'chanfana';
import { z } from 'zod';

export const DekuMessage = z.object({
    id: Int({ example: 114 }),
    message_id: Str({ example: '946727114000' }),
    thread_id: Str({ example: '514' }),
    date: Str({ example: '946727114000' }).transform(
        (s) => new Date(Number(s))
    ),
    date_sent: Str({ example: '948308890000' }).transform(
        (s) => new Date(Number(s))
    ),
    type: Int({ example: 1 }),
    num_segments: Int({ example: -1 }),
    subscription_id: Int({ example: 1 }),
    status: Int({ example: -1 }),
    error_code: Int({ example: -1 }),
    // read: Bool(),
    // is_encrypted: Bool(),
    formatted_date: Str().nullable(),
    address: Str({ example: '+31112' }),
    text: Str({ example: 'Text' }),
    data: Str().nullable(),
});

export type Environment = {
    TELEGRAM_BOT_TOKEN: string;
};

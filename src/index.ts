import { fromHono } from 'chanfana';
import { Hono } from 'hono';
import { Environment } from 'types';
import { ChatPost } from 'endpoints/ChatPost';

// Start a Hono app
const app = new Hono<{ Bindings: Environment }>();

// Setup OpenAPI registry
const openapi = fromHono(app, {
    docs_url: '/',
});

// Register OpenAPI endpoints
openapi.post('/api/chats/:chatId', ChatPost);

// Export the Hono app
export default app;

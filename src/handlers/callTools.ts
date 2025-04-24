import { CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { EchoArgumentsSchema } from "../schemas/validators.js";
export async function handleCallTool(request: typeof CallToolRequestSchema._type) {
    const { name, arguments: args } = request.params;

    try {
        switch (name) {

            case "echo": {
                const validArgs = EchoArgumentsSchema.parse(args);
                return {
                    content: [{
                        type: "text",
                        text: validArgs.text,
                    }],
                };
            }

            default:
                throw new Error(`Unknown tool: ${name}`);
        }
    } catch (error: unknown) {
        console.error(`Error executing tool '${name}':`, error);
        // Re-throw the error to be handled by the main server logic or error handler
        throw error;
    }
} 
import { ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

export function getToolDefinitions() {
    return {
      tools: [
        {
          name: "echo",
          description: "Echo a message",
          inputSchema: {
            type: "object",
            properties: {
              text: {
                type: "string",
                description: "The message to echo",
              },
            },
            required: ["text"],
          },
        },
      ],
    };
  } 
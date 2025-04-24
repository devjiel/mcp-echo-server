import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer(
  {
    name: "echo-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Add echo tool
server.tool(
  "echo", 
  { text: z.string() },
  async ({ text }) => {
    return { content: [{ type: "text", text: `Result: ${text}` }] };
  }
);

// Connexion du transport
const transport = new StdioServerTransport();
await server.connect(transport);
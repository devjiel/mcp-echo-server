import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { fileURLToPath } from "url";

import { getToolDefinitions } from "./handlers/listTools.js";
import { handleCallTool } from "./handlers/callTools.js";

// Create server instance (global for export)
const server = new Server(
  {
    name: "google-calendar",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// --- Main Application Logic --- 
async function main() {
  try {

    // Set up MCP Handlers
    
    // List Tools Handler
    server.setRequestHandler(ListToolsRequestSchema, async () => {
      // Directly return the definitions from the handler module
      return getToolDefinitions();
    });

    // Call Tool Handler
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
      
      // Delegate the actual tool execution to the specialized handler
      return handleCallTool(request);
    });

    // 4. Connect Server Transport
    const transport = new StdioServerTransport();
    await server.connect(transport);

    // 5. Set up Graceful Shutdown
    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);

  } catch (error: unknown) {
    process.exit(1);
  }
}

// --- Cleanup Logic --- 
async function cleanup() {
  try {
    process.exit(0);
  } catch (error: unknown) {
    process.exit(1);
  }
}

// --- Exports & Execution Guard --- 
// Export server and main for testing or potential programmatic use
export { main, server };

// Run main() only when this script is executed directly
const isDirectRun = import.meta.url.startsWith('file://') && process.argv[1] === fileURLToPath(import.meta.url);
if (isDirectRun) {
  main().catch(() => {
    process.exit(1);
  });
}
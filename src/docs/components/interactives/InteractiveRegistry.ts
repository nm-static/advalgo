/**
 * Registry mapping interactive IDs to their component imports and metadata.
 *
 * To add a new interactive:
 * 1. Create the component in this folder (e.g., MyInteractive.astro or MyInteractive.tsx)
 * 2. Add an entry here with the ID matching your Obsidian interactive file
 *
 * The description comes from the Obsidian vault and is for documentation only.
 */

export interface InteractiveEntry {
  component: () => Promise<any>;
  description?: string;
}

// This will be populated by the parser with descriptions from Obsidian
export const interactiveDescriptions: Record<string, string> = {};

// Map of interactive IDs to their component imports
// Add new interactives here as they are implemented
export const interactiveRegistry: Record<string, InteractiveEntry> = {
  // Example:
  // "tape-sort": {
  //   component: () => import("./TapeSort.astro"),
  // },
};

// Check if an interactive has been implemented
export function isImplemented(id: string): boolean {
  return id in interactiveRegistry;
}

// Get list of all registered interactive IDs
export function getRegisteredIds(): string[] {
  return Object.keys(interactiveRegistry);
}

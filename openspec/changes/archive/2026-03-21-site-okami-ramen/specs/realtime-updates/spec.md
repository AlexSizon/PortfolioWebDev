## ADDED Requirements

### Requirement: SSE endpoint streams menu change events
The `/api/menu/events` endpoint SHALL implement Server-Sent Events (SSE) that keeps connections open and sends a `menu-updated` event whenever any menu item or category is created, updated, or deleted.

#### Scenario: Client receives menu-updated event after admin edit
- **WHEN** an admin saves a change to any menu item
- **THEN** all connected SSE clients receive a `data: menu-updated\n\n` event within 1 second

#### Scenario: SSE connection stays open
- **WHEN** the public menu page establishes an SSE connection
- **THEN** the connection remains open and does not time out within 5 minutes of inactivity

#### Scenario: SSE sends keepalive to prevent proxy timeout
- **WHEN** no menu changes occur for 30 seconds
- **THEN** the SSE endpoint sends a `: keepalive\n\n` comment to prevent proxy/load balancer timeout

### Requirement: Public menu page subscribes to SSE and updates without reload
The public `/menu` page SHALL establish an SSE connection on mount and reactively fetch fresh menu data when a `menu-updated` event is received.

#### Scenario: Menu data refreshes on SSE event
- **WHEN** the SSE endpoint sends a `menu-updated` event
- **THEN** the public menu page fetches fresh menu data from `/api/menu` and re-renders within 2 seconds without a full page reload

#### Scenario: SSE connection is cleaned up on unmount
- **WHEN** the user navigates away from the `/menu` page
- **THEN** the `EventSource` connection is closed (no memory leak)

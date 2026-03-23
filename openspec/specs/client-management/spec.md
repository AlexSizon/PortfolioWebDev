# client-management Specification

## Purpose
TBD - created by archiving change site-flowo-crm. Update Purpose after archive.
## Requirements
### Requirement: Client list page with search and filter
The Clients page SHALL display all 20 seed clients in a card or table layout, with a search input that filters by name or company and a tag filter dropdown.

#### Scenario: All clients visible on initial load
- **WHEN** the user navigates to the Clients page
- **THEN** all 20 clients are displayed with name, company, email, and tag badges visible

#### Scenario: Search filters clients in real-time
- **WHEN** the user types in the search input
- **THEN** the client list immediately filters to show only clients whose name or company contains the search string (case-insensitive)

#### Scenario: Tag filter narrows results
- **WHEN** the user selects a tag from the filter dropdown (e.g., "VIP")
- **THEN** only clients with that tag are displayed

### Requirement: Client detail page shows full profile
Clicking a client SHALL navigate to `/clients/[id]` which displays: contact information, all associated deals (with stage and value), all associated tasks, and a chronological notes/activity list.

#### Scenario: Client detail page renders all data
- **WHEN** the user clicks on a client named "Acme Corp"
- **THEN** the detail page shows their full contact info, all deals linked to them, all tasks, and the activity log

#### Scenario: Deal list in client detail links to pipeline
- **WHEN** the user clicks a deal name in the client detail page
- **THEN** they are navigated to the pipeline view with that deal highlighted (or a deal detail panel opens)

### Requirement: Demo mode disables destructive client actions
In demo mode (demo user), the "Delete Client" button SHALL be visually present but trigger a toast notification instead of performing the deletion.

#### Scenario: Delete client blocked in demo mode
- **WHEN** the demo user clicks "Delete Client" and confirms
- **THEN** a toast appears: "Delete is not available in demo mode" and the client remains in the list


# kanban-pipeline Specification

## Purpose
TBD - created by archiving change site-flowo-crm. Update Purpose after archive.
## Requirements
### Requirement: Kanban pipeline board with 6 stages
The pipeline page SHALL display a horizontal kanban board with 6 columns: Leads, Qualified, Proposal, Negotiation, Won, Lost. Each column shows all deals in that stage as draggable cards.

#### Scenario: Deals displayed in correct columns
- **WHEN** the user navigates to the Pipeline page
- **THEN** all 24 seed deals appear in their respective stage columns with client name, deal value, and creation date visible

#### Scenario: Deal card can be dragged to another column
- **WHEN** the user drags a deal card from "Leads" to "Qualified"
- **THEN** the card moves into the "Qualified" column visually and the deal's stage is persisted to the database

#### Scenario: Dropped deal shows in new column after reload
- **WHEN** the user drags a deal to a new column and then refreshes the page
- **THEN** the deal appears in the new column (change was persisted)

#### Scenario: Column total value updates on drag
- **WHEN** a deal is moved between columns
- **THEN** the total pipeline value shown at the top of each column updates to reflect the change

### Requirement: Deal cards show key information
Each deal card on the kanban board SHALL show: deal title, associated client name, deal value (formatted as currency), and a color-coded priority indicator.

#### Scenario: Deal card content is readable
- **WHEN** the kanban board is rendered
- **THEN** each card legibly shows all required fields without overflow or clipping

### Requirement: Add deal modal available from pipeline view
The pipeline page SHALL include an "Add Deal" button that opens a modal form to create a new deal.

#### Scenario: New deal appears in Leads column after creation
- **WHEN** the user fills in deal name, selects a client, enters a value, and submits the modal
- **THEN** the new deal appears at the top of the "Leads" column immediately


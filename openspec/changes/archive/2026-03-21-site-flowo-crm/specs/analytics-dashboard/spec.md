## ADDED Requirements

### Requirement: Dashboard shows revenue bar chart by month
The Dashboard analytics section SHALL show a bar chart of total deal value closed (Won stage) per month for the last 3 months.

#### Scenario: Revenue chart renders with seed data
- **WHEN** the user navigates to the Dashboard
- **THEN** a bar chart displays 3 bars (one per month) with correct total values from Won deals

#### Scenario: Chart tooltips show exact values
- **WHEN** the user hovers over a bar in the revenue chart
- **THEN** a tooltip displays the month name and exact revenue value formatted as currency

### Requirement: Dashboard shows KPI cards
The Dashboard SHALL display 4 KPI metric cards: Total Clients, Active Deals, Revenue This Month, and Conversion Rate (Won / (Won + Lost) × 100%).

#### Scenario: KPI values match seed data
- **WHEN** the user views the Dashboard KPI cards
- **THEN** Total Clients shows 20, Active Deals shows count of all non-Won/non-Lost deals, and Conversion Rate shows correct percentage based on Won vs Lost deals

### Requirement: Deal trend line chart shows monthly deal counts
The Dashboard SHALL include a line chart showing number of new deals created per month over the last 3 months.

#### Scenario: Line chart renders with correct data points
- **WHEN** the user views the Dashboard
- **THEN** the line chart shows a data point for each of the 3 seed months with the correct deal count

#### Scenario: Charts are disabled during SSR
- **WHEN** the Next.js server renders the Dashboard page
- **THEN** chart components are loaded client-side only (via `dynamic(() => import(...), { ssr: false })`) without hydration errors

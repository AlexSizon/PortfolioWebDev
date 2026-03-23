## ADDED Requirements

### Requirement: Admins can manage dish ingredients
The `/admin/menu` experience SHALL allow admins to create and edit an ingredients field for each dish as part of the existing add/edit workflow.

#### Scenario: Admin adds ingredients to a new dish
- **WHEN** the admin opens "Add Dish", enters ingredients, and saves
- **THEN** the new dish is persisted with its ingredients and the public menu can read them immediately

#### Scenario: Admin edits ingredients on an existing dish
- **WHEN** the admin opens "Edit" for an existing dish, changes the ingredients, and saves
- **THEN** the updated ingredients are persisted and returned in the saved menu item payload

# 🛍️ React + TypeScript Product Filter App

A simple product listing app with dynamic filtering, built using React, TypeScript, and Tailwind CSS.

---

## 🛠️ Project Setup and Implementation Steps

### 1. Project Initialization

- Bootstrapped a new **React + TypeScript** project using `yarn`.
- Installed and configured **Tailwind CSS** for styling.

### 2. Data and Type Definitions

- Created a `datastore.ts` file to simulate a backend, providing:
  - A list of products
  - Property definitions
  - Supported filter operators
- Defined strong types in `types.ts` (`Product`, `Property`, `Operator`, `Filter`, etc.) to ensure type safety throughout the app.

### 3. Basic Table Implementation

- Built a basic table (`ProductTable`) to render the products.
- Verified correct rendering and data flow.

### 4. Styling with Tailwind CSS

- Used Tailwind for:
  - Clean, responsive layout
  - Spacing and padding
  - Borders and typography
  - Utility classes for quick prototyping

### 5. Filter Bar

The filter bar includes:

- A **Property** dropdown (e.g. Product Name, Color)
- A **dynamic Operator** dropdown (filtered by property type)
- A **Value** input (shown only when both above are selected)

### 6. Property Options

The following properties are available:

| Name         | Type         | Values (if applicable)                      |
| ------------ | ------------ | ------------------------------------------- |
| Product Name | `string`     | -                                           |
| Color        | `string`     | -                                           |
| Weight (oz)  | `number`     | -                                           |
| Category     | `enumerated` | `"tools"`, `"electronics"`, `"kitchenware"` |
| Wireless     | `enumerated` | `"true"`, `"false"`                         |

### 7. Operator Logic

Each property type has a set of valid operators:

| Property Type | Valid Operators                                                              |
| ------------- | ---------------------------------------------------------------------------- |
| `string`      | `equals`, `contains`, `has any value`, `has no value`, `is any of`           |
| `number`      | `equals`, `is greater than`, `is less than`, `has any value`, `has no value` |
| `enumerated`  | `equals`, `is any of`, `has any value`, `has no value`                       |

### 8. Dynamic Operator Filtering

On property selection:

1. Retrieve the selected `Property` by ID.
2. Use its `type` to determine the valid operators.
3. Render only those operators in the second dropdown.
4. Created an enum called OperatorId to help prevent spelling mistakes.

To handle this logic, a utility function is used:

```ts
getPropertyValidOperators(property: Property | undefined): Operator[]
```

### 9. Third Input Logic

Now I needed to render the 3 select. So it will only show if we have a property and an operator id
If the property is a string or a number, I want to display an input type text or number
If the property is enumerated I want to display a select
However, if the property is enumerated and the operator is “is any of” (in) I want to show a multiselect

### 10. Created the Filter Logic

Created the filter logic having in mind the properties and operators.
Faced an issue when it was a string, I needed to do a lowercase so the search wont be case sensitive.

### 11. Added Clear Button

### 12. Add a simple Unit Test for the FilterBar

### 13. Deployed the App with Cloudflare Pages

---
name: 'ui'
root: 'src/components/ui'
output: '.'
ignore: []
questions:
  name: 'Please enter component name'
---

# Variables

-   name: `{{ inputs.name | pascal }}`


# `{{ name }}/index.tsx`

```tsx
type Props = {};

export const {{ name }} = ({}) => {
  return <>this is ui of {{ name }} </>;
};

```

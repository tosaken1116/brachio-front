---
name: "page"
root: "src/components/page"
output: "."
questions:
  name: "page name"
---

# Variables

- name: `{{ inputs.name | pascal }}`


# `{{ name }}/index.tsx`

```tsx
export const {{ name }} = () => {
  return <>this is page of {{ name }} </>;
};
```
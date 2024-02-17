---
name: "model"
root: "src/components/domains"
output: "."
questions:
  name: "component name"
  domain: "What domain do you want to generate?"
  have_props:
    confirm: "Do you have props?"
    initial: false
  have_hooks:
    confirm: "Do you have hooks?"
    initial: false
  gen_files:
    message: "What files do you want to generate?"
    multiple: true
    choices:
      - "Empty"
      - "Loading"
      - "Error"
---

# Variables

- name: `{{ inputs.name | pascal }}`
- domain: `{{ inputs.domain | pascal }}`

# `{{ domain }}/components/{{ name }}/index.tsx`

```tsx
import { {{ name }}Container } from './container';
{{include(inputs.gen_files,"loading" )|| "import { " + name + "LoadingPresentation } from './presentations/loading'"}}
{{include(inputs.gen_files,"error" )|| "import { " + name + "ErrorPresentation } from './presentations/error'"}}
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

{{inputs.have_props||"type Props = {}"}}

export const {{ name }} = ({{inputs.have_props||"{}"}}{{inputs.have_props||":<Props>"}}) => (
  {{include(inputs.gen_files,"Error") && "<ErrorBoundary fallback={<" + name + "ErrorPresentation />}>"}}
    {{include(inputs.gen_files,"Loading") && "<Suspense fallback={<" + name + "LoadingPresentation />}>"}}
      <{{ name }}Container />
    {{include(inputs.gen_files,"Loading") && "</Suspense>"}}
  {{include(inputs.gen_files,"Error") && "</ErrorBoundary>"}}
);

```

# `{{ domain }}/components/{{ name }}/container.tsx`

```tsx
{{inputs.have_hooks&&("import { use" + name + " } from './hooks'")}}
import { {{ name }}Presentation } from './presentations';
{{inputs.have_hooks && "import { " + name + "EmptyPresentation } from './presentations/empty';"}}
export const {{name}}Container = ()=>{
  {{ inputs.have_hooks && "const { state" + ( include(inputs.gen_files,"empty") || ", isEmpty") + "} = use" + name + "()"}}
  {{ (inputs.have_hooks && include(inputs.gen_files,"empty")) || "if (isEmpty){return <" + name + "EmptyPresentation />;}"}}
  return <{{ name }}Presentation  />
}
```

# `{{ domain }}/components/{{include(inputs.gen_files,"Empty")}}{{ name }}/presentations/empty.tsx`

```tsx

export const {{ name }}EmptyPresentation = () => {
  return <>this is {{ name }} empty presentation</>;
};
```

# `{{ domain }}/components/{{include(inputs.gen_files,"Loading")}}{{ name }}/presentations/loading.tsx`

```tsx
export const {{ name }}LoadingPresentation = () => {
  return <>this is {{ name }} loading presentation</>;
};
```

# `{{ domain }}/components/{{ include(inputs.gen_files,"Error") || "!" }}{{ name }}/presentations/error.tsx`

```tsx
export const {{ name }}ErrorPresentation = () => {
  return <>this is {{ name }} error presentation</>;
};
```

# `{{ domain }}/components/{{ inputs.have_hooks || "!" }}{{ name }}/hooks/index.ts`

```ts
import { useState } from "react";

type IUse{{ name }} = {
  state: string;
{{include(inputs.gen_files,"empty")||"  isEmpty: boolean;"}}
};


export const use{{ name }} = ():IUse{{ name }} => {
  const [state, setState] = useState("");
  {{include(inputs.gen_files,"empty")||"const isEmpty = true;"}}
  return {state{{include(inputs.gen_files,"empty")||" , isEmpty"}} }
};
```

# `{{ domain }}/components/{{name}}/presentations/index.tsx`

```tsx
export const {{ name }}Presentation = () => (
   <div>this is {{ name }} presentation</div>;
);

```


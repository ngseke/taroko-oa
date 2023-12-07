
# Taroko Contact List
Sean Huang

---
layout: cover
---

# Philosophy

- Make modules & hooks as **small** as possible
- Reuse components & logics as **much** as possible
- Use **self-descriptive** names for variables and functions
- Handle various **UI states**: _Loading State_, _Error State_, ...
- **A11Y-friendly**, allowing full navigation through keyboard

---
layout: cover
---

# Build Tooling

- **Vite**: rapid development experience
- **pnpm**: faster and more efficient than npm

<br/>

# Linting & Coding Convention

**ESLint**: enforce the consistent coding style, auto-fix on save
- `standard-with-typescript`
- `tailwindcss`
- `react`
- `react-hooks`

---
layout: cover
---

# Styles

- [TailwindCSS](https://tailwindcss.com/): atomic CSS, no need to waste energy inventing class names, no more magic numbers
- [clsx](https://github.com/lukeed/clsx): constructing `className` strings

<br/>

# Data Fetching

- [SWR](https://swr.vercel.app/) = stale-while-revalidate

  First return the data from cache (stale), then send the fetch request (revalidate), <br>and finally come with the up-to-date data.

- Axios

---
layout: cover
---

# Simple Data Validation

- Fields are required

<br/>

# Unit Test

- Vitest
- `@testing-library/react`
- `@testing-library/user-event`

---
layout: center
---

# Deployment

Deployed on GitHub Page using **GitHub Actions**

https://ngseke.github.io/taroko-oa/

---
layout: center
---


# This Slide

Created using [Slidev](https://sli.dev/)

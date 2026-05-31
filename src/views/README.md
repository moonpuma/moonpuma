# _pages (FSD pages layer)

This is the Feature-Sliced Design **pages** layer — it contains page-level modules (components, models, etc.) consumed by `src/app/(routing)/**`.

The directory is named `_pages` (underscore prefix) to prevent Next.js from treating it as a Pages Router directory, which would conflict with the App Router routes in `src/app`.

Import path alias: `@/_pages/<slice>`

# Uploading poems

## Creating a new volume
Volumes are folder in `src/app/volumes`, which should be numbered. Create a new folder for a new volume.

## Adding a poem to a volume
### Creating and naming file
Poems are placed into volumes, and are an `.mdx` file (e.g. `src/app/volumes/1/poem-title.mdx`).
The file title will be the url title, so the url above would turn into `capgrasmag.com/app/volumes/1/poem-title`. Spaces, etc are not allowed, naming it like a file should solve all of those headaches.

### Adding poem metadata
At the top of the `.mdx` file, add in the metadata at the top in the format:
```
---
title: title of the poem. This is what will be displayed on the page, and should be similar to the name of the file.
lastName: of the poet
firstName: of the poet
description: the about section of the poet, at the bottom of the screen
---
```

Use other poems as reference if needed.

### Adding the content of the poem

below the metadata's `---` enter in the poem. This uses a format called `markdown`, [here is a guide for using it](https://www.markdownguide.org/cheat-sheet/). It's intentionally fairly simple. We have a way of implementing HTML for more advanced formatting (e.g. Kai Ihns' poem), but most works should be able to follow this format.

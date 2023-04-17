---
pagination:
  data: collections
  size: 1
  alias: selectedTag
permalink: /recipes/tags/{{ selectedTag | noEmoji | slug }}/
layout: layouts/recipes-list.njk
allRecipesLabel: All recipes
eleventyComputed:
  metaTitle: "{{ selectedTag | noEmoji }}"
---

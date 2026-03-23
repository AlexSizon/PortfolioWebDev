## Context

`ProjectSlide.astro` has a details panel with left padding (`pl-14 / md:pl-20 / xl:pl-28`) on the right side of the split layout. Visually the text appears too close to the image boundary.

## Goals / Non-Goals

**Goals:**
- Increase left padding on the details panel so text has clear visual separation from the photo

**Non-Goals:**
- Changing panel width, layout structure, or any other visual property

## Decisions

Increase `pl-*` values: `pl-14 → pl-20`, `md:pl-20 → md:pl-28`, `xl:pl-28 → xl:pl-36`. No other changes.

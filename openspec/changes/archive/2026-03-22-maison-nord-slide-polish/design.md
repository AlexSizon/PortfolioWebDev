## Context

StudioSlide uses `flex-col` with `pt-24/md:pt-28` fixed top padding, causing the content to sit near the top of the viewport. ProjectSlide uses `border-nord-sand/30` for the vertical separator.

## Goals / Non-Goals

**Goals:**
- Studio slide: content block vertically centered in the viewport
- Project slide: separator border color changed to gold

**Non-Goals:**
- Any structural layout changes
- Responsive breakpoint changes

## Decisions

**StudioSlide:** Replace fixed `pt-*` top padding with `justify-center` on the flex container, and use symmetric `py-*` padding. This lets the browser center the content naturally within 100vh.

**ProjectSlide:** Change `border-nord-sand/30` to `border-nord-gold/40` on the details panel's left border — enough gold presence without overpowering the photo. On mobile the top border also gets the gold treatment.

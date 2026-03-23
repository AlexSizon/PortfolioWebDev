const track = document.querySelector<HTMLElement>("[data-slide-track]");
const slides = Array.from(document.querySelectorAll<HTMLElement>(".slide"));
const nav = document.getElementById("gallery-nav") as HTMLElement | null;
const btnPrev = document.getElementById("nav-prev") as HTMLButtonElement | null;
const btnNext = document.getElementById("nav-next") as HTMLButtonElement | null;

let current = 0;
let locked = false;
let wheelTimer: ReturnType<typeof setTimeout> | null = null;
let touchStartY = 0;
let touchScrollable: HTMLElement | null = null;

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

function getActiveSlide(): HTMLElement | null {
  return slides[current] ?? null;
}

function getScrollableContainer(target: EventTarget | null): HTMLElement | null {
  return target instanceof Element
    ? (target.closest(".js-allow-scroll") as HTMLElement | null)
    : null;
}

function canConsumeScroll(container: HTMLElement, deltaY: number): boolean {
  if (container.scrollHeight <= container.clientHeight + 1) {
    return false;
  }

  if (deltaY > 0) {
    return container.scrollTop + container.clientHeight < container.scrollHeight - 1;
  }

  return container.scrollTop > 1;
}

function isInteractiveTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) {
    return false;
  }

  return Boolean(
    target.closest(
      'a, button, input, textarea, select, summary, [contenteditable="true"]'
    )
  );
}

function isTypingContext(): boolean {
  const activeElement = document.activeElement;
  if (!(activeElement instanceof HTMLElement)) {
    return false;
  }

  return Boolean(
    activeElement.closest(
      'input, textarea, select, button, [contenteditable="true"]'
    )
  );
}

function updateNavTheme(slide: HTMLElement): void {
  nav?.setAttribute("data-theme", slide.dataset.navTheme ?? "light");
  nav?.setAttribute(
    "data-wordmark-hidden",
    String(slide.dataset.slideKind === "studio")
  );
}

function updateButtons(): void {
  if (btnPrev) {
    btnPrev.disabled = current === 0;
  }

  if (btnNext) {
    btnNext.disabled = current === slides.length - 1;
  }
}

function applyTransform(): void {
  if (!track) {
    return;
  }

  track.style.transform = `translate3d(0, -${current * window.innerHeight}px, 0)`;
}

function syncUi(): void {
  const activeSlide = getActiveSlide();
  if (!activeSlide) {
    return;
  }

  applyTransform();
  updateNavTheme(activeSlide);
  updateButtons();

  slides.forEach((slide, index) => {
    const isActive = index === current;
    slide.dataset.active = isActive ? "true" : "false";
    slide.setAttribute("aria-hidden", String(!isActive));
  });

  document.body.dataset.activeSlide = activeSlide.dataset.slideKind ?? "";
}

function goToSlide(index: number, options?: { force?: boolean }): void {
  const next = clamp(index, 0, slides.length - 1);

  if (next === current && !options?.force) {
    syncUi();
    return;
  }

  current = next;
  syncUi();
}

if (track && slides.length > 0) {
  window.addEventListener(
    "wheel",
    (event) => {
      if (event.ctrlKey) {
        return;
      }

      if (isInteractiveTarget(event.target)) {
        return;
      }

      const scrollable = getScrollableContainer(event.target);
      if (scrollable && canConsumeScroll(scrollable, event.deltaY)) {
        return;
      }

      event.preventDefault();

      if (locked) {
        return;
      }

      locked = true;
      goToSlide(event.deltaY > 0 ? current + 1 : current - 1);

      if (wheelTimer) {
        clearTimeout(wheelTimer);
      }

      wheelTimer = setTimeout(() => {
        locked = false;
      }, 800);
    },
    { passive: false }
  );

  window.addEventListener("keydown", (event) => {
    if (isTypingContext()) {
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      goToSlide(current + 1);
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      goToSlide(current - 1);
    }
  });

  window.addEventListener("touchstart", (event) => {
    touchStartY = event.changedTouches[0].clientY;
    touchScrollable = getScrollableContainer(event.target);
  });

  window.addEventListener("touchend", (event) => {
    if (isInteractiveTarget(event.target)) {
      return;
    }

    const delta = touchStartY - event.changedTouches[0].clientY;
    if (Math.abs(delta) < 50) {
      return;
    }

    if (touchScrollable && canConsumeScroll(touchScrollable, delta)) {
      return;
    }

    goToSlide(delta > 0 ? current + 1 : current - 1);
  });

  btnPrev?.addEventListener("click", () => goToSlide(current - 1));
  btnNext?.addEventListener("click", () => goToSlide(current + 1));

  window.addEventListener("resize", () => syncUi());

  goToSlide(0, { force: true });
}

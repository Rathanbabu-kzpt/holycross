"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";

// Deterrents against casual copying of photos/content, written to work the same in Chrome, Edge,
// Firefox, Safari, Opera/Brave and mobile browsers. They stop right-click "Save image", dragging,
// save/print/view-source and dev-tools keyboard shortcuts — but no website can fully prevent
// screenshots or a determined user opening dev tools from the browser's own menu.

const isEditable = (el: EventTarget | null) =>
  el instanceof Element &&
  el.closest("input, textarea, select, [contenteditable='true']") !== null;

// Physical keys (KeyboardEvent.code) so the check works even when Option/Alt changes the
// character on macOS (e.g. Cmd+Option+I reports key "ˆ" in Safari/Chrome).
const MOD_KEYS = new Set(["KeyS", "KeyU", "KeyP"]); // save page, view source, print
const MOD_SHIFT_KEYS = new Set([
  "KeyI", // dev tools (all browsers)
  "KeyJ", // console (Chrome/Edge), browser console (Firefox)
  "KeyC", // element picker (Chrome/Edge/Firefox)
  "KeyK", // web console (Firefox)
  "KeyE", // network monitor (Firefox)
  "KeyM", // responsive design mode (Firefox)
  "KeyS", // screenshot (Firefox), web capture (Edge)
  "KeyX", // web capture (Edge)
]);
const MAC_OPT_KEYS = new Set([
  "KeyI", // Web Inspector / dev tools (Safari, Chrome, Edge, Firefox)
  "KeyJ", // console (Chrome/Edge)
  "KeyC", // console (Safari), element picker (Chrome/Firefox)
  "KeyU", // view source (Safari, Chrome)
  "KeyK", // web console (Firefox)
  "KeyE", // network (Firefox)
  "KeyM", // responsive mode (Firefox)
  "KeyR", // responsive design mode (Safari)
]);
const FN_KEYS = new Set(["F12"]);
const SHIFT_FN_KEYS = new Set(["F7", "F5", "F9", "F12"]); // Firefox style editor / profiler / storage

function isBlockedShortcut(e: KeyboardEvent) {
  const code = e.code || "";
  const mod = e.ctrlKey || e.metaKey;
  if (FN_KEYS.has(code) || e.key === "F12") return true;
  if (e.shiftKey && !mod && SHIFT_FN_KEYS.has(code)) return true;
  if (mod && e.shiftKey && MOD_SHIFT_KEYS.has(code)) return true;
  if (e.metaKey && e.altKey && MAC_OPT_KEYS.has(code)) return true;
  if (mod && !e.shiftKey && !e.altKey && MOD_KEYS.has(code)) return true;
  return false;
}

/**
 * Best-effort detection of *docked* developer tools on desktop browsers: docking shrinks the page
 * area while the window stays the same size. We compare against a baseline taken at load (so
 * browser sidebars / bookmark bars don't count) and re-baseline on zoom changes. Undocked dev tools
 * cannot be detected by any website.
 */
function useDevToolsDetection(onChange: (open: boolean) => void) {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return; // phones/tablets have no dev tools
    const THRESHOLD = 160;
    const gaps = () => ({
      w: Math.max(0, window.outerWidth - window.innerWidth),
      h: Math.max(0, window.outerHeight - window.innerHeight),
      dpr: window.devicePixelRatio,
    });
    let base = gaps();
    let open = false;
    const check = () => {
      const now = gaps();
      if (Math.abs(now.dpr - base.dpr) > 0.01) {
        base = now; // zoom changed — re-measure instead of flagging
        return;
      }
      // If the gap ever shrinks below the baseline (e.g. a sidebar closed), adopt the smaller baseline.
      base = {
        ...base,
        w: Math.min(base.w, now.w),
        h: Math.min(base.h, now.h),
      };
      const isOpen =
        !document.fullscreenElement &&
        (now.w - base.w > THRESHOLD || now.h - base.h > THRESHOLD);
      if (isOpen !== open) {
        open = isOpen;
        onChange(open);
      }
    };
    const id = window.setInterval(check, 800);
    window.addEventListener("resize", check);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("resize", check);
    };
  }, [onChange]);
}

const BLANK = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const SAVED = ["src", "srcset", "sizes"] as const;

/** Swap every photo's source for a blank pixel (originals kept in data-* attributes). */
function stripImage(img: HTMLImageElement) {
  if (img.dataset.protected === "1" && img.getAttribute("src") === BLANK && !img.hasAttribute("srcset")) return;
  for (const a of SAVED) {
    const v = img.getAttribute(a);
    // Keep the first real value we saw; ignore our own blank.
    if (v !== null && v !== BLANK && img.dataset.protected !== "1") img.setAttribute(`data-p-${a}`, v);
    img.removeAttribute(a);
  }
  img.dataset.protected = "1";
  img.setAttribute("src", BLANK);
}

function restoreImage(img: HTMLImageElement) {
  if (img.dataset.protected !== "1") return;
  img.removeAttribute("src");
  for (const a of SAVED) {
    const v = img.getAttribute(`data-p-${a}`);
    if (v !== null) img.setAttribute(a, v);
    img.removeAttribute(`data-p-${a}`);
  }
  delete img.dataset.protected;
}

export default function ContentProtection() {
  const [toast, setToast] = useState(false);
  const [devtools, setDevtools] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const onDevtools = useCallback((open: boolean) => {
    document.documentElement.classList.toggle("devtools-open", open);
    setDevtools(open);
  }, []);
  useDevToolsDetection(onDevtools);

  // While dev tools are open: remove photo sources from the page and keep them removed,
  // and put the overlay back (same element, original classes) if it is deleted or edited.
  useEffect(() => {
    if (!devtools) return;
    const overlay = overlayRef.current;
    const home = overlay?.parentNode ?? null;
    const overlayClass = overlay?.getAttribute("class") ?? "";

    let active = true;
    let pending: number | undefined;
    const enforce = () => {
      if (!active) return; // dev tools closed — never re-apply after clean-up
      document.querySelectorAll("img").forEach(stripImage);
      // (classList.add re-writes the attribute even when unchanged, which would re-trigger the observer)
      if (!document.documentElement.classList.contains("devtools-open")) {
        document.documentElement.classList.add("devtools-open");
      }
      if (overlay && home) {
        if (!overlay.isConnected) home.appendChild(overlay);
        if (overlay.getAttribute("class") !== overlayClass) overlay.setAttribute("class", overlayClass);
        if (overlay.hasAttribute("style")) overlay.removeAttribute("style");
        if (overlay.hidden) overlay.hidden = false;
      }
    };
    enforce();

    let queued = false;
    const observer = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      pending = window.setTimeout(() => {
        queued = false;
        enforce();
      }, 50);
    });
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["src", "srcset", "class", "style", "hidden"],
    });
    const guard = window.setInterval(enforce, 500);
    return () => {
      active = false;
      observer.disconnect();
      window.clearInterval(guard);
      window.clearTimeout(pending);
      document.documentElement.classList.remove("devtools-open");
      document.querySelectorAll("img").forEach(restoreImage);
    };
  }, [devtools]);

  useEffect(() => {
    let timer: number | undefined;
    const warn = () => {
      setToast(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setToast(false), 2200);
    };
    const stop = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // Right-click / long-press / keyboard Menu key / Shift+F10 — allowed only in form fields.
    const onContext = (e: MouseEvent) => {
      if (isEditable(e.target)) return;
      stop(e);
      warn();
    };
    // Middle / back / forward buttons on images (open image in new tab).
    const onAux = (e: MouseEvent) => {
      if (
        e.button !== 0 &&
        e.target instanceof Element &&
        e.target.closest("img, picture, figure")
      )
        stop(e);
    };
    // Dragging an image anywhere (Firefox ignores -webkit-user-drag, so this matters there).
    const onDrag = (e: DragEvent) => {
      // (no :has() here — older Firefox/Safari would throw on it)
      const el = e.target instanceof Element ? e.target : null;
      if (
        el &&
        (el.closest("img, picture, figure") ||
          el.closest("a")?.querySelector("img"))
      )
        stop(e);
    };
    // Text/image selection starting on an image.
    const onSelectStart = (e: Event) => {
      if (e.target instanceof Element && e.target.closest("img, picture"))
        stop(e);
    };
    // Copy / cut of a selection containing images.
    const onCopy = (e: ClipboardEvent) => {
      if (isEditable(e.target)) return;
      const sel = window.getSelection();
      if (
        sel &&
        sel.rangeCount &&
        sel.getRangeAt(0).cloneContents().querySelector("img")
      ) {
        stop(e);
        warn();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (isBlockedShortcut(e)) {
        stop(e);
        warn();
      }
    };
    // Print / Save as PDF from the browser menu (CSS also hides the page when printing).
    const onBeforePrint = () => warn();

    const opts = { capture: true } as const;
    window.addEventListener("contextmenu", onContext, opts);
    window.addEventListener("auxclick", onAux, opts);
    window.addEventListener("mousedown", onAux, opts);
    window.addEventListener("dragstart", onDrag, opts);
    window.addEventListener("selectstart", onSelectStart, opts);
    window.addEventListener("copy", onCopy, opts);
    window.addEventListener("cut", onCopy, opts);
    window.addEventListener("keydown", onKey, opts);
    window.addEventListener("beforeprint", onBeforePrint);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("contextmenu", onContext, opts);
      window.removeEventListener("auxclick", onAux, opts);
      window.removeEventListener("mousedown", onAux, opts);
      window.removeEventListener("dragstart", onDrag, opts);
      window.removeEventListener("selectstart", onSelectStart, opts);
      window.removeEventListener("copy", onCopy, opts);
      window.removeEventListener("cut", onCopy, opts);
      window.removeEventListener("keydown", onKey, opts);
      window.removeEventListener("beforeprint", onBeforePrint);
    };
  }, []);

  return (
    <>
      {devtools && (
        <div
          ref={overlayRef}
          id="protect-overlay"
          role="alertdialog"
          aria-label="Content protected"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-navy/85 p-6 text-center text-white backdrop-blur-xl"
        >
          <div className="max-w-md">
            <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gold text-navy shadow-2xl">
              <ShieldCheck className="h-10 w-10" />
            </span>
            <p className="mt-6 font-display text-3xl font-bold">
              Content is protected
            </p>
            <p className="mt-3 text-white/75">
              Photos and content on this website belong to Holy Cross High
              School. Please close the developer tools to continue browsing.
            </p>
          </div>
        </div>
      )}
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 transition-all duration-300 ${
          toast ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {toast && (
          <span className="flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white shadow-2xl ring-1 ring-white/10">
            <ShieldCheck className="h-4 w-4 text-gold" /> Content on this site
            is protected
          </span>
        )}
      </div>
    </>
  );
}

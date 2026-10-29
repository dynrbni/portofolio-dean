"use client";

import { useEffect } from "react";

export default function MotionEffects() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose = () => {};

    function configure() {
      dispose();
      if (preference.matches) return;

      const seen = new WeakSet<Element>();
      const animations = new Set<Animation>();
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const element = entry.target as HTMLElement;
            delete element.dataset.revealPending;
            const animation = element.animate(
              [
                { opacity: 0, transform: "translateY(32px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              { duration: 850, easing: "cubic-bezier(.16,1,.3,1)" },
            );
            animations.add(animation);
            animation.onfinish = () => animations.delete(animation);
            observer.unobserve(element);
          }
        },
        { threshold: 0.08, rootMargin: "0px 0px -32px 0px" },
      );

      function observe(element: Element) {
        if (seen.has(element)) return;
        seen.add(element);
        if (element.getBoundingClientRect().top > window.innerHeight) {
          (element as HTMLElement).dataset.revealPending = "";
        }
        observer.observe(element);
      }

      document.querySelectorAll("[data-reveal]").forEach(observe);
      // Filtering replaces project nodes; register the new cards with the same observer.
      const mutations = new MutationObserver((records) => {
        for (const record of records) {
          for (const node of record.addedNodes) {
            if (!(node instanceof Element)) continue;
            if (node.matches("[data-reveal]")) observe(node);
            node.querySelectorAll("[data-reveal]").forEach(observe);
          }
        }
      });
      mutations.observe(document.body, { childList: true, subtree: true });

      dispose = () => {
        observer.disconnect();
        mutations.disconnect();
        animations.forEach((animation) => animation.cancel());
        document
          .querySelectorAll("[data-reveal-pending]")
          .forEach((element) => {
            delete (element as HTMLElement).dataset.revealPending;
          });
      };
    }

    configure();
    preference.addEventListener("change", configure);
    return () => {
      preference.removeEventListener("change", configure);
      dispose();
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}

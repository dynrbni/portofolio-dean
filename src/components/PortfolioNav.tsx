"use client";

import { useState } from "react";

export default function PortfolioNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <a
          href="#home"
          className="wordmark"
          aria-label="Dean Rabbani home"
          onClick={() => setOpen(false)}
        >
          dean<span>.</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#work">Selected work</a>
          <a href="#about">About me</a>
          <a href="#services">Services</a>
        </nav>
        <a className="button nav-contact" href="#contact">
          Let’s talk <span aria-hidden="true">↗</span>
        </a>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav container"
          aria-label="Mobile navigation"
        >
          <a href="#work" onClick={() => setOpen(false)}>
            Selected work
          </a>
          <a href="#about" onClick={() => setOpen(false)}>
            About me
          </a>
          <a href="#services" onClick={() => setOpen(false)}>
            Services
          </a>
          <a href="#contact" onClick={() => setOpen(false)}>
            Let’s talk
          </a>
        </nav>
      )}
    </header>
  );
}

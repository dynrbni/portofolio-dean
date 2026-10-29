"use client";

import { useState } from "react";
import { profile } from "@/data/portfolio";

export default function CopyEmail() {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <div className="copy-email">
      <button onClick={copy}>
        {status === "copied" ? "Email copied ✓" : "Copy email address"}
        {status === "idle" && <span aria-hidden="true">⧉</span>}
      </button>
      <span className="copy-status" role="status">
        {status === "failed"
          ? "Please select and copy the email address above."
          : status === "copied"
            ? "Ready to paste into your email app."
            : ""}
      </span>
    </div>
  );
}

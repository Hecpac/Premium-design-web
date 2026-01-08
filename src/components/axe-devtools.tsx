"use client";

import { useEffect } from "react";
import React from "react";
import ReactDOM from "react-dom";

export function AxeDevtools() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    let isMounted = true;
    import("@axe-core/react").then((axe) => {
      if (!isMounted) return;
      axe.default(React, ReactDOM, 1000);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return null;
}

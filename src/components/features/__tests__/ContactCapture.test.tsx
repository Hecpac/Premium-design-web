import { render, screen } from "@testing-library/react";
import { ContactCapture } from "@/components/features/ContactCapture";
import { describe, it, expect, vi } from "vitest";

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
    motion: {
        div: "div",
        h2: "h2",
        p: "p",
    },
    m: {
        div: "div",
        h2: "h2",
        p: "p",
        span: "span",
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
    useReducedMotion: () => false,
}));

describe("ContactCapture Component", () => {
    it("renders the first step of the lead discovery form", () => {
        render(<ContactCapture />);
        expect(screen.getByText(/Lead Discovery/i)).toBeInTheDocument();
        expect(screen.getByText(/Your Vision/i)).toBeInTheDocument();
        expect(screen.getByText(/I am interested in:/i)).toBeInTheDocument();
        expect(screen.getByText(/Expected Investment Range:/i)).toBeInTheDocument();
    });
});

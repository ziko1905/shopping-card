import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen, render, getByAltText } from "@testing-library/react";
import ShowcaseCard from "./ShowcaseCard.jsx"

describe("Showcase card general", () => {
    it("SC card renders", () => {
        render(<ShowcaseCard title="Test title" />)

        expect(() => screen.getByText("Test title")).not.toThrow()
    })
    it("SC renders default 'Add to cart' button", () => {
        render(<ShowcaseCard title="Test title" src="../assets/cart-outline.svg" />)

        expect(() => screen.getByText("Add To Cart")).not.toThrow()
    })
})

describe("Amount logic", () => {
    it("Remove negative values for amount", async () => {
        const user = userEvent.setup()
        const {rerender} = render(<ShowcaseCard />)

        await user.click(screen.getByLabelText("Decrement amount by one"))
        rerender(<ShowcaseCard />)
        expect(screen.getByLabelText("Input for changing amount with current amount").value).toBe("0")
    })
    it("Remove floats for amount", async () => {
        const user = userEvent.setup()
        const {rerender} = render(<ShowcaseCard />)

        await user.click(screen.getByLabelText("Input for changing amount with current amount"))
        await user.keyboard("5")
        rerender(<ShowcaseCard />)
        await user.keyboard(".")
        rerender(<ShowcaseCard />)
        expect(screen.getByLabelText("Input for changing amount with current amount").value).toBe("5")
    })
    it("Non numbers don't load", async () => {
        const user = userEvent.setup()
        const {rerender} = render(<ShowcaseCard />)

        await user.click(screen.getByLabelText("Input for changing amount with current amount"))
        expect(screen.getByLabelText("Input for changing amount with current amount").value).toBe("0")

        await user.keyboard("N")
        rerender(<ShowcaseCard />)
        expect(screen.getByLabelText("Input for changing amount with current amount").value).toBe("0")

        await user.keyboard("5")
        rerender(<ShowcaseCard />)
        expect(screen.getByLabelText("Input for changing amount with current amount").value).toBe("5")

        await user.keyboard("a")
        rerender(<ShowcaseCard />)
        expect(screen.getByLabelText("Input for changing amount with current amount").value).toBe("5")
    })
})
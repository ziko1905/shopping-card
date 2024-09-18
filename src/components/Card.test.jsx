import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen, render } from "@testing-library/react";
import Card from "./Card.jsx"

describe("Cart general", () => {
    it("cart renders", () => {
        render(<Card />)

        expect(() => screen.getByTestId("product-card")).not.toThrow()
    })
    it("cart renders title", () => {
        render(<Card title="Test title" />)

        expect(() => screen.getByText("Test title")).not.toThrow()
    })
    it("cart renders image", () => {
        render(<Card title="Test title" src="../assets/cart-outline.svg" />)

        expect(() => screen.getByAltText("Image of Test title")).not.toThrow()
        expect(() => screen.getByRole("img")).not.toThrow()
        expect(screen.getByAltText("Image of Test title").src).toBe("http://localhost:3000/assets/cart-outline.svg")
    })
    it("cart renders buttons", () => {
        render(<Card title="Test title" src="../assets/cart-outline.svg" />)

        expect(() => screen.getByText("+")).not.toThrow()
        expect(() => screen.getByText("-")).not.toThrow()
    })
    it("cart renders input", () => {
        render(<Card />)

        expect(() => screen.getByLabelText("Input for changing amount with current amount")).not.toThrow()
    })
})

describe("Buttons logic", () => {
    it("Increment btn increases amount", async () => {
        const user = userEvent.setup()
        const incCallback = vi.fn()
        render(<Card amountCallback={incCallback}/>)

        await user.click(screen.getByText("+"))

        expect(incCallback.mock.calls[0][0]).toBe(1)
    })
    it("Increment btn increases amount(custom amount)", async () => {
        const user = userEvent.setup()
        const incCallback = vi.fn()
        render(<Card amount={10} amountCallback={incCallback}/>)

        await user.click(screen.getByText("+"))

        expect(incCallback.mock.calls[0][0]).toBe(11)
    })
    it("Decrement btn decreases amount", async () => {
        const user = userEvent.setup()
        const incCallback = vi.fn()
        render(<Card amountCallback={incCallback}/>)

        await user.click(screen.getByText("-"))

        expect(incCallback.mock.calls[0][0]).toBe(-1)
    })
    it("Decrement btn decreases amount(custom amount)", async () => {
        const user = userEvent.setup()
        const decCallback = vi.fn()
        render(<Card amount={10} amountCallback={decCallback}/>)

        await user.click(screen.getByText("-"))

        expect(decCallback.mock.calls[0][0]).toBe(9)
    })
})

describe("Input logic", () => {
    it("Input having default value of 0", () => {
        render(<Card />)

        expect(screen.getByLabelText("Input for changing amount with current amount").value).toBe("0")
    })
    it("Input having value of amount prop", () => {
        render(<Card amount={10} />)

        expect(screen.getByLabelText("Input for changing amount with current amount").value).toBe("10")
    })
    it("Input calling amountCallback with right value", async () => {
        let amount = 0;
        const user = userEvent.setup()
        const inpCallback = vi.fn((newA) => amount = newA)
        const {rerender} = render(<Card amountCallback={inpCallback} />)

        await user.click(screen.getByLabelText("Input for changing amount with current amount"))
        await user.keyboard("5")

        expect(inpCallback.mock.calls[0][0]).toBe(5)
        expect(screen.getByLabelText("Input for changing amount with current amount")).toHaveFocus()
        rerender(<Card amount={amount} amountCallback={inpCallback} />)
        await user.keyboard("5")
        expect(inpCallback.mock.calls[1][0]).toBe(55)
    })
})


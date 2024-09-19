import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen, render } from "@testing-library/react";
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
        expect(screen.getByLabelText("Input for changing amount with current amount").value).toBe("1")
    })
    it("Remove floats for amount", async () => {
        const user = userEvent.setup()
        const {rerender} = render(<ShowcaseCard />)

        await user.click(screen.getByLabelText("Input for changing amount with current amount"))
        await user.keyboard("5")
        rerender(<ShowcaseCard />)
        await user.keyboard(".")
        rerender(<ShowcaseCard />)
        expect(screen.getByLabelText("Input for changing amount with current amount").value).toBe("15")
    })
    it("Non numbers don't load", async () => {
        const user = userEvent.setup()
        const {rerender} = render(<ShowcaseCard />)

        await user.click(screen.getByLabelText("Input for changing amount with current amount"))

        expect(screen.getByLabelText("Input for changing amount with current amount").value).toBe("1")

        await user.keyboard("N")
        rerender(<ShowcaseCard />)

        expect(screen.getByLabelText("Input for changing amount with current amount").value).toBe("1")

        await user.keyboard("5")
        rerender(<ShowcaseCard />)

        expect(screen.getByLabelText("Input for changing amount with current amount").value).toBe("15")

        await user.keyboard("a")

        rerender(<ShowcaseCard />)
        expect(screen.getByLabelText("Input for changing amount with current amount").value).toBe("15")
    })
})

describe("Adding to order", () => {
    it("Add first item", async () => {
        const user = userEvent.setup()
        const orderFn = vi.fn()
        const order = []
        render(<ShowcaseCard productId={1} order={order} orderCallback={orderFn}/>)

        await user.click(screen.getByText("Add To Cart"))

        expect(orderFn).toHaveBeenCalled()
        expect(orderFn.mock.calls[0][0]).toStrictEqual([{productId: 1, amount: 1}])
    })
    it("Add new item to old list", async () => {
        const user = userEvent.setup()
        const orderFn = vi.fn()
        const order = [{ productId: 2, amount: 2 }]
        render(<ShowcaseCard productId={1} order={order} orderCallback={orderFn}/>)

        await user.click(screen.getByText("Add To Cart"))

        expect(orderFn).toHaveBeenCalled()
        expect(orderFn.mock.calls[0][0]).toStrictEqual([{ productId: 2, amount: 2 }, {productId: 1, amount: 1, }])
    })
    it("Adding item that is already in order", async () => {
        const user = userEvent.setup()
        const orderFn = vi.fn()
        const order = [{ productId: 2, amount: 2 }, { productId: 1, amount: 2 }]
        render(<ShowcaseCard productId={2} order={order} orderCallback={orderFn}/>)

        await user.click(screen.getByText("Add To Cart"))

        expect(orderFn).toHaveBeenCalled()
        expect(orderFn.mock.calls[0][0]).toStrictEqual([{ productId: 2, amount: 3 }, { productId: 1, amount: 2 }])
    })
})
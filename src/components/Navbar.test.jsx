import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import Navbar from './Navbar.jsx'
import { MemoryRouter } from 'react-router-dom'

describe("Nav general", () => {
    it("renders navbar", () => {
        render(<MemoryRouter><Navbar /></MemoryRouter>)

        screen.debug()
    })
    it("renders homepage link", () => {
        render(<MemoryRouter><Navbar /></MemoryRouter>)

        expect(() => screen.getByText("Homepage")).not.toThrow()
    })
    it("renders shopping cart icon", () => {
        render(<MemoryRouter><Navbar /></MemoryRouter>)

        expect(() => screen.getByAltText("Shopping cart displaying amount of items in cart")).not.toThrow()
    })
})

describe("Shopping cart button", () => {
    it("render number of products icon", () => {
        render(<MemoryRouter><Navbar /></MemoryRouter>)

        expect(() => screen.getByAltText("Number of items in cart")).not.toThrow()
    })
})
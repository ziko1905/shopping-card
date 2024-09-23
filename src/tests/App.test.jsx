import { describe, it, expect, vi } from 'vitest';
import { screen, render, waitFor } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';
import { useEffect } from 'react';

let mockProductListProp
let mockOrderProp
let mockProductListPropSC
let mockOrderPropSC

const mockProductList = await fetch('https://fakestoreapi.com/products/').then(response => response.json()).then()
const mockOrder = ["pr1", "pr2"]

vi.mock(import("../components/pages/Homepage.jsx"), () => ({
  default: ({productList, orderCallback, order}) => {
      
      useEffect(() => {
        mockProductListProp(productList)
      }, [productList])

      useEffect(() => {
        mockOrderProp(order)
      }, [order])
      
      if (JSON.stringify(order) !== JSON.stringify(mockOrder)) orderCallback(mockOrder)
      return (
        <>
          <h1>Homepage</h1>
        </>
      )
  }
}))

vi.mock(import("../components/pages/ShoppingCart.jsx"), () => ({
  default: ({productList, orderCallback, order}) => {
      
      useEffect(() => {
        mockProductListPropSC(productList)
      }, [productList])

      useEffect(() => {
        mockOrderPropSC(order)
      }, [order])
      
      if (JSON.stringify(order) !== JSON.stringify(mockOrder)) orderCallback(mockOrder)
      return (
        <>
          <h1>Shopping Cart</h1>
        </>
      )
  }
}))

describe('App general', () => {
  it('Renders at homepage', () => {
    mockProductListProp = vi.fn()
    mockOrderProp = vi.fn()
    render(<MemoryRouter initialEntries={["/"]}><App /></MemoryRouter>)

    expect(() => screen.getByRole('heading', {name: "Homepage"})).not.toThrow()
  })
  it('Renders at shopping cart', () => {
    mockOrderPropSC = vi.fn()
    mockProductListPropSC = vi.fn()
    render(<MemoryRouter initialEntries={["/shopping-cart"]}><App /></MemoryRouter>)

    expect(() => screen.getByRole('heading', {name: "Shopping Cart"})).not.toThrow()
  })
  it('Passes props into routes', async () => {
    mockProductListProp = vi.fn()
    mockOrderProp = vi.fn()
    render(<MemoryRouter initialEntries={["/"]}><App /></MemoryRouter>)

    expect(mockProductListProp).toHaveBeenCalled()
    expect(mockProductListProp.mock.calls[0][0]).toStrictEqual([])

    await waitFor(() => expect(mockProductListProp).toHaveBeenCalledTimes(2))
    expect(mockProductListProp.mock.calls[1][0]).toStrictEqual(mockProductList)
  })
});

describe('Order managing in within App', () => {
  it("Set order changes order", async () => {
    mockOrderProp = vi.fn()
    render(<MemoryRouter initialEntries={["/"]}><App /></MemoryRouter>)

    await waitFor(() => expect(mockOrderProp).toHaveBeenCalledTimes(2))
    expect(mockOrderProp.mock.calls[1][0]).toStrictEqual(mockOrder)
  })
  it("Set order changes order(in shopping cart)", async () => {
    mockOrderPropSC = vi.fn()
    render(<MemoryRouter initialEntries={["/shopping-cart"]}><App /></MemoryRouter>)

    await waitFor(() => expect(mockOrderPropSC).toHaveBeenCalledTimes(2))
    expect(mockOrderPropSC.mock.calls[1][0]).toStrictEqual(mockOrder)
  })
})
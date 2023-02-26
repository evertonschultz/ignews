import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { Async } from '.'

test('it renders correctly', async () => {
  render(<Async />)

  // screen.logTestingPlaygroundURL() // mostra os elementos e faz a sugestão como seleciona-los para teste

  expect(screen.getByText('Hello World')).toBeInTheDocument()
  expect( await screen.findByText('Button')).toBeInTheDocument()

  // await waitForElementToBeRemoved(screen.queryByText("Button")) // outra forma utilizando o query que ao contrario não disparar erro se não encontrar
})

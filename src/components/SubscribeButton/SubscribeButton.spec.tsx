import { render, screen, fireEvent } from '@testing-library/react'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { SubscribeButton } from '.'

jest.mock('next-auth/react');
jest.mock('next/router');

describe('SubscribeButton component', () => {
  const useSessionMocked = jest.mocked(useSession)

  useSessionMocked.mockReturnValueOnce([null, false] as any)

  it('renders correctly', () => {
    render(
      <SubscribeButton priceId='' />
    )
  
    expect(screen.getByText('Subscribe now')).toBeInTheDocument()
  })

  it('redirects user to sign in when not authenticated', () => {
    const signInMocked = jest.mocked(signIn)
    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false] as any)

    render(
      <SubscribeButton priceId='' />
    )
  
    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled()
  });

  it('redirects to posts when user already has a subscription', () => {
    const useRouterhMocked = jest.mocked(useRouter)
    const useSessionMocked = jest.mocked(useSession)
    const pushMock = jest.fn()

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: { name: "John Doe", email: "john.doe@example.com" },
        activeSubscription: 'fake-active-subscription',
        expires: "fake-expires",
      },
    } as any)

    useRouterhMocked.mockReturnValueOnce({
      push: pushMock,
    } as any)

    render(
      <SubscribeButton priceId='' />
    )
  
    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton)

    expect(pushMock).toHaveBeenCalledWith('/posts')
  })
})

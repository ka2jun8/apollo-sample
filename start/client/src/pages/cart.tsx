import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { gql, useQuery } from '@apollo/client';
import { Loading, Header } from '../components';
import { CartItem, BookTrips } from '../containers';

const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`

interface CartProps extends RouteComponentProps {}

const Cart: React.FC<CartProps> = () => {
  const { data, loading, error } = useQuery(GET_CART_ITEMS)
  if(loading) return <Loading />
  if(error) return <p>ERROR: {error.message}</p>

  return (
    <>
      <Header>My Cart</Header>
      {!data.cartItems || !data.cartItems.length ? (
        <p data-testid="empty-message">No items in your cart</p>
      ) : (
        <>
          {data.cartItems.map((launchId: any) => (
            <CartItem key={launchId} launchId={launchId} />
          ))}
          <BookTrips cartItems={data.cartItems} />
        </>
      )}
    </>
  );
}

export default Cart;

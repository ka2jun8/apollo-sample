import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { gql, useQuery } from '@apollo/client';
import { LAUNCH_TILE_DATA } from './launches';
import { Loading, Header, LaunchTile } from '../components';

const GET_MY_TRIPS = gql`
  query GetMyTrips {
    me {
      id
      email
      trips {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`

interface ProfileProps extends RouteComponentProps {}

const Profile: React.FC<ProfileProps> = () => {
  const { data, loading, error } = useQuery(
    GET_MY_TRIPS,
    {fetchPolicy: "network-only"},
  );

  if(loading) return <Loading />
  if(error) return <p>ERROR: {error.message}</p>

  return (
    <>
      <Header>My Trips</Header>
      {data.me && data.me.trips.length ? (
        data.me.trips.map((launch: any) => (
          <LaunchTile key={launch.id} launch={launch} />
        ))
      ): (
        <p>You haven't booked any trips</p>
      )}
    </>
  )
}

export default Profile;
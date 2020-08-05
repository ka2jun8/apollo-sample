import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { gql, useQuery } from '@apollo/client';
import { Loading, Header, LaunchDetail } from '../components';
import { ActionButton } from '../containers';
import { LAUNCH_TILE_DATA } from './launches';

const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      id
      site
      isBooked
      rocket {
        type
      }
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`

interface LaunchProps extends RouteComponentProps {
  launchId?: any
}

const Launch: React.FC<LaunchProps> = ({ launchId }) => {
  const {data, loading, error} = useQuery(
    GET_LAUNCH_DETAILS,
    {variables: {launchId}}
  );
  if(loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>
  return (
    <>
      <Header image={data.launch.mission.missionPatch}>
        {data.launch.mission.name}
      </Header>
      <LaunchDetail {...data.launch} />
      <ActionButton {...data.launch} />
    </>);
}

export default Launch;

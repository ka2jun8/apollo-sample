import React, { Fragment }  from 'react';
import { RouteComponentProps } from '@reach/router';
import { gql, useQuery } from '@apollo/client'
import { LaunchTile, Header, Button, Loading } from "../components"

export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    __typename
    id
    isBooked
    rocket {
      id
      name
    }
    mission {
      name
      missionPatch
    }
  }
`;

const GET_LAUNCHES = gql`
  query launchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
        id
        isBooked
        rocket {
          id
          name
        }
        mission {
          name
          missionPatch
        }
      }
    }
  }
`

interface LaunchesProps extends RouteComponentProps {}

const Launches: React.FC<LaunchesProps> = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_LAUNCHES);
  if (loading) return <Loading />
  if (error) return <p>ERROR</p>

  console.log({data})
  return (
    <Fragment>
      <Header />
      {data.launches &&
        data.launches.launches &&
        data.launches.launches.map((launch: any )=> (
          <LaunchTile
            key={launch.id}
            launch={launch}
          />
        ))}
    </Fragment>
  );
}

export default Launches;

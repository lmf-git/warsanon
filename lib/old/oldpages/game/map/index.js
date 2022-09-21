import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Container from '@material-ui/core/Container';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import UserHelper from '../../../src/user/userHelper';
import Deferred from 'es6-deferred';
import FirebaseHelper from '../../../src/auth/firebaseHelper';
import MapData from '../../../src/game/map/mapData';
import { Promise } from 'es6-promise';
import PlayerData from '../../../src/game/player/playerData';


const metaViewpostValues = [
  'user-scalable=no',
  'initial-scale=1',
  'maximum-scale=1',
  'minimum-scale=1',
  'width=device-width',
  'height=device-height'
];


export default class MapPage extends Component {

  static async getInitialProps({ req }) {
    return UserHelper.adornInitialProps(req, {});
  };

  componentDidMount() {
    const user = UserHelper.getFromPropsOrCookie(this.props);
    
    Promise.all([
      FirebaseHelper.getData('worlds/configs/' + user.currentWorld),
      PlayerData.loadPlayerByUser(user)

    ]).then((data) => {
      const loaded = new Deferred;
      const unloaded = new Deferred;

      MapData.world.config = data[0];
      MapData.world.player = data[1];

      // Dynamically add map component so observable->ui initialised in correct order
      const mapElement = React.createElement(
        dynamic(import('../../../src/game/map/components/MapComponent.js'), { ssr: false }),
        { loaded, unloaded }
      );
      ReactDOM.render(mapElement, document.getElementById("map-container-wrapper"));

      // Trigger map container view start after data load via deferred promise.
      loaded.resolve();
    });
  }


  // Spawn select fires on other pages, this definitely needs to unmount properly.
  componentWillUnmount() {
    // Unload map data so navigation does not stall initialisaiton.
    MapData.endMap();
    // Below function should be called, but can't include on SSR...
    // Access via child?
    // MapApplication.annihilateLoading();
    document.body.className = document.body.className.replace('map', '');
  }

  render() {
    return (
      <>
        <Head>
          <meta name="viewport" content={metaViewpostValues.join(', ')} />
        </Head>
        <Container maxWidth="lg" id="content-container">
          <div id="map-container-wrapper"></div>
        </Container>
      </>
    );
  }

}



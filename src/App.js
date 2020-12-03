import { React, Component } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import MapAdsb from './components/map/MapAdsb'
import Gmap from './components/map/Gmap'
import MapWithMarkerLabel from './components/map/MapWithMarkerLabel'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/adsb">
            <MapAdsb />
          </Route>

          <Route path="/gmap">
            <Gmap />
          </Route>
          <Route path="/mapwithmarker">
            <MapWithMarkerLabel />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App 
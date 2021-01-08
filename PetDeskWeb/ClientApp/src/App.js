import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

import './custom.css'
import { AppointmentsData } from './components/AppointmentsData';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout style={{ backgroundImage: 'url("/assets/images/dog_cat_1920x1080.jpg")' }}>
        <Route exact path='/' component={Home} />
        <Route path='/appointments' component={AppointmentsData} />
      </Layout>
    );
  }
}

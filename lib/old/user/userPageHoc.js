import React, { Component } from 'react';
import UserHelper from '../user/userHelper';

export default function UserPageHOC(WrappedComponent) {

    return class extends Component {
      constructor(props) {
        super(props);
      }

      static async getInitialProps({ req }) {     
        let props = {};
        if (typeof WrappedComponent.getInitialProps === 'function') {
          props = await WrappedComponent.getInitialProps();
        }
        return UserHelper.adornInitialProps(req, props);
      };
  
      render() {
        return <WrappedComponent {...this.props} />;
      }
    };

  }
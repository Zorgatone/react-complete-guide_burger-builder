import React, { Component } from "react";

import Aux from "../Aux";
import Modal from "../../components/UI/Modal";

const WithErrorHandler = (WrappedComponent, axios) =>
  class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        error: null
      };

      this.errorConfirmedHandler = this.errorConfirmedHandler.bind(this);
    }

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(
        request => {
          this.setState({ error: null });
          return request;
        },
        error => {
          this.setState({ error: error });
          return Promise.reject(error);
        }
      );

      this.resInterceptor = axios.interceptors.response.use(
        response => {
          this.setState({ error: null });
          return response;
        },
        error => {
          this.setState({ error: error });
          return Promise.reject(error);
        }
      );
    }

    componentWillUnmount() {
      if ("undefined" !== typeof this.reqInterceptor) {
        axios.interceptors.request.eject(this.reqInterceptor);
        delete this.reqInterceptor;
      }

      if ("undefined" !== typeof this.resInterceptor) {
        axios.interceptors.response.eject(this.resInterceptor);
        delete this.resInterceptor;
      }
    }

    errorConfirmedHandler() {
      this.setState({ error: null });
    }

    render() {
      return (
        <Aux>
          <Modal
            modalClosed={this.errorConfirmedHandler}
            show={!!this.state.error}
          >
            {(this.state.error && this.state.error.message) || null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };

export default WithErrorHandler;

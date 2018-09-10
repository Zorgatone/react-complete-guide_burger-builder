import React, { Component } from "react";

import Aux from "../Aux";
import Modal from "../../components/UI/Modal";

const WithErrorHandler = (WrappedComponent, axios) =>
  class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        error: null,
        requestInterceptor: null,
        responseInterceptor: null
      };

      this.errorConfirmedHandler = this.errorConfirmedHandler.bind(this);
    }

    componentWillMount() {
      const requestInterceptor = axios.interceptors.request.use(
        request => {
          this.setState({ error: null });
          return request;
        },
        error => {
          this.setState({ error: error });
          return Promise.reject(error);
        }
      );

      const responseInterceptor = axios.interceptors.response.use(
        response => {
          this.setState({ error: null });
          return response;
        },
        error => {
          this.setState({ error: error });
          return Promise.reject(error);
        }
      );

      this.setState({
        requestInterceptor: requestInterceptor,
        responseInterceptor: responseInterceptor
      });
    }

    componentWillUnmount() {
      if (this.state.requestInterceptor) {
        axios.interceptors.request.eject(this.state.requestInterceptor);
      }

      if (this.state.responseInterceptor) {
        axios.interceptors.request.eject(this.state.requestInterceptor);
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

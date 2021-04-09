import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        //componentwillMount is removed in this react version & since we are causing side effect we can use constructor
        UNSAFE_componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ ...this.state, error: null });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, err => {
                this.setState({ error: err });
            });
        };

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        //action when backdrop  is clicked
        errorConfirmedHandler = () => {
            this.setState({error:null})
        }
        render() {
            return (
                <Aux>
                    <Modal show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
        
    }
}

export default withErrorHandler;
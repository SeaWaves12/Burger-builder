import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        //componentwillMount is removed in this react version & since we are causing side effect we can use constructor or UNSAFE_componentWillMount with warning!!
        constructor(props) {
            super(props);
            this.state = {
                error: null
            }
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.state = { error: null };
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, err => {
                this.state = { error: err };
            });
        }

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
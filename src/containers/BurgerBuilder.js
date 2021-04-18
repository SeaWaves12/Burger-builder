import React, { Component } from "react";
import axios from '../axios-orders';
import { connect } from 'react-redux';

import Aux from "../hoc/Auxiliary";
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from "../store/actions";

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state= {...}
    // }
    state = {
        purchasung: false, // active when order now button is clicked
        loading: false, //for loading spinner
        error:false
    }

    componentDidMount() {
        // axios.get('https://my-burger-builder-f61ec-default-rtdb.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         //console.log(response)
        //         this.setState({ ingredients: response.data })
        //     })
        //     .catch(err => {
        //         this.setState({error:true})
        //     });
    }

    //for showing modal
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    //for closing modal
    purchaseCancelHandler = (props) => {
        this.setState({ purchasing: false })
    }

    //
    purchaseContinueHandler = (props) => {
        this.props.history.push('/checkout');
    }

    // for purchasable
    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0;
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        purchasing={this.purchaseHandler}
                        price={this.props.price}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
            if (this.state.loading) {
                orderSummary = <Spinner />;
            }
        }
        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
};

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
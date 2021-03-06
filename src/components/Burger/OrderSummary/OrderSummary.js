import React, { Component } from 'react';

import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    //this could be a functional component, dosn'nt have  to be a class
    componentDidUpdate() {
        console.log("[orderSummary] didUpdate")  //componentDidUpdate instead of componentWillUpdate in latest react version.
    }
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return <li key={igKey}>
                            <span style={{ textTransform: 'capitalize' }}>{igKey} : </span>{this.props.ingredients[igKey]}
                        </li>
            });
        return (
            <Aux>
                <h3>Your Order:</h3>
                <p>A delicious burger with following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button
                    clicked={this.props.purchaseCanceled}
                    btnType="Danger">CANCEL</Button>
                <Button
                    clicked={this.props.purchaseContinued}
                    btnType="Success">CONTINUE</Button>
            </Aux>
        );
    }

}

export default OrderSummary;
import React from 'react';
import {Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography} from '@material-ui/core'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './Cart.css'
import Button from 'react-bootstrap/Button';


export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myCart: this.props.cart,
            currentItem: []
        }
        this.changeQuantity = this.changeQuantity.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }


    changeQuantity(event, item, type) {
        var myCart = this.state.myCart
        myCart.forEach((cartItem) => {
            if (cartItem.id === item.id) {
                if (type === "plus") {
                    cartItem.quantity = parseInt(cartItem.quantity) + 1
                } else {
                    cartItem.quantity = parseInt(cartItem.quantity) - 1
                }
            }
        });
        this.setState({myCart: myCart})
        sessionStorage.setItem('cart', JSON.stringify(this.state.myCart));
    }

    removeItem(item) {
        var myCart = this.state.myCart
        if (myCart.length === 1) {
            sessionStorage.removeItem('cart')
            myCart = []
            this.setState({myCart: myCart})
        } else {
            myCart = myCart.filter(cartItem => cartItem.id !== item.id);
            this.setState({myCart: myCart})
            sessionStorage.setItem('cart', JSON.stringify(myCart));
        }

    }


    render() {

        const {myCart} = this.state;
        let totalPrice = 0;
        let cart = sessionStorage.getItem('cart') != null ? Object.keys(JSON.parse(sessionStorage.getItem('cart'))).length : 0
        return (

            <div className="container" style={{marginTop: 100}}>
                <section>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="mb-3">
                                <div className="pt-4 wish-list">

                                    <h5 className="mb-4">Cart Items : <span>{this.state.myCart==null?0:this.state.myCart.length}</span></h5>

                                    {myCart != null ?
                                        this.state.myCart.map((item, index) => {
                                            return (
                                                <div className="row mb-4">
                                                    <div className="col-md-7 col-lg-9 col-xl-9 cardBody">
                                                        <div className="d-flex justify-content-between row">
                                                            <div className="col-md-9 pl-4">
                                                                <h5>{item.name}
                                                                </h5>
                                                                <p className="mb-3 text-muted text-uppercase small">
                                                                    <b>Price : </b> {"₹" + item.price}
                                                                </p>
                                                                <p className="mb-2 text-muted text-uppercase small">
                                                                    <b>Size : </b> {item.size}
                                                                </p>
                                                                <p className="mb-3 text-muted text-uppercase small">
                                                                    <b>Toppings : </b>{item.toppings.map((tops) => {
                                                                    return (tops.name + ', ');
                                                                })}
                                                                </p>
                                                            </div>
                                                            <div className="col-md-3 align-content-center">
                                                                <div style={{minWidth: '9rem'}}
                                                                     className="def-number-input number-input safari_only mb-0 w-100">
                                                                    <button className="btnPlus plus"
                                                                            onClick={(event) => this.changeQuantity(event, item, "plus")}
                                                                            disabled={item.quantity >= 10}>+
                                                                    </button>
                                                                    <input className="quantity" min="1"
                                                                           name="quantity"
                                                                           disabled
                                                                           max="10"
                                                                           value={item.quantity}
                                                                           onChange={(event) => this.changeQuantity(event, item)}
                                                                           type="number"/>
                                                                    <button className="btnMinus minus"
                                                                            onClick={(event) => this.changeQuantity(event, item, "minus")}
                                                                            disabled={item.quantity <= 1}>-
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="d-flex justify-content-between align-items-center ml-1">
                                                            <div>
                                                                {item.isVeg ?
                                                                    <img
                                                                        src="https://img.icons8.com/color/24/000000/vegetarian-food-symbol.png"/> :
                                                                    <img
                                                                        src="https://img.icons8.com/color/24/000000/non-vegetarian-food-symbol.png"/>}

                                                                <a onClick={() => this.removeItem(item)} href="#!"
                                                                   type="button"
                                                                   className="card-link-secondary small text-uppercase ml-4 mr-3">
                                                                    <i className="fas fa-trash-alt mr-1"/> Remove
                                                                    item </a>

                                                            </div>
                                                            <div>
                                                                <p className="mb-0"><span>
                                                                    {"(₹" + item.price + " * " + item.quantity + ") = "}
                                                                    <strong
                                                                        id="summary">{"₹" + (item.price * item.quantity)}</strong></span>
                                                                </p>
                                                                <p hidden={true}>{totalPrice = totalPrice + (item.price * item.quantity)}</p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            )
                                        }) : <p>Please add some pizzas from menu</p>
                                    }
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="pt-4">
                                    <h5 className="mb-4">Expected delivery time - 30 mins</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="mb-3">
                                <div className="pt-4">
                                    <h5 className="mb-3">Billing</h5>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                            Total amount
                                            <span>{"₹" + totalPrice}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                            Taxes(5%)
                                            <span>{"₹" + Math.round(totalPrice * 0.05)}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                            <div>
                                                <strong>Grand Total</strong>
                                            </div>
                                            <span><strong>{"₹" + Math.round(totalPrice + (totalPrice * 0.05))}</strong></span>
                                        </li>
                                    </ul>

                                    <button type="button" className="btn btn-primary btn-block">Place Order</button>

                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="pt-4">

                                    <a className="dark-grey-text d-flex justify-content-between" data-toggle="collapse"
                                       href="#collapseExample"
                                       aria-expanded="false" aria-controls="collapseExample">
                                        Add a discount code (optional)
                                        <span><i className="fas fa-chevron-down pt-1"/></span>
                                    </a>

                                    <div className="collapse" id="collapseExample">
                                        <div className="mt-3">
                                            <div className="md-form md-outline mb-0">
                                                <input type="text" id="discount-code"
                                                       className="form-control font-weight-light"
                                                       placeholder="Enter discount code"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </section>

            </div>
        );
    }

}

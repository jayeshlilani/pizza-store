import React from 'react';
import { Card,CardHeader,CardMedia,CardContent,CardActions,IconButton,Typography } from '@material-ui/core'
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


    changeQuantity(event, item) {
        var myCart = this.state.myCart
        myCart.forEach((cartItem) => {
            if (cartItem.id === item.id) {
                cartItem.quantity = event.target.value
            }
        });
        this.setState({myCart: myCart})
        sessionStorage.setItem('cart', JSON.stringify(this.state.myCart));
    }

    removeItem(item) {
        console.log(item)
        var myCart = this.state.myCart

        if (myCart.length === 1) {
            sessionStorage.removeItem('cart')
            myCart = []
            this.setState({myCart: myCart})
        } else {
            myCart = myCart.filter(cartItem => cartItem.id !== item.id);
            console.log(myCart)
            this.setState({myCart: myCart})
            sessionStorage.setItem('cart', JSON.stringify(this.state.myCart));

        }

    }


    render() {

        const {myCart, options, sortOptions, selectedValue, data, customPopup, currentItem} = this.state;
        let totalPrice = 0;
        return (
            <div className="container" style={{marginTop: 100}}>

                {myCart != null ?
                    this.state.myCart.map((item, index) => {
                            return (
                                <div className="row" key={item.id}>
                                    <div className="col-md-9 col-sm-9 mb-4">
                                        <Card className="root">
                                            <CardHeader

                                                action={
                                                    <IconButton aria-label="settings">
                                                        {"₹" + item.price} * &nbsp;
                                                        <input type="number" min={1} max={10} step={1} value={item.quantity}
                                                               className="quantity"
                                                               onChange={(event) => this.changeQuantity(event, item)}/>
                                                    </IconButton>
                                                }
                                                title={item.name}
                                                titleTypographyProps={{variant: 'h4'}}
                                            />
                                            <CardActions>
                                                <IconButton aria-label="share" style={{fontSize: 12}}>
                                                    {item.isVeg ?
                                                        <img
                                                            src="https://img.icons8.com/color/24/000000/vegetarian-food-symbol.png"/> :
                                                        <img
                                                            src="https://img.icons8.com/color/24/000000/non-vegetarian-food-symbol.png"/>}
                                                </IconButton>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    <b>Size : </b>{item.size}
                                                </Typography>&nbsp;
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    <b>Toppings: </b>{item.toppings.map((tops) => {
                                                    return (tops.name + ' ');
                                                })}
                                                </Typography>
                                                <Button variant="primary" onClick={() => this.removeItem(item)}
                                                        style={{marginLeft: 'auto'}}>
                                                    Remove
                                                </Button>
                                            </CardActions>
                                        </Card>

                                    </div>

                                    <div className="col-md-3 col-sm-3 mb-4 align-items-center">
                                        <h3>{"₹" + (item.price * item.quantity)}</h3>
                                        <p hidden={true}>{totalPrice = totalPrice + (item.price * item.quantity)}</p>
                                    </div>
                                    <div className="col-md-9 col-sm-9 mb-4 align-items-center"
                                         hidden={(this.state.myCart.length - 1) != index}>
                                        <h2>Total</h2>
                                    </div>
                                    <div className="col-md-3 col-sm-3 mb-4 align-items-center"
                                         hidden={(this.state.myCart.length - 1) != index}>
                                        <h2>{"₹" + totalPrice}</h2>
                                    </div>
                                </div>
                            )
                        }
                    )
                    :
                    "No items in cart"}
            </div>
        );
    }

}

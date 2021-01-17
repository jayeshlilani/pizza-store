import './App.css';
import * as React from "react";
import FoodCard from "./FoodCard";
import Cart from "./Cart";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            cartItems: sessionStorage.getItem('cart') != null ? Object.keys(JSON.parse(sessionStorage.getItem('cart'))).length : ''
        };
        this.switchPage = this.switchPage.bind(this)
    }

    componentDidMount() {
        fetch("https://run.mocky.io/v3/ec196a02-aaf4-4c91-8f54-21e72f241b68")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result,
                        currentPage: 'home'
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    switchPage(page) {
        console.log(page)
        this.setState({currentPage: page})
        console.log(JSON.parse(sessionStorage.getItem('cart')))
    }

    render() {
        let cart = sessionStorage.getItem('cart') != null ? Object.keys(JSON.parse(sessionStorage.getItem('cart'))).length : ''
        const {error, isLoaded, data} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <nav className="navbar fixed-top navbar-expand-lg navbar-light white scrolling-navbar">
                        <div className="container">

                            <a className="navbar-brand waves-effect" target="_blank">
                                <strong className="blue-text">J's PIZZA</strong>
                            </a>

                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarSupportedContent"
                                    aria-controls="navbarSupportedContent" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"/>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">

                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active">
                                        <button className="nav-link waves-effect"
                                                onClick={() => this.switchPage("home")}
                                                style={{background: 'none', border: 'none'}}>Home
                                            <span className="sr-only">(current)</span>
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link waves-effect"
                                           target="_blank">About Us</a>
                                    </li>
                                </ul>

                                <ul className="navbar-nav nav-flex-icons">
                                    <li className="nav-item">
                                        <button className="nav-link waves-effect"
                                                onClick={() => this.switchPage("cart")}
                                                style={{background: 'none', border: 'none'}}>
                                            {sessionStorage.getItem('cart') == null ? console.log() :
                                                <span
                                                    className="badge red z-depth-1 mr-1"> {cart} </span>
                                            }
                                            <i className="fas fa-shopping-cart"/>
                                            <span className="clearfix d-none d-sm-inline-block"> Cart </span>
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <a href="https://www.facebook.com/mdbootstrap" className="nav-link waves-effect"
                                           target="_blank">
                                            <i className="fab fa-facebook-f"/>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="https://twitter.com/MDBootstrap" className="nav-link waves-effect"
                                           target="_blank">
                                            <i className="fab fa-twitter"/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    {this.state.currentPage === 'home' ?
                        <div hidden={this.state.currentPage === 'cart'}>
                            {
                                <FoodCard foodMenu={data}/>
                            }
                        </div> :
                        <div hidden={this.state.currentPage === 'home'}>
                            {
                                <Cart cart={JSON.parse(sessionStorage.getItem('cart'))}/>
                            }
                        </div>}
                </div>
            );
        }
    }
}

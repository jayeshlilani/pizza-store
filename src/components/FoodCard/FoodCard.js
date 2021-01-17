import React from 'react';
import {Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography} from '@material-ui/core'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './FoodCard.css'
import {Multiselect} from 'multiselect-react-dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'


export default class FoodCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foodMenu: this.props.foodMenu,
            foodMenuOriginal: this.props.foodMenu,
            options: [{name: 'Veg', id: 1}, {name: 'NonVeg', id: 2}],
            sortOptions: [{name: 'Price', id: 1}, {name: 'Rating', id: 2}],
            selectedValue: 'none',
            sortByValue: 'none',
            selectedSize: 'none',
            selectedToppings: [],
            quantity: 1,
            customPopup: false,
            currentItem: [],
            myCart: sessionStorage.getItem('cart') != null ? JSON.parse(sessionStorage.getItem('cart')) : []
        }
        this.onSelectFilter = this.onSelectFilter.bind(this);
        this.onRemoveFilter = this.onRemoveFilter.bind(this);
        this.onSelectSort = this.onSelectSort.bind(this);
        this.onRemoveSort = this.onRemoveSort.bind(this);
        this.onSelectSize = this.onSelectSize.bind(this);
        this.onRemoveSize = this.onRemoveSize.bind(this);
        this.onSelectToppings = this.onSelectToppings.bind(this);
        this.onRemoveToppings = this.onRemoveToppings.bind(this);
        this.changeQuantity = this.changeQuantity.bind(this);
        this.AddToCart = this.AddToCart.bind(this);

    }

    componentDidMount() {
    }

    onSelectFilter(selectedList, selectedItem) {
        this.setState({selectedValue: selectedItem.name})
    }

    onRemoveFilter(selectedList, removedItem) {
        this.setState({selectedValue: 'none'})
    }

    onSelectSort(selectedList, selectedItem) {
        this.setState({sortByValue: selectedItem.name})
        this.sortArray(selectedItem.name)
    }

    onRemoveSort(selectedList, removedItem) {
        this.sortArray('id')
        this.setState({sortByValue: 'none'})
    }

    sortArray(sortProperty) {
        sortProperty = sortProperty.toLowerCase()
        this.state.foodMenu.sort(function (a, b) {
            return parseInt(b[sortProperty]) - parseInt(a[sortProperty])
        });
        if (sortProperty === 'id' || sortProperty === 'price')
            this.state.foodMenu.reverse()
    };

    onSelectSize(selectedList, selectedItem) {
        this.setState({selectedSize: selectedItem.size})
    }

    onRemoveSize(selectedList, removedItem) {
        this.setState({selectedSize: 'none'})
    }

    onSelectToppings(selectedList, selectedItem) {
        this.setState({selectedToppings: selectedList})
    }

    onRemoveToppings(selectedList, removedItem) {
        this.setState({selectedToppings: []})
    }

    changeQuantity(type) {
        let quantity = this.state.quantity
        if (type === "plus") {
            quantity = parseInt(quantity) + 1
        } else {
            quantity = parseInt(quantity) - 1
        }
        this.setState({quantity: quantity})
    }


    AddToCart(item) {
        const myItem = {
            id: item.id,
            name: item.name,
            price: item.price,
            description: item.description,
            isVeg: item.isVeg,
            size: this.state.selectedSize,
            toppings: this.state.selectedToppings.length < 1 ? [{name: 'none'}] : this.state.selectedToppings,
            quantity: this.state.quantity
        }
        let cart = this.state.myCart
        cart.push(myItem)
        this.setState({myCart: cart, customPopup: false})
        sessionStorage.setItem('cart', JSON.stringify(this.state.myCart));
        this.props.action()
    }

    render() {

        const {foodMenu, options, sortOptions, selectedValue, data, customPopup, currentItem} = this.state;
        const handleShow = (item) => {
            this.setState({quantity: 1, currentItem: item, customPopup: true})
        }
        const handleClose = () => this.setState({customPopup: false})
        return (
            <div className="container" style={{marginTop: 80}}>
                <div className="row mb-3">
                    <div className="col-md-6 mt-2">
                        <Multiselect
                            id={"filterId"}
                            showCheckbox={true}
                            selectionLimit={1}
                            placeholder={"Filter by "}
                            avoidHighlightFirstOption={true}
                            options={options} // Options to display in the dropdown
                            onSelect={this.onSelectFilter} // Function will trigger on select event
                            onRemove={this.onRemoveFilter} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                        />
                    </div>
                    <div className="col-md-6 mt-2">
                        <Multiselect
                            id={"sortId"}
                            showCheckbox={true}
                            selectionLimit={1}
                            placeholder={"Sort by "}
                            avoidHighlightFirstOption={true}
                            options={sortOptions} // Options to display in the dropdown
                            onSelect={this.onSelectSort} // Function will trigger on select event
                            onRemove={this.onRemoveSort} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                        />
                    </div>

                </div>
                <div className="row">
                    {this.state.foodMenu.map((item, index) => {
                        if ((selectedValue === "none") || (item.isVeg && selectedValue === "Veg") || ((!item.isVeg) && selectedValue == "NonVeg")) {
                            return (
                                <div className="col-md-3 mb-4" key={item.id}>
                                    <Card className="root">
                                        <CardHeader
                                            action={
                                                <IconButton aria-label="settings">
                                                    {/*<MoreVertIcon/>*/}
                                                </IconButton>
                                            }
                                            title={item.name}
                                            titleTypographyProps={{variant: 'h7'}}
                                            subheader={"₹" + item.price}
                                        />
                                        <CardMedia
                                            className="media"
                                            image={item.img_url}
                                            title={item.name}
                                        />
                                        <CardContent style={{height: 60}}>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {item.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions disableSpacing>
                                            <IconButton>
                                                <span aria-label="add to favorites" style={{fontSize: 14}}>
                                                    {item.rating}
                                                    <i className="fa fa-star ml-1" style={{color: '#FFD700'}}></i>
                                                </span>
                                            </IconButton>
                                            <IconButton aria-label="share" style={{fontSize: 12}}>
                                                {item.isVeg ?
                                                    <img
                                                        src="https://img.icons8.com/color/24/000000/vegetarian-food-symbol.png"/> :
                                                    <img
                                                        src="https://img.icons8.com/color/24/000000/non-vegetarian-food-symbol.png"/>}
                                            </IconButton>
                                            <Button variant="primary" onClick={() => handleShow(item)}
                                                    style={{marginLeft: 'auto'}}>
                                                Add
                                            </Button>
                                            <Modal
                                                show={customPopup} onHide={handleClose}
                                                size="lg"
                                                aria-labelledby="contained-modal-title-vcenter"
                                                centered
                                            >
                                                <Modal.Header closeButton>
                                                    <Modal.Title id="contained-modal-title-vcenter">
                                                        Customize your Pizza
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <div className="row">
                                                        <div className="col-md-4 mt-2">
                                                            <Multiselect
                                                                id={item.id + "1"}
                                                                showCheckbox={true}
                                                                selectionLimit={1}
                                                                placeholder={item.size[0].title}
                                                                avoidHighlightFirstOption={true}
                                                                options={item.size[0].items} // Options to display in the dropdown
                                                                onSelect={this.onSelectSize} // Function will trigger on select event
                                                                onRemove={this.onRemoveSize} // Function will trigger on remove event
                                                                displayValue="size" // Property name to display in the dropdown options
                                                            />
                                                        </div>
                                                        <div className="col-md-6 mt-2">
                                                            <Multiselect
                                                                id={item.id + "2"}
                                                                style={{marginTop: 10}}
                                                                showCheckbox={true}
                                                                placeholder={item.toppings[0].title}
                                                                avoidHighlightFirstOption={true}
                                                                options={item.toppings[0].items} // Options to display in the dropdown
                                                                onSelect={this.onSelectToppings} // Function will trigger on select event
                                                                onRemove={this.onRemoveToppings} // Function will trigger on remove event
                                                                displayValue="name" // Property name to display in the dropdown options
                                                            />
                                                        </div>
                                                        <div className="col-md-2">
                                                            <div style={{minWidth: '9rem'}}
                                                                 className="def-number-input number-input safari_only mb-0 w-100">
                                                                <button className="btnPlus plus"
                                                                        onClick={(event) => this.changeQuantity("plus")}
                                                                        disabled={this.state.quantity >= 10}>+
                                                                </button>
                                                                <input className="quantity" min="1"
                                                                       name="quantity"
                                                                       disabled
                                                                       max="10"
                                                                       value={this.state.quantity}
                                                                       type="number"/>
                                                                <button className="btnMinus minus"
                                                                        onClick={(event) => this.changeQuantity("minus")}
                                                                        disabled={this.state.quantity <= 1}>-
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleClose}>
                                                        Close
                                                    </Button>
                                                    <Button variant="primary"
                                                            disabled={this.state.selectedSize === 'none'}
                                                            onClick={() => this.AddToCart(currentItem)}>
                                                        Add to Cart
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </CardActions>
                                    </Card>
                                </div>

                            )
                        }

                    })}
                </div>
            </div>
        );

    }

}

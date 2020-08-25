/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import formatCurrency from '../util'
import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'
import Modal from 'react-modal'

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null
        };
    }

    openModal = (product) => {
        this.setState({ product })
        console.log(this.state)
    }

    closeModal = () => {
        this.setState({ product: null })
    }

    render() {

        const { product } = this.state;
        return (
            <div>
                <Fade bottom cascade>
                    <ul className="products">
                        {this.props.products.map(product => (
                            <li key={product._id}>
                                <div className="product">
                                    <a href={"#" + product._id} onClick={() => this.openModal(product)}>
                                        <img src={product.image} alt={product.title}></img>
                                        <p>
                                            {product.title}
                                        </p>
                                    </a>
                                    <div className="product-price">
                                        <div>
                                            {formatCurrency(product.price)}
                                        </div>
                                        <button className="button primary" onClick={() => this.props.addToCart(product)}>
                                            Add to Cart
                                    </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Fade>
                { product && (<Modal isOpen={true} onRequestClose={this.closeModal}>
                    <Zoom>
                        <button className="close-modal" onClick={this.closeModal}>X</button>
                        <div className="product-detail">
                            <img src={product.image} alt={product.title}/>
                            <div className="product-detail-description">
                                <p>
                                    <strong>
                                        {product.title}
                                    </strong>
                                </p>
                                <p>
                                    {product.description}
                                </p>
                                <p>
                                    Available Sizes: 
                                    {product.availableSizes.map( item => (
                                        <span>{" "}<button className="button">{item}</button></span>
                                    ))}
                                </p>
                                <div className="product-price">
                                    <div>
                                        {formatCurrency(product.price)}
                                    </div>
                                    <button className="button primary" onClick={() => {
                                        this.props.addToCart(product);
                                        this.closeModal();
                                    }}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </Zoom>    
                </Modal>)}
            </div>
        )
    }
}

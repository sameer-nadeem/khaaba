import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addToCart } from '../../../actions/customer'

const DishCard = ({ khaaba, addToCart }) => {

    const [counter, setCounter] = useState(1)

    const incrementCounter = () => {
        if (khaaba.instantKhaaba.isInstant) {
            if (counter >= khaaba.instantKhaaba.availableServings) return
        }
        setCounter(counter + 1)
    }
    const decrementCounter = () => counter > 1 && setCounter(counter - 1)

    const onAddCart = () => addToCart(
        khaaba.kitchen, khaaba._id, counter, khaaba.price, khaaba.title
    )

    const [disables, setDisabled] = useState(false)

    return (
        <div className="card dish-card">
            <div className="image-container">
                <img className="dish-image" src={
                    khaaba.thumbnail ? `/uploads/dish-logos/${khaaba.thumbnail}` : '/img/icons/white.png'
                } alt="Dish preview" />
            </div>

            <div className="row align-items-end  justify-content-center" style={{ height: "80px" }}>
                {
                    khaaba.instantKhaaba.isInstant && <div className="instant-khaaba-tag ">instant khaaba</div>
                }
                {
                    khaaba.instantKhaaba.isInstant && <div className="available-serving">  available servings: {khaaba.instantKhaaba.availableServings}</div>
                }
                <div className="row justify-content-between">
                    <div className="col dishname" >{khaaba.title}</div>
                    <div className="col text-end price" > Rs {khaaba.price}</div>
                </div>
                {/* <div className="row justify-content-between">
                    <div className="col dish-description">{khaaba.description}</div>
                </div> */}
            </div>
            <div className="row justify-content-start">
                <div className="row justify-content-between">
                    <div className="col dishname">
                        {
                            khaaba.instantKhaaba.isInstant && khaaba.instantKhaaba.availableServings ?
                                <button onClick={onAddCart} className=" add-to-cart-btn ">Add to cart</button>
                                :
                                <button disabled onClick={onAddCart} className=" add-to-cart-btn ">Add to cart</button>

                        }
                    </div>
                    <div className="col-2 text-end price dish-count" >
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" onClick={incrementCounter} className="counter-button-left px-1">+</button>
                            <button type="button" className="number-box px-1">{counter}</button>
                            <button type="button" onClick={decrementCounter} className="counter-button-right px-1">-</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(null, { addToCart })(DishCard)

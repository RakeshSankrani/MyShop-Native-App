import React from 'react'
import { StyleSheet } from 'react-native'

const DiscountedPrice = ({price, discount}) => {
    let newPrice = price - (price * (Math.round(discount) / 100))
    return `₹${Math.round(newPrice)}`
}

export default DiscountedPrice
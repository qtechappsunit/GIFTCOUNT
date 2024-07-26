import { ActivityIndicator, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'

interface LoaderProps {
    size: number
    color: string
    style: ViewStyle
}

const Loader = (props: LoaderProps) => {
    return (
        <ActivityIndicator
            size={props.size}
            color={props.color}
            style={[styles.loaderStyle, props.style]}

        />
    )
}

export default Loader

const styles = StyleSheet.create({
    loaderStyle: {
        alignSelf: 'center',
    }
})
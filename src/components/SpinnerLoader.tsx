import { StyleSheet } from 'react-native'
import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import themes from '../assets/themes'

const SpinnerLoader = ({ visible }) => {
    return (
        <Spinner
            visible={visible}
            color={themes.white}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
        />
    )
}

export default SpinnerLoader

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: themes.white
    }

})
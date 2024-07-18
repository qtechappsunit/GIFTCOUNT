import { StyleSheet, View } from 'react-native'
import React from 'react'
import themes from '../assets/themes'

const Wrapper = ({children}) => {
  return (
    <View style={styles.background}>
        {children}
    </View>
  )
}

export default Wrapper

const styles = StyleSheet.create({
    background:{
        flex: 1,
        backgroundColor: themes.secondary
    }
})
import {StyleSheet, Text, View, Modal} from 'react-native';
import React from 'react';

const RedirectingModal = ({visible, onRequestClose}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Hello World!</Text>
        </View>
      </View>
    </Modal>
  );
};

export default RedirectingModal;

const styles = StyleSheet.create({});

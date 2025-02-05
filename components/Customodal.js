import React, { useState } from 'react'
import { Modal, Text, Pressable, View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import ImageRow from './ImageRow'

export default function CustomModal(props) {

  const [selectedImage, setSelectedImage] = useState('')


  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(!props.modalVisible)
      }}>
      <View style={styles.fullscreenContainer}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.textStyle}>{props.modalText}</Text>

            {props.stationData.presets &&
              <FlatList
                style={styles.list}
                data={props.stationData.presets}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                  <ImageRow
                    img={item.imageUrl}
                    presentationName={item.presentationName}
                    resolution={item.resolution}
                    onPress={() => setSelectedImage(item.imageUrl)}
                  />}
              />
            }
            <Pressable
              style={styles.button}
              onPress={() => { props.setModalVisible(!props.modalVisible) }}>
              <Text style={styles.textStyle}>Sulje</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>

  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 35,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    borderRadius: 6,
    margin: 6,
    padding: 16,
    color: 'white',
    backgroundColor: 'blue'
  },
  textStyle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fullscreenContainer: {
    flex: 1,
    justifyContent: 'flex-start', // Start at the top of the screen
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  tapToClose: {
    color: 'white',
    fontSize: 16,
    position: 'absolute',
    bottom: 20,
  },
});
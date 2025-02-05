import React, { useEffect } from 'react'
import { View, Image, Text, StyleSheet, useWindowDimensions } from 'react-native'

export default function ImageRow(props) {

    const { width } = useWindowDimensions()
    const imgWidth = props.resolution?.width || 1280
    const imgHeight = props.resolution?.height || 720
    const aspectRatio = imgWidth / imgHeight

    return (

        <View>
            <Text style={styles.text}>{props.presentationName}</Text>
            <Image
                source={{ uri: props.img }}
                style={{
                    width: width * 0.9,
                    aspectRatio,
                    resizeMode: 'cover',
                }}
            ></Image>
        </View>

    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18
    },

})
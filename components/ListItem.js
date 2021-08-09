import React from 'react'
import {View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    itemContainer: {
      height: 100,
      borderColor: "gray",
      borderWidth: 1,
      width: "100%",
      flexDirection: "row"
    },
    leftContainer:{
      width: 100,
    },
    rightContainer:{
      flex: 1,
      padding: 10,
      justifyContent: "space-between",
    },
    text: {
      fontSize: 15,
    },
    subtText: {
      fontSize: 12,
      color: "gray",
    }
  });
  

export default function ListItem(props) {
    return (
        <TouchableOpacity style={styles.itemContainer} onPress={props.onPress}> 
        <View style={styles.leftContainer}>
          {!!props.imageUrl && (
          <Image style={{width: 100,height: 100}}
                source={{uri:props.imageUrl}}
                />
                )}
        
                </View>
        <View style={styles.rightContainer}>
          <Text numberOfLines={3} style={styles.text}>
              {props.title}
          </Text>
          <Text style={styles.subtText}>{props.author}</Text>
        </View>
      </TouchableOpacity>
    )
}

import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";

const checkIconUri = require('../assets/images/Check.png');

export default class PackageList extends Component {
  state = {
    value: null,
    container: {
        marginTop: 10,
        alignItems: 'center',
        borderColor: '#8C2800', 
        borderWidth: 1,
        borderRadius: 10,
    },
    containerPress: {
        marginTop: 10,
        alignItems: 'center',
        borderColor: '#8C2800', 
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#8C2800',
    },
    summary: {
        marginTop: 10,
        color: 'black',
        fontSize: 19,
        fontWeight: 'bold',
        height: 40,
        justifyContent: 'center',
    },
    summaryPress: {
        marginTop: 10,
        color: 'white',
        fontSize: 19,
        fontWeight: 'bold',
        height: 40,
        justifyContent: 'center',
    },
    priceBox: {
        
        width: '100%',
        height: 40,
        alignItems: 'center',
        backgroundColor: '#8C2800',
        
    },
    priceBoxPress: {
        
        width: '100%',
        height: 40,
        alignItems: 'center',
        backgroundColor: '#F2620F', 
    },
    priceText: {
        marginTop: 5,
        fontSize: 20,
        color: 'white',
        justifyContent: 'center',
    },
    detailsBox: {
        fontSize: 20,
        alignItems: 'flex-start',
    },
    detailsBoxPress: {
        fontSize: 20,
        alignItems: 'flex-start',
        backgroundColor: '#8C2800',
    },

    text: {
        marginTop: 5,
        marginBottom: 5,
    },
    textPress: {
        marginTop: 5,
        marginBottom: 5,
        color: 'white',
    },
  };
  onPressed(item) {
    this.setState({ value: item.id });
    global.package = item;
    console.log(item.price);
  }
  render() {
    const { options } = this.props;
    const { value } = this.state;

    return (
      <View>
        {options.map(item => {
          return (
            <View key={item.id}>
                <TouchableOpacity
                        activeOpacity={1}
                        key = {item.id}
                        style={item.id == value? this.state.containerPress: this.state.container}
                        onPress={() => this.onPressed(item)}
                >
                        
                        <Text style ={item.id == value? this.state.summaryPress: this.state.summary}>
                            الاتصال مباشرة {item.contactCount}  مرشحين
                        </Text>
                        <View style = {item.id == value? this.state.priceBoxPress: this.state.priceBox}>
                            <Text style = {this.state.priceText}>
                                ${item.price}
                            </Text>
                        </View>
                        <View style = {this.state.detailsBox}>
                            <Text style = {item.id == value? this.state.textPress: this.state.text}>
                                الاتصال {item.contactCount} مرشحا مباشرة
                                <Image source={checkIconUri}/>
                            </Text>
                            <Text style = {item.id == value? this.state.textPress: this.state.text}>
                                يمكنك نشر {item.postCount} وظائف.
                                <Image source={checkIconUri}/>
                            </Text>
                            <Text style = {item.id == value? this.state.textPress: this.state.text}>
                            البحث المتقدم عن السير الذاتية
                                <Image source={checkIconUri}/>
                            </Text>
                        </View>
                </TouchableOpacity>  
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';


class Home extends Component {
    state = {
      name: '' 
    }


  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.title}>
          Enter Your Name:
        </Text>
        <TextInput 
          style={styles.nameInput} 
          placeholder='John Snow'
          onChangeText={(name) => this.setState({ name })}
          value={this.state.name}
          />
        <TouchableOpacity onPress={() => {
            Actions.chat({
              name: this.state.name
            })
          }}>
          <Text style={styles.buttonText}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginLeft: 20,
    fontSize:20,
  },
  buttonText: {
    marginLeft: 20,
    fontSize: 20,
  },
  nameInput: {
    padding: 5,
    height: 40,
    borderWidth: 2,
    borderColor: 'black',
    margin: 20
  },
  container: {
    flex: 1,
  },
  label: {
    fontSize: 20,
    marginLeft: 15,
  },
  textInput: {
    height: 40,
    marginLeft: 15,
  }
})

export default Home;
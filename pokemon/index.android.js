/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView
} from 'react-native';

class pokemon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pokemons: [],
      limit: 0,
      set: 0
    }
  }

  fetchPokemons = async() => {
    const url = `http://pokeapi.co/api/v2/pokemon/?limit=${this.state.limit}&offset=${this.state.set}`

    let pokemonList = await fetch(url).then((pokemonList) => pokemonList.json())
    pokemonList = pokemonList.results
    let pokemons = pokemonList.map( (pokemon, index) => {
      return {
        name: pokemon.name,
        pic: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`
      }
    })
    this.setState({pokemons})
  }

  renderPokemonList = () => {
    return this.state.pokemons.map((pokemon, i) => {
      return (
        <View key={i} style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={{borderBottomWidth: 6,borderBottomColor: '#BBB'}}>
            <Image style={styles.logo} source={{ uri: pokemon.pic }}/>
            <Text style={styles.title}>{pokemon.name}</Text>
          </View>
        </View>
      )
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text>limit : </Text>
          <TextInput
            style={{width: 50, textAlign: 'center', backgroundColor: '#DDD', marginLeft: 10, marginRight: 10}}
            onChangeText={limit => this.setState({ limit }) }
            value={`${this.state.limit}`}
          ></TextInput>
          <Text>set : </Text>
          <TextInput
            style={{width: 50, textAlign: 'center', backgroundColor: '#DDD', marginLeft: 10, marginRight: 10}}
            onChangeText={set => this.setState({ set }) }
            value={`${this.state.set}`}
          ></TextInput>
          <TouchableOpacity onPress={this.fetchPokemons}>
            <Text>Go!</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={{ alignSelf: 'stretch', backgroundColor: 'lightblue'}}>
          {this.renderPokemonList() }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button:
    {
      backgroundColor: '#ff5533'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  logo: {
    height: 140,
    width: 150
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  }
});

AppRegistry.registerComponent('pokemon', () => pokemon);

import React, { Component } from 'react';
import { View, Image, Button } from 'react-native';

import { Item } from './../';
import { eyes } from './../../img';

import styles from './styles.js';

class EditContainer extends Component {
  state = {
    items: [],
  }

  addItem = (itemSrc) => {
    this.setState({
      items: [
        ...this.state.items,
        { src: itemSrc },
      ],
    });
  }

  render() {
    const { items } = this.state;

    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.addItem(eyes)}
          title="Add eyes"
        />
        <View style={styles.image}>
          {
            items.length > 0 && items.map((item, index) => (
              <Item
                key={index}
                style={styles.item}
                source={item.src}
              />
            ))
          }
        </View>
      </View>
    );
  }
}

export default EditContainer;

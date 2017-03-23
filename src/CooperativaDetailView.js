import React, { Component } from 'react'
import {
  View,
  Text,
  ListView
} from 'react-native'

export default class CooperativaDetailView extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'Machala', 'Guayaquil', 'Santo Domingo', 'Duran', 'Cuenca', 'Loja', 'Quito', 'Ambato'
      ])
    };
  }

  render () {
    return (
      <View>
        <Text>CooperativaDetailView</Text>
        <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text>{rowData}</Text>}
          />
      </View>
    )
  }
}

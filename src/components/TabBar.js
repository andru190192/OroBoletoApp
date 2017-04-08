import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const TabBar = React.createClass({
  tabIcons: [],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array
  },

  componentDidMount () {
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue)
  },

  setAnimationValue ({ value }) {
    this.tabIcons.forEach((icon, i) => {
      const progress = Math.min(1, Math.abs(value - i))
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress)
        }
      })
    })
  },

  // color between rgb(231,76,60) and rgb(204,204,204)
  iconColor (progress) {
    const red = 231 + (204 - 231) * progress
    const green = 76 + (204 - 76) * progress
    const blue = 60 + (204 - 60) * progress
    return `rgb(${red}, ${green}, ${blue})`
  },

  render () {
    return <View style={[ styles.tabs, this.props.style ]}>
      {this.props.tabs.map((tab, i) => {
        return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
          <Icon
            name={tab}
            size={30}
            color={this.props.activeTab === i ? 'rgb(231,76,60)' : 'rgb(204,204,204)'}
            ref={(icon) => { this.tabIcons[i] = icon }}
          />
        </TouchableOpacity>
      })}
    </View>
  }
})

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)'
  }
})

export default TabBar

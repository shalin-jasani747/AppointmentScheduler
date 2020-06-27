import {isEqual} from 'lodash';
import React, {Component} from 'react';
import {FlatList, Image, View, Text, TouchableOpacity} from 'react-native';
import styles from './Styles/TimelineStyle';

const defaultCircleSize = 16;
const defaultCircleColor = '#007AFF';
const defaultLineWidth = 2;
const defaultLineColor = '#007AFF';
const defaultDotColor = 'white';
const defaultInnerCircle = 'none';

export default class Timeline extends Component {
  constructor(props, context) {
    super(props, context);

    this._renderItem = this._renderItem.bind(this);
    this.renderTime = (this.props.renderTime
      ? this.props.renderTime
      : this._renderTime
    ).bind(this);
    this.renderDetail = (this.props.renderDetail
      ? this.props.renderDetail
      : this._renderDetail
    ).bind(this);
    this.renderCircle = (this.props.renderCircle
      ? this.props.renderCircle
      : this._renderCircle
    ).bind(this);
    this.renderEvent = this._renderEvent.bind(this);

    this.state = {
      data: this.props.data,
      x: 0,
      width: 0,
    };
  }

  updateState(data) {
    this.setState({
      data,
    });
  }

  componentDidUpdate(nextProps) {
    if (!isEqual(this.props.data, nextProps.data)) {
      this.updateState(this.props.data);
    }
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={[styles.listview, this.props.listViewStyle]}
          data={this.props.data}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index + ''}
          {...this.props.options}
        />
      </View>
    );
  }

  _renderItem({item, index}) {
    let content = null;

    switch (this.props.columnFormat) {
      case 'single-column-left':
        content = (
          <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
            {this.renderTime(item, index)}
            {this.renderEvent(item, index)}
            {this.renderCircle(item, index)}
          </View>
        );
        break;
      case 'single-column-right':
        content = (
          <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
            {this.renderEvent(item, index)}
            {this.renderTime(item, index)}
            {this.renderCircle(item, index)}
          </View>
        );
        break;
      case 'two-column':
        content =
          (item.position && item.position == 'right') ||
          (!item.position && index % 2 == 0) ? (
            <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
              {this.renderTime(item, index)}
              {this.renderEvent(item, index)}
              {this.renderCircle(item, index)}
            </View>
          ) : (
            <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
              {this.renderEvent(item, index)}
              {this.renderTime(item, index)}
              {this.renderCircle(item, index)}
            </View>
          );
        break;
    }
    return <View key={index}>{content}</View>;
  }

  _renderTime(rowData, rowID) {
    if (!this.props.showTime) {
      return null;
    }
    var timeWrapper = null;
    switch (this.props.columnFormat) {
      case 'single-column-left':
        timeWrapper = {
          alignItems: 'flex-end',
        };
        break;
      case 'single-column-right':
        timeWrapper = {
          alignItems: 'flex-start',
        };
        break;
      case 'two-column':
        timeWrapper = {
          flex: 1,
          alignItems:
            (rowData.position && rowData.position == 'right') ||
            (!rowData.position && rowID % 2 == 0)
              ? 'flex-end'
              : 'flex-start',
        };
        break;
    }
    return (
      <View style={timeWrapper}>
        <View style={[styles.timeContainer, this.props.timeContainerStyle]}>
          <Text style={[styles.time, this.props.timeStyle]}>
            {rowData.time}
          </Text>
        </View>
      </View>
    );
  }

  _renderEvent(rowData, rowID) {
    const lineWidth = rowData.lineWidth
      ? rowData.lineWidth
      : this.props.lineWidth;
    const isLast = this.props.renderFullLine
      ? !this.props.renderFullLine
      : this.props.data.slice(-1)[0] === rowData;
    const lineColor = isLast
      ? 'rgba(0,0,0,0)'
      : rowData.lineColor
      ? rowData.lineColor
      : this.props.lineColor;
    let opStyle = null;

    switch (this.props.columnFormat) {
      case 'single-column-left':
        opStyle = {
          borderColor: lineColor,
          borderLeftWidth: lineWidth,
          borderRightWidth: 0,
          marginLeft: 20,
          paddingLeft: 20,
        };
        break;
      case 'single-column-right':
        opStyle = {
          borderColor: lineColor,
          borderLeftWidth: 0,
          borderRightWidth: lineWidth,
          marginRight: 20,
          paddingRight: 20,
        };
        break;
      case 'two-column':
        opStyle =
          (rowData.position && rowData.position == 'right') ||
          (!rowData.position && rowID % 2 == 0)
            ? {
                borderColor: lineColor,
                borderLeftWidth: lineWidth,
                borderRightWidth: 0,
                marginLeft: 20,
                paddingLeft: 20,
              }
            : {
                borderColor: lineColor,
                borderLeftWidth: 0,
                borderRightWidth: lineWidth,
                marginRight: 20,
                paddingRight: 20,
              };
        break;
    }

    return (
      <View
        style={[styles.details, opStyle]}
        onLayout={evt => {
          if (!this.state.x && !this.state.width) {
            const {x, width} = evt.nativeEvent.layout;
            this.setState({x, width});
          }
        }}>
        <TouchableOpacity
          disabled={this.props.onEventPress == null}
          style={[this.props.detailContainerStyle, (!rowData.isSlotAvailable) ? styles.occupiedDescriptionStyle : {}]}
          onPress={() =>
            this.props.onEventPress ? this.props.onEventPress(rowData) : null
          }>
          <View style={styles.detail}>{this.renderDetail(rowData, rowID)}</View>
          {this._renderSeparator()}
        </TouchableOpacity>
      </View>
    );
  }

  _renderDetail(rowData, rowID) {
    let title = rowData.description ? (
      <View>
        <Text style={[styles.title, this.props.titleStyle, (!rowData.isSlotAvailable) ? styles.occupiedTextStyle : {}]}>
          {rowData.title}
        </Text>
        <Text style={[styles.description, this.props.descriptionStyle, (!rowData.isSlotAvailable) ? styles.occupiedTextStyle : {}]}>
          {rowData.description}
        </Text>
      </View>
    ) : (
      <Text style={[styles.title, this.props.titleStyle]}>{rowData.title}</Text>
    );
    return <View style={styles.container}>{title}</View>;
  }

  _renderCircle(rowData, rowID) {
    var circleSize = rowData.circleSize
      ? rowData.circleSize
      : this.props.circleSize
      ? this.props.circleSize
      : defaultCircleSize;
    var circleColor = rowData.circleColor
      ? rowData.circleColor
      : this.props.circleColor
      ? this.props.circleColor
      : defaultCircleColor;
    var lineWidth = rowData.lineWidth
      ? rowData.lineWidth
      : this.props.lineWidth
      ? this.props.lineWidth
      : defaultLineWidth;

    var circleStyle = null;

    switch (this.props.columnFormat) {
      case 'single-column-left':
        circleStyle = {
          width: this.state.x ? circleSize : 0,
          height: this.state.x ? circleSize : 0,
          borderRadius: circleSize / 2,
          backgroundColor: circleColor,
          left: this.state.x - circleSize / 2 + (lineWidth + 0.1) / 2,
        };
        break;
      case 'single-column-right':
        circleStyle = {
          width: this.state.width ? circleSize : 0,
          height: this.state.width ? circleSize : 0,
          borderRadius: circleSize / 2,
          backgroundColor: circleColor,
          left: this.state.width - circleSize / 2 - (lineWidth + 0.1) / 2,
        };
        break;
      case 'two-column':
        circleStyle = {
          width: this.state.width ? circleSize : 0,
          height: this.state.width ? circleSize : 0,
          borderRadius: circleSize / 2,
          backgroundColor: circleColor,
          left: this.state.width - circleSize / 2 - (lineWidth + 0.1) / 2,
        };
        break;
    }

    var innerCircle = null;
    switch (this.props.innerCircle) {
      case 'icon':
        let iconSource = rowData.icon ? rowData.icon : this.props.icon;
        let iconStyle = {
          height: circleSize,
          width: circleSize,
        };
        innerCircle = (
          <Image
            source={iconSource}
            style={[iconStyle, this.props.iconStyle]}
          />
        );
        break;
      case 'dot':
        let dotStyle = {
          height: circleSize / 2,
          width: circleSize / 2,
          borderRadius: circleSize / 4,
          backgroundColor: rowData.dotColor
            ? rowData.dotColor
            : this.props.dotColor
            ? this.props.dotColor
            : defaultDotColor,
        };
        innerCircle = <View style={[styles.dot, dotStyle]} />;
        break;
    }
    return (
      <View style={[styles.circle, circleStyle, this.props.circleStyle]}>
        {innerCircle}
      </View>
    );
  }

  _renderSeparator() {
    if (!this.props.separator) {
      return null;
    }
    return <View style={[styles.separator, this.props.separatorStyle]} />;
  }
}

Timeline.defaultProps = {
  circleSize: defaultCircleSize,
  circleColor: defaultCircleColor,
  lineWidth: defaultLineWidth,
  lineColor: defaultLineColor,
  innerCircle: defaultInnerCircle,
  columnFormat: 'single-column-left',
  separator: false,
  showTime: true,
};

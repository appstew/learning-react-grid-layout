import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import './App.css';

const ReactGridLayout = WidthProvider(RGL);

export default class ScaledLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    items: 10,
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: 30,
    // transformScale: 0.5,
    verticalCompact: false
  };

  constructor(props) {
    super(props);

    const layout = this.generateLayout();
    this.state = { layout };
  }

  generateDOM() {
    return _.map(_.range(this.props.items), function(i) {
      return (
        <div key={i+1}>
          <span className="text">{i+1}</span>
        </div>
      );
    });
  }

  generateLayout() {
    const p = this.props;
    return _.map(new Array(p.items), function(item, i) {
      const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString()
      };
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
    console.log(this.state.layout)
    return (
      <div 
      // style={{transform: 'scale(0.5) translate(-50%, -50%)'}}
      >
        <ReactGridLayout
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}
          // allowOverlap={true}
          {...this.props}
        >
          {this.generateDOM()}
        </ReactGridLayout>
      </div>
    );
    
  }
}

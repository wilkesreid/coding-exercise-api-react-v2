import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

class ColumnIcon extends Component {
    render() {
        if (this.props.direction === null) {
            return;
        }

        if (this.props.direction === 'asc') {
            return (
                <Icon name="angle up"></Icon>
            );
        } else {
            return (
                <Icon name="angle down"></Icon>
            );
        }
    }
}

export default ColumnIcon;

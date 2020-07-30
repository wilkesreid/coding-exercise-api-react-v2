import React, { Component } from 'react'
import { Table, Icon } from 'semantic-ui-react'
import _sortBy from 'lodash/sortBy';
import _reverse from 'lodash/reverse';
import CsvImporter from './CsvImporter';
import ColumnIcon from './ColumnIcon';

const sortingMethods = {
    group_name: item => item.group_name.toLowerCase()
};

class GroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            sortColumn: null,
            sortDirection: null,
        };
    }

    async componentDidMount() {
        let resp = await fetch("http://localhost:8000/api/groups");
        let data = await resp.json();
        this.setState({
            data: data.data,
        });
    }

    sortedItems() {
        if (this.state.sortColumn === null) {
            return this.state.data;
        }

        if (this.state.sortDirection === 'asc') {
            return _sortBy(this.state.data, sortingMethods[this.state.sortColumn]);
        }

        return _reverse(_sortBy(this.state.data, sortingMethods[this.state.sortColumn]));
    }

    isSortingBy(column) {
        return this.state.sortColumn === column;
    }

    sortBy(column) {
        if (this.state.sortColumn === column) {
            if (this.state.sortDirection === 'asc') {
                this.setState({
                    sortDirection: 'desc'
                });
            } else {
                this.setState({
                    sortColumn: null,
                    sortDirection: null
                });
            }
        } else {
            this.setState({
                sortColumn: column,
                sortDirection: 'asc'
            });
        }
    }

    render() {
        let items = this.sortedItems();

        return (
            <div>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell onClick={() => this.sortBy('group_name')} style={{cursor: 'pointer'}}>
                            Group Name
                            {this.isSortingBy('group_name') && <ColumnIcon direction={this.state.sortDirection} />}
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        items.map(({id, group_name}) => (
                            <Table.Row key={id}>
                                <Table.Cell>{ group_name }</Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
            <CsvImporter
                model="groups"
                finished={() => {
                    fetch("http://localhost:8000/api/groups")
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data);
                        this.setState({
                            data: data.data,
                        });
                    });
                }}
                error={(err) => {
                    console.log('error', err);
                }}
            />
            </div>
        );
    }
}

export default GroupList;

import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

class GroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }

    async componentDidMount() {
        let resp = await fetch("http://localhost:8000/api/groups");
        let data = await resp.json();
        this.setState({
            items: data.data,
        });
    }

    render() {
        let items = this.state.items;

        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Group Name</Table.HeaderCell>
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
        );
    }
}

export default GroupList;

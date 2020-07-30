import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import _sortBy from 'lodash/sortBy';
import _reverse from 'lodash/reverse';
import CsvImporter from "./CsvImporter";
import ColumnIcon from './ColumnIcon';

const sortingMethods = {
  first_name: item => item.first_name.toLowerCase(),
  last_name: item => item.last_name.toLowerCase(),
  email_address: item => item.email_address.toLowerCase(),
  status: item => item.status.toLowerCase()
};

class ResultsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          sortColumn: null,
          sortDirection: null,
        };
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/people")
          .then(response => response.json())
          .then(data => this.setState({ data: data.data }));
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
        var data = this.sortedItems();

        return (
          <div>
            <Table celled padded>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell singleLine onClick={() => this.sortBy('first_name')} style={{cursor: 'pointer'}}>
                    First Name
                    {this.isSortingBy('first_name') && <ColumnIcon direction={this.state.sortDirection} style={{cursor: 'pointer'}} />}
                  </Table.HeaderCell>
                  <Table.HeaderCell onClick={() => this.sortBy('last_name')}>
                    Last Name
                    {this.isSortingBy('last_name') && <ColumnIcon direction={this.state.sortDirection} style={{cursor: 'pointer'}} />}
                  </Table.HeaderCell>
                  <Table.HeaderCell onClick={() => this.sortBy('email_address')}>
                    Email
                    {this.isSortingBy('email_address') && <ColumnIcon direction={this.state.sortDirection} style={{cursor: 'pointer'}} />}
                  </Table.HeaderCell>
                  <Table.HeaderCell onClick={() => this.sortBy('status')}>
                    Status
                    {this.isSortingBy('status') && <ColumnIcon direction={this.state.sortDirection} style={{cursor: 'pointer'}} />}
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>

              {
                  data.map((person, index) => {
                      return (
                          <Table.Row key={index}>
                              <Table.Cell singleLine>{ person.first_name }</Table.Cell>
                              <Table.Cell singleLine>{ person.last_name }</Table.Cell>
                              <Table.Cell singleLine>{ person.email_address }</Table.Cell>
                              <Table.Cell singleLine>{ person.status }</Table.Cell>
                          </Table.Row>
                      );
                    })
              }

              </Table.Body>
            </Table>
            <CsvImporter
              model="people" 
              finished={() => {
                fetch("http://localhost:8000/api/people")
                  .then(resp => resp.json())
                  .then(data => {
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

export default ResultsList

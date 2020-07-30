import React, { Component } from "react";
import { Button } from "semantic-ui-react";

/**
 * Props:
 * 
 * finished: callback if import succeeds, passes server response as argument
 * error: callback if import fails, passes server error as argument
 */
class CsvImporter extends Component {
    constructor(props) {
        super(props);

        this.inputElement = React.createRef();
        this.clickInputElement = this.clickInputElement.bind(this);
        this.fileChosen = this.fileChosen.bind(this);

        this.model = props.model;
        
        this.state = {
            loading: false,
            error: null,
        };
    }

    clickInputElement() {
        this.inputElement.current.click();
    }
    
    startLoading() {
        this.setState({
            loading: true,
        });
    }

    stopLoading() {
        this.setState({
            loading: false,
        });
    }

    hasError() {
        return this.state.error !== null;
    }

    resetErrorState() {
        this.setState({
            error: null
        });
    }

    fileChosen() {
        this.resetErrorState();
        
        const files = this.inputElement.current.files;
        const formData = new FormData();
        formData.append('csv', files[0]);

        this.startLoading();

        fetch(`http://localhost:8000/api/${this.model}/batch`, {
            method: 'POST',
            body: formData
        })
            .then(resp => {
                if (!resp.ok) {
                    resp.text()
                    .then(text => {
                        this.props.error(text);
                        this.stopLoading();
                        this.setState({ error: text });
                    });
                    return;
                }

                this.stopLoading();
                
                this.props.finished(resp);
            })
            .catch(err => {
                this.props.error(err);
            });

        this.inputElement.current.value = '';
    }

    render() {
        return (
            <div className="csv-importer-container">
                <Button primary onClick={this.clickInputElement}>
                    {this.state.loading && <i className="notched circle loading icon"></i>}
                    <span>Import CSV</span>
                </Button>
                <input type="file" name="csv" hidden ref={this.inputElement} onChange={this.fileChosen} />
                {this.hasError() && <div
                    className="csv-importer-message-container"
                    style={{
                        backgroundColor: '#ffbaba',
                        margin: '5px 0',
                        padding: '5px 15px'
                    }}
                >
                    {this.state.error}
                </div>}
            </div>
        );
    }
}

export default CsvImporter;

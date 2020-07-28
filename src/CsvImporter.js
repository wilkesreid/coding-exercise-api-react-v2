import React, { Component } from "react";
import { Button, Loader, Dimmer } from "semantic-ui-react";

class CsvImporter extends Component {
    constructor(props) {
        super(props);

        this.inputElement = React.createRef();
        this.clickInputElement = this.clickInputElement.bind(this);
        this.fileChosen = this.fileChosen.bind(this);
        
        this.state = {
            loading: false,
        };
    }

    clickInputElement() {
        this.inputElement.current.click();
    }

    fileChosen() {
        const files = this.inputElement.current.files;
        console.log(files);
        const formData = new FormData();
        formData.append('csv', files[0]);

        this.setState({
            loading: true,
        });

        fetch("http://localhost:8000/api/people/batch", {
            method: 'POST',
            body: formData
        })
            .then(resp => {
                this.setState({
                    loading: false,
                });
                
                this.props.finished();
            });
    }

    render() {
        return (
            <div className="csv-importer-container">
                <Button primary onClick={this.clickInputElement}>Import CSV</Button>
                <Dimmer active={this.state.loading}>
                    <Loader indeterminate />
                </Dimmer>
                <input type="file" name="csv" hidden ref={this.inputElement} onChange={this.fileChosen} />
            </div>
        );
    }
}

export default CsvImporter;

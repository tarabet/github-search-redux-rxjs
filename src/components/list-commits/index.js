import React, { Component } from 'react';
import {
    Grid,
    Row,
    Col,
} from "react-bootstrap";

export class ListCommits extends Component {
    constructor(props) {
        super(props);
        this.repoName = this.props.match.params.repoName;

        this.searchUser = this.searchUser.bind(this);
    }

    searchUser(query) {
        this.props.fetchUser(query);
    }

    render() {
        return (
            <Grid>
                <Row className="ListCommitsRow">
                    <Col xs={12} md={8} mdOffset={2}>
                        <h2>Last 10 commits of: {this.repoName}</h2>
                        <p>Some commits here ...</p>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

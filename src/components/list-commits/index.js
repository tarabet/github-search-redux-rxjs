import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    Grid,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    Form,
    FormGroup,
    FormControl,
    Button,
} from "react-bootstrap";

import { fetchCommits, searchCommits } from "../../actions";

class ListCommits extends Component {
    constructor(props) {
        super(props);

        // use refs to avoid state creation
        this.queryField = "";
        this.repoName = this.props.match.params.repoName;
        this.commitsUrl = this.props.location.commitsUrl;

        this.searchCommits = this.searchCommits.bind(this);
    }

    componentWillMount() {
        this.props.fetchCommits(this.commitsUrl);
    }

    generateCommitsList(commits) {
        return (
            <Row className="ListCommitsRow">
                <Col xs={12} md={8} mdOffset={2}>
                    <ListGroup style={{ padding: "5px" }}>
                        {commits.map((item) => (
                            <ListGroupItem
                                key={item.sha}
                            >
                                {item.commit.message}
                            </ListGroupItem>)
                        )}
                    </ListGroup>
                </Col>
            </Row>
        )
    }

    searchCommits() {
        const searchUrl = `https://api.github.com/search/commits?q=${this.queryField.value}`;

        this.props.searchCommits(searchUrl);
    }

    generateCommitsSearch() {
        return (
            <Row className="SearchCommitsRow">
                <Col xs={12} md={8} mdOffset={2}>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalEmail">
                            <Col sm={10}>
                                <FormControl
                                    type="text"
                                    placeholder="Search commit message"
                                    inputRef={el => this.queryField = el}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={10}>
                                <Button
                                    type="button"
                                    onClick={this.searchCommits}
                                >
                                    Search
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        )
    }

    generateCommitsSearchResults(searchResults) {
        return (
            <Row className="ListCommitsSearchRow">
                <Col xs={12} md={8} mdOffset={2}>
                    <ListGroup style={{ padding: "5px" }}>
                        {searchResults.map((item) => (
                            <ListGroupItem
                                key={item.sha}
                            >
                                {item.commit.message}
                            </ListGroupItem>)
                        )}
                    </ListGroup>
                </Col>
            </Row>
        )
    }

    render() {
        const { commits, commitsSearchResults } = this.props;

        return (
            <Grid>
                <Row className="ListCommitsRow">
                    <Col xs={12} md={8} mdOffset={2}>
                        <h2>Last 10 commits of: {this.repoName}</h2>
                    </Col>
                </Row>
                {commits && commits.length > 0 && this.generateCommitsSearch()}
                {commitsSearchResults && commitsSearchResults.length > 0 ?
                    this.generateCommitsSearchResults(commitsSearchResults) :
                    (commits && commits.length > 0 && this.generateCommitsList(commits))}
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    commits: state.commits,
    commitsSearchResults: state.commitsSearchResults,
});

const mapDispatchToProps = (dispatch) => ({
    fetchCommits: bindActionCreators(fetchCommits, dispatch),
    searchCommits: bindActionCreators(searchCommits, dispatch),
});

export const ListCommitsConnected = connect(mapStateToProps, mapDispatchToProps)(ListCommits);

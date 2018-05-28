import React, { Component } from 'react';
import {
    Grid,
    Row,
    Col,
    Image,
} from "react-bootstrap";

import { connect } from "react-redux";
import { fetchUser, fetchRepos } from "./actions";

import "./App.css";

import { SearchForm } from "./components/search-form";
import { ListRepos } from "./components/list-repos";

class App extends Component {
    constructor(props) {
        super(props);

        this.searchUser = this.searchUser.bind(this);
    }

    searchUser(query) {
        this.props.fetchUser(query);
    }

    render() {
        return (
            <Grid>
                <Row className="UserSearchRow">
                    <Col xs={12} md={8} mdOffset={2}>
                        <h2>Github User Search:</h2>
                        <SearchForm
                            searchUser={this.searchUser}
                        />
                        <Image style={{ padding: "10px" }} src={this.props.image} alt="Not Found" width={100} rounded />
                    </Col>
                </Row>
                <Row className="ListReposRow">
                    <Col xs={12} md={8} mdOffset={2}>
                        <ListRepos
                            fetchReposHandler={this.props.fetchRepos}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    image: state.user.avatar_url,
});

const mapDispatchToProps = {
    fetchUser,
    fetchRepos,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);

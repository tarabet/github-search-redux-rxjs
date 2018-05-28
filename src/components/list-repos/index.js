import React from "react";
import { connect } from "react-redux";

import {
    ListGroup,
    ListGroupItem,
    ButtonGroup,
    Button,
} from "react-bootstrap";

// Descructuring
const ListReposComponent = ({ repoLink, fetchReposHandler, repos }) => {

    // arrow function
    const fetchRepos = () => {
        fetchReposHandler(repoLink);
    };

    const generateReposList = () => {
        return (
            <ListGroup style={{ padding: "5px" }}>
                {repos.map((item) => (
                    <ListGroupItem href={item.url + "/commits"} key={item.id}>{item.name}</ListGroupItem>)
                )}
            </ListGroup>
        )
    };

    if (repoLink) {
        return (
            <React.Fragment>
                <ButtonGroup>
                    <Button
                        type="button"
                        bsStyle="primary"
                        onClick={fetchRepos}
                    >
                        Fetch Repositories
                    </Button>
                </ButtonGroup>
                {repos.length > 0 && generateReposList()}
            </React.Fragment>
        );
    }

    return null;
};

const mapStateToProps = (state) => {
    const repoLink = (state.user && state.user.repos_url) || null;

    return ({
        repoLink,
        repos: state.repos,
    });
};

export const ListRepos = connect(mapStateToProps, null)(ListReposComponent);
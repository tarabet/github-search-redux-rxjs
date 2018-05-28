import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import {
    ListGroup,
    ListGroupItem,
    ButtonGroup,
    Button,
} from "react-bootstrap";

// Destructuring
const ListReposComponent = ({ repoLink, fetchReposHandler, history, repos }) => {

    // arrow function
    const fetchRepos = () => {
        fetchReposHandler(repoLink);
    };

    //ES6 Template string
    const goToCommitsPage = (repoName) => {
        history.push(`/commits/${repoName}`);
    };

    const generateReposList = () => {
        return (
            <ListGroup style={{ padding: "5px" }}>
                {repos.map((item) => (
                    <ListGroupItem onClick={() => goToCommitsPage(item.name)} key={item.id}>{item.name}</ListGroupItem>)
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

// TODO: Not sure this is the best solution to use withRouter here ... needs consideration
export const ListRepos = withRouter(connect(mapStateToProps, null)(ListReposComponent));
import React from "react";
import {
    Form,
    Col,
    FormGroup,
    Button,
    FormControl,
} from "react-bootstrap";

// Destructuring function args
export const SearchForm = ({searchUser}) => {
    // use refs to avoid state creation
    let queryField;

    const onSubmit = (e) => {
        e.preventDefault();
        searchUser(queryField.value);
    };

    return (
        <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
                <Col sm={10}>
                    <FormControl
                        type="text"
                        placeholder="Github Username"
                        inputRef={el => queryField = el}
                    />
                </Col>
            </FormGroup>
            <FormGroup>
                <Col sm={10}>
                    <Button type="submit" onClick={onSubmit}>
                        Search
                    </Button>
                </Col>
            </FormGroup>
        </Form>
    )
};
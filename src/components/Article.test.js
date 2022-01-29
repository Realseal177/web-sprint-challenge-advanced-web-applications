import React from 'react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';
import { render, screen, waitFor } from '@testing-library/react';

const dummyData = {
    id: "",
    headline: "",
    author: "",
    summary: "",
    body: ""
};

test('renders component without errors', () => {
    render(<Article article={dummyData}/>)
});

test('renders headline, author from the article when passed in through props', ()=> {
    render(<Article article={dummyData}/>);

    const headline = screen.queryByTestId(/headline/i);
    const author = screen.queryByTestId(/author/i);
    const summary = screen.queryByTestId(/summary/i);
    const body = screen.queryByTestId(/body/i);

    expect(headline).toBeInTheDocument();
    expect(author).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(body).toBeInTheDocument();
});

test('renders "Associated Press" when no author is given', ()=> {
    render(<Article article={dummyData}/>);

    const author = screen.queryByTestId(/author/i)

    expect(author).toHaveTextContent(/Associated Press/i)
});

test('executes handleDelete when the delete button is pressed', async ()=> {
    const displayFunc = jest.fn();

    render(<Article handleDelete={displayFunc} article={dummyData} />);

    const deleteButton = screen.queryByTestId('deleteButton');
    userEvent.click(deleteButton)

    await waitFor(() => {
        expect(displayFunc).toHaveBeenCalled();
    });

});

//Task List: 
//1. Complete all above tests. Create test article data when needed.
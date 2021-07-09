import React from 'react';
import Autosuggest from 'react-autosuggest'
import languages from "../data";

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    const inputValue = value;
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : languages.filter(lang =>
        lang.short.slice(0, inputLength) === inputValue
        || lang.long.slice(0, inputLength) === inputValue
    );
};

// populate input when suggestion clicked
const getSuggestionValue = suggestion => suggestion.long;

// suggestions are displayed
const renderSuggestion = suggestion => (
    <button>
        {suggestion.long}
    </button>
);

export default class Example extends React.Component {
    constructor(props) {
        super(props);

        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
            value: '',
            suggestions: []
        };

        this.setQuery= props.setQuery.bind(this)
        this.setEngBookParam= props.setEngBookParam.bind(this)
    }

    onChange = (event, { newValue }) => {
        this.setQuery(newValue)
        languages.filter(e=>e.long===newValue).forEach(e=>{
            this.setEngBookParam(e.eng)
        })


        this.setState({
            value: newValue
        });
    };

    //바꿀필요 없음 -------------------------------------

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };
    //-----------------------------------------------

    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Type a programming language',
            value,
            onChange: this.onChange
        };

        // Finally, render it!
        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
            />
        );
    }
}

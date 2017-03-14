import * as React from "react";

interface WelcomeProps {
    name: string
}
class Welcome extends React.Component<WelcomeProps, undefined> {
    render() {
        return (React.DOM.h1("Hello" + this.props.name));
    }
}
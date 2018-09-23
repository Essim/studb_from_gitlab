import React, { Component } from "react";

export class ContentWrapper extends Component {

    render() {
        return (
            <div className="content-wrapper">
                <section className="content">
                    {this.props.children}
                </section>
            </div>
        );
    }
}

export default ContentWrapper;

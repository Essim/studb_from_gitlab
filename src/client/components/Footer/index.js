import React,{ Component } from "react";

export class Footer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            window: undefined,
        }
    }

    componentDidMount() {
        this.setState({ window: window })
    }

    render(){
        if(this.state.window !== undefined)
            return (
                <footer className="main-footer">
                    <div className="pull-right hidden-xs">
                        Lien vers l'<b><a href={`${this.state.window.location.origin}/api-docs/`}>API</a></b>
                    </div>
                    <strong>Copyright &copy; 2017-2018 <a href="https://gitlab.com/shu-iro/studb">StudentDB</a>.</strong> All rights
                    reserved.
                </footer>
            );
        return(<footer className="main-footer">
            <div className="pull-right hidden-xs">
                Lien vers l'<b><a href={'/'}>API</a></b>
            </div>
            <strong>Copyright &copy; 2017-2018 <a href="https://gitlab.com/shu-iro/studb">StudentDB</a>.</strong> All rights
            reserved.
        </footer>)
    }
}

export default Footer;

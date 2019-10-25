import React, { Component } from 'react';
let socket;
export default class Socket extends Component {
    constructor(props) {
        super(props);
        socket = props.socket;
        this.state = {
            user: {}
        };

        socket.on('session', user => {
            console.log('Session Get:', user);
            this.setState({
                user
            });
        });
    }

    componentDidMount() {
        socket.emit('get session');
    }
    render() {
        const { username } = this.state.user;
        console.log('State', this.state.user);
        return (
            <div className='Socket'>
                <h1>{username}</h1>
                <button
                    onClick={() =>
                        socket.emit('set session', { username: 'Travis' })
                    }>
                    Set Session
                </button>
            </div>
        );
    }
}

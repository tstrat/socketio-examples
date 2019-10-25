import React, { Component } from 'react';
import socketClient from 'socket.io-client';

const io = socketClient.connect('http://192.168.0.37:4000')

export default class SocketClient extends Component {
    constructor(params) {
        super(params)

        this.state= {
            messages: [],
            message:''
        }
        io.on('message', message => {
            this.setState({
                messages: [...this.state.messages, message],
                message: ''
            })
        })

        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }

    sendMessage() {
        const {message} = this.state;
        // send
        io.emit('message', message);
    }
    render() {
        const { message, messages } = this.state;
        const messageDisplay = messages.map((m, i)=> <li key={i}>{m}</li>)
        return (
            <div className='socket'>
                <input value={message} onChange={this.handleChange}/>
                <button onClick={this.sendMessage}>Send</button>

                <ul>
                    {messageDisplay}
                </ul>
            </div>
        );
    }
}

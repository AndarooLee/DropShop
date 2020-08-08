import React, { PureComponent } from 'react'
import withStyles from 'react-jss'
import {
    getProfile, login, logout, signup,
} from '../../common/api'
import CurrentTracks from './CurrentTracks'
import SignIn from './SignIn'

const styles = {
    button: {
        outline: 'none',
    },

    container: {
        width: 150,
    },
}


class Popup extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            user: null,
            isLoading: true,
        }
    }

    componentDidMount() {
        getProfile()
            .then((user) => {
                this.setState({
                    user,
                    isLoading: false,
                })
            })
            .catch(() => {
                this.setState({
                    isLoading: false,
                })
            })
    }

    handleClick = () => {
        chrome.tabs.query({
            active: true,
            currentWindow: true,
        }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { toggleSelectPrice: true })
        })

        window.close()
    }

    handleSignup = (accountData) => {
        signup(accountData)
            .then((user) => {
                this.setState({
                    user,
                })
            })
    }

    handleLogin = (email, password) => {
        login({
            email,
            password,
        })
            .then((user) => {
                this.setState({
                    user,
                })
            })
    }

    handleLogout = () => {
        logout()
        this.setState({
            user: null,
        })
    }

    render() {
        const { classes } = this.props
        const { user, isLoading } = this.state

        if (isLoading) {
            return null
        }

        return (
            <div>
                {
                    !user
                        ? <SignIn handleLogin={this.handleLogin} handleSignup={this.handleSignup} />
                        : (
                            <div className={classes.container}>
                                <button
                                    className={classes.button}
                                    type="button"
                                    onClick={this.handleClick}
                                >
                                    Select price
                                </button>
                                <div>
                                    <p onClick={this.handleLogout}>logout</p>
                                </div>
                                <CurrentTracks user={user} />
                            </div>
                        )
                }
            </div>
        )
    }
}

// grab all info for each item that is user id

export default withStyles(styles)(Popup)

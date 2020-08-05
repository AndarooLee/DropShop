import React, { PureComponent } from 'react'
import withStyles from 'react-jss'
import { post } from '../../common/api'

const signupUrl = 'signup/'
const styles = {}

class SignUp extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            // error: null,
            name: '',
            password: '',
            email: '',
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    validation = () => {
        const { name, email, password } = this.state
        const account = {
            name,
            password,
            email,
        }
        post(signupUrl, account)
            .then(() => {
                console.log('Success:', account)
            })
            .catch((error) => {
                console.error('Error', error)
            })

        //     {
        //         name, password, email, exists,
        //     } = this.state
        // this.validationCheck(email)
        // if (exists) {
        //     alert('This e-mail is already signed up! Try logging in!')
        // } else {
        //     this.createUser(name, password, email)
        // }
    }

    // createUser = (name, password, email) => {
    //     const data = {
    //         name,
    //         password,
    //         email,
    //     }
    //
    //     post(userUrl)
    //         .then(() => {
    //             console.log('Success:', data)
    //         })
    //         .catch((error) => {
    //             console.error('Error', error)
    //         })
    // }

    render() {
        const { name, email, password } = this.state
        return (
            <div>
                <form>
                    <label htmlFor="name">
                        Full Name:
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label htmlFor="email">
                        E-mail:
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label htmlFor="password">
                        Password:
                        <input
                            type="text"
                            id="password"
                            value={password}
                            onChange={this.handleChange}
                        />
                    </label>
                    <button
                        type="submit"
                        onClick={this.validation}
                    >
                        Sign up now!
                    </button>
                </form>
            </div>
        )
    }
}

// grab all info for each item that is user id

export default withStyles(styles)(SignUp)

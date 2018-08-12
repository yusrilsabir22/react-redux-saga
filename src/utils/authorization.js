import React from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {checkAuth,fetchApi, fetchUser, fetchSelectedUser, fetchAllBooks} from '../actions'


export default function checkAuthor(Component) {
    return (connect(mapStateProps, mapDispatchToProps)(withRouter(class AuthWrapped extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                auth: 'false',
                obj: {}
            }
        }
        componentWillMount() {
            this.props.isAuth()
        }         
        
        componentWillReceiveProps(nextProps) {
            Object.assign(this.state.obj,nextProps.user.action)
        }
        
        
        render() {
            if (!!this.state.obj.authenticated) {
                if (this.state.obj.authenticated === 'true') {
                    return (
                        <Component 
                            onFetchBookApi={this.props.onFetchBookApi} 
                            onFetchUserApi={this.props.onFetchUserApi}
                            onFetchOneUser={this.props.onFetchOneUser}
                            onFetchAllBook={this.props.onFetchAllBook}
                            history={this.props.history} 
                            user={this.props.user} 
                            book={this.props.book}
                            allUser={this.props.allUser}
                            selectUser={this.props.selectUser}
                            />
                    )
                }
                else {
                    return this.props.history.push('/login')
                }
            } else {
                return null
            }
            
        }
    })));
}

const mapStateProps = (state) => {
    return {
        user: state.userReducers,
        book: state.bookReducers,
        allUser: state.allUser,
        selectUser: state.selectUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {        
        isAuth: () => {
            return dispatch(checkAuth())
        },
        onFetchBookApi: (data) => {
            return dispatch(fetchApi(data))
        },
        onFetchUserApi: () => {
            return dispatch(fetchUser())
        },
        onFetchOneUser: (id) => {
            return dispatch(fetchSelectedUser(id))
        },
        onFetchAllBook: () => {
            return dispatch(fetchAllBooks())
        }
    }
}

// export default (checkAuthor)
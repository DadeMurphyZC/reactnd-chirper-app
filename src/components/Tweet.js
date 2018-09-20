import React, {Component} from 'react'
import {connect} from 'react-redux'
import {formatDate, formatTweet} from '../utils/helpers'
import { TiArrowBackOutline } from 'react-icons/ti/index'
import { TiHeartOutline } from 'react-icons/ti/index'
import { TiHeartFullOutline } from 'react-icons/ti/index'


class Tweet extends Component{

    toParent = (e, id) => {
        e.preventDefault()
    }

    render(){
        const { tweet } = this.props

        if(tweet===null){
            return <p>This Tweet doesn't exist</p>
        }

        const {
            name, avatar, timestamp, text, hasLiked, likes, replies, id, parent
        } = tweet


        return (
            <div className='tweet'>
                <img
                    src={avatar}
                    alt={'Avatar of ${name}'}
                    className='avatar'
                />
                <div className='tweet-info'>
                    <span>{name}</span>
                    <div>{formatDate(timestamp)}</div>
                    {parent && (
                        <button className='replying-to' onClick={(e)=> this.toParent(e, parent.id)}>
                            Replying to @{parent.author}
                        </button>
                    )}
                </div>
            </div>
        )
    }
}

function mapStateToProps({authedUser, users, tweets}, {id}){
    const tweet = tweets[id]
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null
    return{
        authedUser,
        tweet: tweet
        ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
        : null
    }
}

export default connect(mapStateToProps)(Tweet);
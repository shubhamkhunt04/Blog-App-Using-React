import React from 'react'
import {Card, CardBody, CardTitle, CardText} from 'reactstrap'
import {Link} from 'react-router-dom'

const RenderPost = ({post}) => {
  console.log('Post', post)
  return (
    <div>
      <h1>RenderPost</h1>
      {post.map(post => {
        return (
          <div key={post.id}>
            <Card className="border border-primary m-2 authorCard">
              <CardBody>
                <CardTitle className="font-weight-bold">
                  Title:-{post.title}
                </CardTitle>
                <CardTitle className="font-weight-bold">
                  DatePublished :- <i className="fa fa-calendar-o"></i>{' '}
                  {new Date(post.datePublished).toDateString()}
                </CardTitle>
                <CardTitle className="font-weight-bold">
                  Likes :-{' '}
                  <img src="https://img.icons8.com/material/22/000000/thumb-up--v1.png" />{' '}
                  {post.numLikes}
                </CardTitle>
                <CardTitle className="font-weight-bold">
                  {post.description}
                </CardTitle>
              </CardBody>
            </Card>
          </div>
        )
      })}
    </div>
  )
}

const RenderComments = ({comments}) => {
  console.log('Comments', comments)
  return (
    <div>
      <h1> Render Comments</h1>
      {comments.map(comment => {
        return (
          <div key={comment.id}>
            <Card className="border border-primary m-2 authorCard">
              <CardBody>
                <CardTitle className="font-weight-bold">
                  Text :- {comment.text}
                </CardTitle>
                <Link to={`/authors/${comment.authorId}`}>
                  <CardText>{comment.authorId}</CardText>
                </Link>
              </CardBody>
            </Card>
          </div>
        )
      })}
    </div>
  )
}

const PostDetail = ({post, comments}) => {
  return (
    <div>
      <RenderPost post={post} />
      <RenderComments comments={comments} />
    </div>
  )
}

export default PostDetail

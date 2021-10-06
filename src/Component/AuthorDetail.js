/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import {Card, CardBody, CardTitle, CardText, Button} from 'reactstrap'
import {Link} from 'react-router-dom'

const RenderAuthor = ({author}) => {
  return (
    <div>
      author detail component
      {author.map(author => {
        return (
          <div key={author.id}>
            <Card className="border border-primary m-2 authorCard">
              <CardBody>
                <CardTitle className="font-weight-bold">
                  Name :- {author.firstName} {author.lastName}
                </CardTitle>
                <CardText>
                  <img src="https://img.icons8.com/android/22/000000/phone.png" />{' '}
                  {author.phone}
                </CardText>
                <CardText>
                  <img src="https://img.icons8.com/ios-filled/20/000000/google-blog-search.png" />{' '}
                  {author.numPosts}
                </CardText>
                <CardText>
                  <img src="https://img.icons8.com/material/20/000000/thumb-up--v1.png" />{' '}
                  {author.numLikes}
                </CardText>
                <CardText>
                  <img src="https://img.icons8.com/android/20/000000/comments.png" />{' '}
                  {author.numComments}
                </CardText>
              </CardBody>
            </Card>
          </div>
        )
      })}
    </div>
  )
}

const RenderPost = ({posts}) => {
  return (
    <div>
      RenderPost component
      {posts.map(post => {
        return (
          <div key={post.id}>
            <Link to={`/authors/${post.authorId}/${post.id}`}>
              <Card className="border border-primary m-2 authorCard">
                <CardBody>
                  <CardTitle className="font-weight-bold">
                    <img src="https://img.icons8.com/ios-filled/20/000000/google-blog-search.png" />{' '}
                    {post.title}
                  </CardTitle>
                </CardBody>
              </Card>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

const dateWiseSorting = posts => {
  console.log('dateWiseSortingCalled', posts)

  // let dateArray = []
  // for(let i=0;i<posts.length;i++){
  //   dateArray.push((posts[i].datePublished));
  // }
  // console.log(dateArray);

  let temp = posts

  temp.sort((a, b) => {
    return a.id - b.id
  })
  console.log('dateWiseSorting', posts)
}

// const numLikeWiseSorting = (posts) => {
//   console.log("numLikeswise sorting",posts);
//   let temp = posts;

//   posts.sort((a, b) => {
//     return b.numLikes- a.numLikes;
//   });
//   console.log("numLikesWiseSorting", posts);
// };

// const RenderNumLikeSort = ({ NumLikeSort }) => {
//   console.log(NumLikeSort);
//   return(
//     <div>
//       <h1>NumLikeSort</h1>
//       <p>NumLikeSort</p>
//     </div>
//   )
// };

const AuthorDetail = ({author, posts, numLikeWiseSorting}) => {
  return (
    <>
      <RenderAuthor author={author} />
      <Button onClick={dateWiseSorting.bind(this, posts)}>DateWise</Button>
      <Button onClick={() => numLikeWiseSorting(posts)}>NumLikeWise</Button>
      <RenderPost posts={posts} />
    </>
  )
}

export default AuthorDetail

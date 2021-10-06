import React, {useReducer, useEffect} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Axios from 'axios'
import Author from './Author'
import Test from './AuthorListPagination'
import AuthorDetail from './AuthorDetail'
import PostDetail from './PostDetail'

//#C3FFA9

const initialState = {
  loading: true,
  error: '',
  authors: [],
  posts: [],
  likes: [],
  comments: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SCCESS':
      //   console.log("action author state", state.authors);
      //   console.log("author pyload", action.authorsPayload);
      return {
        ...state,
        loading: false,
        authors:
          action.authorsPayload !== undefined
            ? action.authorsPayload
            : [...state.authors],
        posts:
          action.postsPayload !== undefined
            ? action.postsPayload
            : [...state.posts],
        likes:
          action.likesPayload !== undefined
            ? action.likesPayload
            : [...state.likes],
        comments:
          action.commentsPayload !== undefined
            ? action.commentsPayload
            : [...state.comments],
        error: '',
      }
    case 'FETCH_ERROR':
      return {
        loading: false,
        authors: [],
        posts: [],
        likes: [],
        comments: [],
        error: 'Something Went Wrong',
      }
    default:
      return state
  }
}

const MainComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const authors = await Axios.get(`http://localhost:3004/authors`)
        dispatch({type: 'FETCH_SCCESS', authorsPayload: authors.data})
        const posts = await Axios.get(`http://localhost:3004/posts`)
        dispatch({type: 'FETCH_SCCESS', postsPayload: posts.data})
        const likes = await Axios.get(`http://localhost:3004/likes`)
        dispatch({type: 'FETCH_SCCESS', likesPayload: likes.data})
        const comments = await Axios.get(`http://localhost:3004/comments`)
        dispatch({type: 'FETCH_SCCESS', commentsPayload: comments.data})
      } catch (err) {
        dispatch({type: 'FETCH_ERROR'})
      }
    }
    fetchAllData()
  }, [])

  const numLikeWiseSorting = posts => {
    console.log('numLikeswise sorting', posts)

    posts.sort((a, b) => {
      return b.numLikes - a.numLikes
    })
    // state.posts = posts;
    console.log('numLikesWiseSorting', posts)
  }

  const AuthorWithId = ({match}) => {
    // console.log(state.posts);
    return (
      <AuthorDetail
        author={state.authors.filter(
          author => author.id === match.params.authorId,
        )}
        posts={state.posts.filter(
          post => post.authorId === parseInt(match.params.authorId),
        )}
        numLikeWiseSorting={numLikeWiseSorting}
        // NumLikeSort={state.posts.sort().filter(
        //   (post) => post.authorId === parseInt(match.params.authorId)
        // )}
      />
    )
  }

  // const NumLikeSort = (match)=>{
  //   // console.log(match);
  //   //  let totalLikes = state.posts.filter(
  //   //   (post) => post.authorId === parseInt(match.params.authorId)
  //   // )}
  // }
  //   // console.log(NumLikeSort());

  const PostWithId = ({match}) => {
    return (
      <div>
        <PostDetail
          post={state.posts.filter(post => post.id === match.params.postId)}
          comments={state.comments.filter(
            comment => comment.postId === parseInt(match.params.postId),
          )}
        />
      </div>
    )
  }

  return (
    <>
      <Switch>
        <Route
          exact
          path="/authors"
          component={() => <Author authorsState={state} />}
        />
        <Route exact path="/authors/:authorId" component={AuthorWithId} />
        <Route path="/authors/:authorId/:postId" component={PostWithId} />
        <Redirect to="/authors" />
        <Test />
      </Switch>
    </>
  )
}

export default MainComponent
// export default React.memo(MainComponent);

// import React, { useReducer, useEffect } from "react";
// import Axios from "axios";
// import Author from "./Author";
// import Test from "./Test";

// const initialState = {
//   loading: true,
//   error: "",
//   authors: [],
//   posts: [],
//   likes: [],
//   comments: [],
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "FETCH_SCCESS":
//       //   console.log("action author state", state.authors);
//       //   console.log("author pyload", action.authorsPayload);
//       return {
//         ...state,
//         loading: false,
//         authors:
//           action.authorsPayload !== undefined
//             ? action.authorsPayload
//             : [...state.authors],
//         posts:
//           action.postsPayload !== undefined
//             ? action.postsPayload
//             : [...state.posts],
//         likes:
//           action.likesPayload !== undefined
//             ? action.likesPayload
//             : [...state.likes],
//         comments:
//           action.commentsPayload !== undefined
//             ? action.commentsPayload
//             : [...state.comments],
//         error: "",
//       };
//     case "FETCH_ERROR":
//       return {
//         loading: false,
//         authors: [],
//         posts: [],
//         likes: [],
//         comments: [],
//         error: "Something Went Wrong",
//       };
//     default:
//       return state;
//   }
// };

// const MainComponent = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   // Authors
//   useEffect(() => {
//     const fetchAuthors = async () => {
//       try {
//         const authors = await Axios.get(
//           `http://localhost:3004/authors?_page=1&_limit=10`
//         );
//         dispatch({ type: "FETCH_SCCESS", authorsPayload: authors.data });
//       } catch (err) {
//         dispatch({ type: "FETCH_ERROR" });
//       }
//     };
//     fetchAuthors();

//     // Posts
//     const fetchPosts = async () => {
//       try {
//         const posts = await Axios.get(
//           `http://localhost:3004/posts?_page=1&_limit=10`
//         );
//         dispatch({ type: "FETCH_SCCESS", postsPayload: posts.data });
//       } catch (err) {
//         dispatch({ type: "FETCH_ERROR" });
//       }
//     };
//     fetchPosts();

//     // Likes
//     const fetchLikes = async () => {
//       try {
//         const likes = await Axios.get(
//           `http://localhost:3004/likes?_page=1&_limit=100`
//         );
//         dispatch({ type: "FETCH_SCCESS", likesPayload: likes.data });
//       } catch (err) {
//         dispatch({ type: "FETCH_ERROR" });
//       }
//     };
//     fetchLikes();

//     //Comments
//     const fetchComments = async () => {
//       try {
//         const comments = await Axios.get(
//           `http://localhost:3004/comments?_page=1&_limit=100`
//         );
//         dispatch({ type: "FETCH_SCCESS", commentsPayload: comments.data });
//       } catch (err) {
//         dispatch({ type: "FETCH_ERROR" });
//       }
//     };
//     fetchComments();
//   }, []);

//   return (
//     <>
//       <Author authorsState={state}/>
//       <Test />
//     </>
//   );
// };

// export default MainComponent;

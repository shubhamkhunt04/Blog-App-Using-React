import React, {useState} from 'react'
import {Card, CardBody, CardTitle, Alert, Pagination} from 'reactstrap'
import {Link} from 'react-router-dom'
import AuthorListPagination from './AuthorListPagination'

const RenderAuthor = ({authorsState}) => {
  const [showPerPage, setShowPerPage] = useState(50)
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  })

  const onPaginationChange = (start, end) => {
    setPagination({start: start, end: end})
  }

  return (
    <div className="container">
      {authorsState.authors.loading ? (
        <Alert color="info" className="mt-4">
          Loading <i className="fa fa-spinner fa-spin"></i>
        </Alert>
      ) : (
        authorsState.authors
          .slice(pagination.start, pagination.end)
          .map(author => {
            return (
              <div key={author.id}>
                <Link to={`/authors/${author.id}`}>
                  <Card className="border border-primary m-2 text-white cardcolor">
                    <CardBody>
                      <CardTitle className="font-weight-bold">
                        <i className="fa fa-user-circle-o"></i>{' '}
                        {author.firstName} {author.lastName}
                      </CardTitle>
                    </CardBody>
                  </Card>
                </Link>
              </div>
            )
          })
      )}
      {authorsState.error ? authorsState.error : null}

      <AuthorListPagination
        showPerPage={showPerPage}
        onPaginationChange={onPaginationChange}
        totalAuthors={authorsState.authors.length}
      />
    </div>
  )
}

const Author = ({authorsState}) => {
  return <RenderAuthor authorsState={authorsState} />
}

// import React from 'react';
// import { Table } from 'reactstrap';

// const Author = (props) => {
//   return (
//     <Table striped>
//       <thead>
//         <tr>
//           <th>#</th>
//           <th>First Name</th>
//           <th>Last Name</th>
//           <th>Username</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <th scope="row">1</th>
//           <td>Mark</td>
//           <td>Otto</td>
//           <td>@mdo</td>
//         </tr>
//       </tbody>
//     </Table>
//   );
// }

export default Author

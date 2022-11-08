import { useEffect, useState } from 'react';
import { Container, Form, Col, Row, Pagination } from 'react-bootstrap';
import './App.css';
import RepoUsers from './Components/RepoUsers';



function App() {

  const [userRepoData, setUserRepoData] = useState([])
  const [page, setPage] = useState(1)
  const [searchVal, setSearchVal] = useState('')
  const [filteredData, setFilteredData] = useState([])


  useEffect(() => {
    if (page) {
      // getData(page, searchVal)  // i am trying to filter data by api but api is not working
      getData(page)
    }
  }, [page])

  useEffect(() => {
    //custom filter data by name
    if (searchVal) {
      const filterData = userRepoData.filter((item) => {
        return (
          item?.name.toLowerCase().includes(searchVal.toLowerCase().trim())
        )
      })
      setFilteredData(filterData)
    }

  }, [searchVal])

  const getData = async (page, searchVal) => {
    try {
      // const userRepoRes = await fetch(`https://api.github.com/users/indreklasn/repos?page=${page}&q=${searchVal}`, this api for searching but not working
      const userRepoRes = await fetch(`https://api.github.com/users/indreklasn/repos?page=${page}}`,
        {
          headers: {
            'Authorization': 'token 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',
          }
        }
      )
      const userRepoData = await userRepoRes.json()
      if (userRepoData) {
        setUserRepoData(userRepoData)
        setFilteredData(userRepoData)
      }

    } catch (error) {
      console.log(error)
    }
  }



  const filterData = () => {

  }


  return (
    <div className="App">
      <h4>Git Repo Filter Task</h4>
      <br />
      <br />
      <br />
      <Container>
        <Row className="mb-3">
          <Col md="4">
            <Form.Control onChange={(e) => setSearchVal(e.target.value)} type="email" placeholder="Enter email" />
          </Col>
        </Row>
        <br />
        <br />
        <RepoUsers userRepoData={filteredData} />

        <Container>
          <div style={{
            display: 'flex',
            textAlign: 'center'
          }}>
            <Pagination>
              <Pagination.Item onClick={() => setPage(page - 1)} disabled={page == 1 ? true : false}>Previos</Pagination.Item>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <Pagination.Item onClick={() => setPage(page + 1)} disabled={page != 1 ? false : false}>Next</Pagination.Item>
            </Pagination>
          </div>
        </Container>

      </Container >
    </div >
  );
}

export default App;
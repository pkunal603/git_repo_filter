import React, { useState, useEffect } from 'react'
import { Container, Form, Col, Row, Pagination } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import RepoUsers from '../../Components/RepoUsers';


const HomePage = () => {
    const [userRepoData, setUserRepoData] = useState([])
    const [page, setPage] = useState(1)
    const [searchVal, setSearchVal] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const { uname } = useParams()



    useEffect(() => {
        if (page && uname && searchVal.length === 0) {
            // getData(page, searchVal)  // i am trying to filter data by api but api is not working
            getData(page, uname)
        }
        //     //custom filter data by repo name
        if (searchVal) {
            const filterData = userRepoData.filter((item) => {
                return (
                    item?.name.toLowerCase().includes(searchVal.toLowerCase().trim())
                )
            })
            setFilteredData(filterData)
        }
    }, [page, uname, searchVal])


    const getData = async (page, uname) => {
        try {
            // const userRepoRes = await fetch(`https://api.github.com/users/indreklasn/repos?page=${page}&q=${searchVal}`, this api for searching but not working
            // https://api.github.com/search/repositories?q=react  // this api will search fot all repos github not by user
            
            const userRepoRes = await fetch(`https://api.github.com/users/${uname}/repos?page=${page}`,
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

    return (
        <div>
            <h4>Git Repo Filter Task</h4>
            <br />
            <br />
            <br />
            <Container>
                <Row className="mb-3">
                    <Col md="4">
                        <Form.Control onChange={(e) => setSearchVal(e.target.value)} value={searchVal} type="email" placeholder="Enter email" />
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
                            <Pagination.Item onClick={() => { setPage(page - 1); setSearchVal('') }} disabled={page == 1 ? true : false}>Previos</Pagination.Item>
                            &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;
                            <Pagination.Item onClick={() => { setPage(page + 1); setSearchVal('') }} disabled={page != 1 ? false : false}>Next</Pagination.Item>
                        </Pagination>
                    </div>
                </Container>

            </Container >
        </div>
    )
}

export default HomePage
import React from 'react'
import { Container } from 'react-bootstrap'

const RepoUsers = ({ userRepoData }) => {

    return (
        <Container>
            {userRepoData.length > 0 && userRepoData.map((repo, index) => {
                return (
                    <React.Fragment key={index}>
                        <div>
                            <div>
                                <h3 >
                                    <a href="https://github.com/mojombo/erlectricity">
                                        {repo?.name}</a>
                                    &nbsp;  &nbsp;  &nbsp;
                                    <span>{repo?.visibility}</span>
                                </h3>
                            </div>

                            <div>
                                <p>
                                    {repo?.description}
                                </p>
                            </div>
                        </div>
                        <br />
                    </React.Fragment>
                )
            })
            }
        </Container>
    )
}

export default RepoUsers
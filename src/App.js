import { useEffect, useState } from 'react';
import { Container, Form, Col, Row, Pagination } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import RepoUsers from './Components/RepoUsers';
import HomePage from './pages/HomePage';



function App() {

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/indreklasn" />}
        />
        <Route path='/:uname' element={<HomePage />}></Route>
      </Routes>
    </div >
  );
}

export default App;
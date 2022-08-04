import React from 'react'
import AddEmployee from '../components/AddEmployee'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ListEmployee  from '../components/ListEmployee'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const Home = () => {
  return (
    <div>
    <Router>
      <Header />
      <div className='container'>
        <Routes>
            <Route exact path="/" element={<ListEmployee/>}/>
            <Route exact path="/employees" element={<ListEmployee/>}/>
            <Route exact path="/add-employee" element={<AddEmployee/>}/>
            <Route exact path="/edit-employee/:id" element={<AddEmployee/>}/>
        </Routes>
      </div>
    </Router>
    <Footer />
    </div>
  )
}

export default Home
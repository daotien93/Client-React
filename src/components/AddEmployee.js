import React, { useState, useEffect } from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom'
import EmployeeService from '../api/EmployeeService'

const AddEmployee = () => {
    const [fullName, setFullName] = useState('')
    const [pointNumberOne, setPointNumberOne] = useState('')
    const [pointNumberTwo, setPointNumberTwo] = useState('')
    const [pointNumberThree, setPointNumberThree] = useState('')

    const history = useNavigate()
    const {id} = useParams()

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault()

        const employee = { fullName, pointNumberOne, pointNumberTwo, pointNumberThree }

        if(id){
            EmployeeService.updateEmployee(id, employee).then((response) => {
                history.push('/employees')
            }).catch(error => {
                console.log(error)
            })     
        } else {
            EmployeeService.createEmployee(employee).then((response) =>{
                console.log(response.data)  
                history.push('/employees')
    
            }).catch(error => {
                console.log(error)
            })
        }
    }

    useEffect(() => {
        EmployeeService.getEmployeeById(id).then((response) => {
            setFullName(response.data.fullName)
            setPointNumberOne(response.data.pointNumberOne)
            setPointNumberTwo(response.data.pointNumberTwo)
            setPointNumberThree(response.data.pointNumberThree)
        }).catch(error => {
            console.log(error)
        })
    }, [id])

    const title = () => {
        if (id) {
            return <h2 className='text-align'>Update employee</h2>
        } else {
            return <h2 className='text-align'>Add Employee</h2>
        }
    }
  return (
    <div>
           <br/><br />
           <div className = 'container'>
                <div className = 'row'>
                    <div className = 'card col-md-6 offset-md-3 offset-md-3'>
                       {
                           title()
                       }
                        <div className = 'card-body'>
                            <form>
                                <div className = 'form-group mb-2'>
                                    <label className = 'form-label'> Full Name :</label>
                                    <input
                                        type = 'text'
                                        placeholder = 'Enter fullName'
                                        name = 'fullName'
                                        className = 'form-control'
                                        value = {fullName}
                                        onChange = {(e) => setFullName(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = 'form-group mb-2'>
                                    <label className = 'form-label'> Point NumberOne :</label>
                                    <input
                                        type = 'text'
                                        placeholder = 'Enter point number one'
                                        name = 'pointNumberOne'
                                        className = 'form-control'
                                        value = {pointNumberOne}
                                        onChange = {(e) => setPointNumberOne(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = 'form-group mb-2'>
                                    <label className = 'form-label'> Point Number Two :</label>
                                    <input
                                        type = 'text'
                                        placeholder = 'Enter point number two'
                                        name = 'pointNumberTwo'
                                        className = 'form-control'
                                        value = {pointNumberTwo}
                                        onChange = {(e) => setPointNumberTwo(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className = 'form-group mb-2'>
                                    <label className = 'form-label'> Point Number Three :</label>
                                    <input
                                        type = 'text'
                                        placeholder = 'Enter point number three'
                                        name = 'pointNumberThree'
                                        className = 'form-control'
                                        value = {pointNumberThree}
                                        onChange = {(e) => setPointNumberThree(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <button className = 'btn btn-success' onClick = {(e) => saveOrUpdateEmployee(e)}>Submit </button>
                                <Link to='/employees' className='btn btn-danger'> Cancel </Link>
                            </form>

                        </div>
                    </div>
                </div>

           </div>

        </div>
  )
}

export default AddEmployee
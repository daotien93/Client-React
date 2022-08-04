import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import EmployeeService from '../api/EmployeeService'

const ListEmployee = () => {
    const [employees, setEmployees] = useState([])
    const [inputValue, setInputValue] = useState('')
    const countPoint = 3

    const handleChange = (e) => {
        setInputValue(e.target.value)
    }

    useEffect(() => {
        getAllEmployees()
    }, [])

    const getAllEmployees = () => {
        EmployeeService.getEmployees().then((response) => {
            setEmployees(response.data)
            console.log(response.data)
        }).then (error => {
            console.log(error)
        })
    }

    const onDeleteEmployee = (employeeId) => {
        EmployeeService.deleteEmployee(employeeId).then((response) => {
            getAllEmployees(response.data)
        }).catch(error => {
            console.log(error)
        })
    }

    const onSearchPoint = (e, keyword) => {
        e.preventDeafault()
        EmployeeService.searchEmployee(keyword).then((response) => {
            getAllEmployees(response.data)
        }).catch(error => {
            console.log(error)
        }) 
    }

    const onClearSerchInput = (e) => {
        e.preventDeafault()
        setInputValue('')
    }

  return (
    
    <div className='container'>
            <h2 className = 'text-center'> List Employees </h2>
            <div class='form-group mb-2'>
                            <input 
                                 type='text'
                                 class='form-control' 
                                 name='search' 
                                 size='50' 
                                 placeholder='Search Here'
                                 value={inputValue}
                                 onChange={handleChange}
                            />
                            <button
                                 type='button'
                                 name='search' 
                                 class='btn btn-info my-2 text-center mr-2'
                                 onClick={onSearchPoint}
                                 >
                                Search Point
                            </button>   
                            <button 
                                type='reset'
                                 class='btn btn-secondary text-center ml-2' 
                                 style={{marginLeft:'10px'}}
                                 onClick={onClearSerchInput}
                            >Clear</button>
            </div>
            <Link to = '/add-employee' className = 'btn btn-primary mb-2' > Add Employee </Link>
            <table className='table table-bordered table-striped'>
                <thead>
                    <th> Full Name </th>
                    <th> Point Number One</th>
                    <th> Point Number Two</th>
                    <th> Point Number Three</th>
                    <th> GPA </th>
                </thead>
                <tbody>
                    {
                        employees.map(
                            employee =>
                            <tr key = {employee.id}> 
                                <td>{employee.fullName}</td>
                                <td>{employee.pointNumberOne}</td>
                                <td>{employee.pointNumberTwo}</td>
                                <td>{employee.pointNumberThree}</td>
                                <td>{(employee.pointNumberOne + employee.pointNumberTwo + employee.pointNumberThree) / countPoint}</td>
                                <td>
                                    <Link 
                                        className='btn btn-info'
                                        to={`/edit-employee/${employee.id}`
                                    }>
                                    Update
                                    </Link>
                                    <button 
                                        className = 'btn btn-danger'
                                        onClick = {() => onDeleteEmployee(employee.id)
                                    }
                                    style = {{marginLeft:'10px'}}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
  )
}

export default ListEmployee
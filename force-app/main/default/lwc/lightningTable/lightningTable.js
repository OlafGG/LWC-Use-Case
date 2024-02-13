import { LightningElement } from 'lwc';

export default class LightningTable extends LightningElement {
    employeeColums = [
        {
            label : 'Employee ID',
            fieldName : 'employeeID'
        },
        {
            label : 'Employee First Name',
            fieldName : 'employeeFirstName'
        },
        {
            label : 'Employee Last Name',
            fieldName : 'employeeLastName'
        },
        {
            label : 'Employee Phone',
            fieldName : 'employeePhone' 
        }
    ];

    dataEmployees = [
        {
        employeeID: 1,
        employeeFirstName : 'Uriel Olaf',
        employeeLastName: 'Baeza Baeza',
        employeePhone: '1234567789'
        },
        {
        employeeID: 2,
        employeeFirstName : 'Bruce',
        employeeLastName: 'Willis',
        employeePhone: '1234567890'
        },
        {
            employeeID: 3,
            employeeFirstName : 'Keannu',
            employeeLastName: 'Revees',
            employeePhone: '4567245666'
        }
        
        
    ];
    
    connectedCallback(){
        console.log('console log no se que mas es, esto es el callback connected');
    }
    renderedCallback(){
        console.log('callback render');
    }
}
import { LightningElement } from 'lwc';

export default class SImpleTable extends LightningElement {
    dataEmployees = [
        {
        id: 1,
        Name : 'Uriel Olaf',
        Age: 22,
        Country: 'Mexico'
        },
        {
        id: 2,
        Name : 'Bruce Willis',
        Age: 56,
        Country: 'United States'
        },
        {
        id: 3,
        Name : 'Keannu',
        Age: 45,
        Country: 'Canada'
        }
    ];
}
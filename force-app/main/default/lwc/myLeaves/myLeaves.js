import { LightningElement, wire } from 'lwc';
import getMyLeaves from '@salesforce/apex/LeaveRequstController.getMyLeaves';


const COLUMNS = [
    { label: 'Request ID', fieldName: 'Name' },
    { label: 'From Date', fieldName: 'From_Date__c' },
    { label: 'To Date', fieldName: 'To_Date__c' },
    { label: 'Reason', fieldName: 'Reason__c' },
    { label: 'Status', fieldName: 'Status__c' },
    { label: 'Manager Comment', fieldName: 'Manager_Comment__c' },
];

export default class MyLeaves extends LightningElement {
    columns = COLUMNS;
    myLeaves = [];

    @wire(getMyLeaves)
    wiredLeaves({ error, data }) {
        console.log('Wire result:', { data, error });
        if (data) {
            this.myLeaves = data;
            console.log('Fetched leaves:', data);
        } else if (error) {
            this.myLeaves = [];
            console.error('Error fetching my leaves', error);
        }
    }
}

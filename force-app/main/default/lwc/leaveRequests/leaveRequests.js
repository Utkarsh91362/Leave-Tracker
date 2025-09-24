import { LightningElement, wire } from 'lwc';
import getMyLeaves from '@salesforce/apex/LeaveRequstController.getMyLeaves';
const COLUMNS=[
    {label:'Request ID', fieldName:'Name'},
    {label:'From Date', fieldName:'From_Date__c'},
    {label:'To Date', fieldName:'To_Date__c'},
    {label:'Reason', fieldName:'Reason__c'},
    {label:'Status', fieldName:'Status__c'},
    {label:'Manager Comment', fieldName:'Manager_Comment__c'},
    {type:'button', typeAttributes:{
        label:'Edit',
        name:'Edit',
        value:'Edit',
        
    }}
]
export default class MyLeaves extends LightningElement {
    columns=COLUMNS;
    myLeaves = [];
    MyLeavesWireResult;

    @wire(getMyLeaves)
    wiredMyLeaves(result) {
        this.MyLeavesWireResult = result;
        if (result.data) {
            this.myLeaves = result.data;
        }
        if (result.error) {
            console.log('Error occurred while fetching my leaves', result.error);
        }
    }
}

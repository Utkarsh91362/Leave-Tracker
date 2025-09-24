import { LightningElement, wire } from 'lwc';
import getMyLeaves from '@salesforce/apex/LeaveRequstController.getMyLeaves';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const COLUMNS = [
    { label: 'Request ID', fieldName: 'Name', cellAttributes: { class: { fieldName: 'cellClass' } } },
    { label: 'From Date', fieldName: 'From_Date__c', cellAttributes: { class: { fieldName: 'cellClass' } } },
    { label: 'To Date', fieldName: 'To_Date__c', cellAttributes: { class: { fieldName: 'cellClass' } } },
    { label: 'Reason', fieldName: 'Reason__c', cellAttributes: { class: { fieldName: 'cellClass' } } },
    { label: 'Status', fieldName: 'Status__c', cellAttributes: { class: { fieldName: 'cellClass' } } },
    { label: 'Manager Comment', fieldName: 'Manager_Comment__c', cellAttributes: { class: { fieldName: 'cellClass' } } },
    {
        type: "button",
        typeAttributes: {
            label: 'View Request',
            name: 'edit',
            title: 'Edit',
            value: 'edit',
            disabled: { fieldName: 'isEditDisabled' }
        },
        cellAttributes: { class: { fieldName: 'cellClass' } }
    }
];

export default class MyLeaves extends LightningElement {
    columns = COLUMNS;
    myLeaves = [];
    showModalPopup = false;
    objectApiName = 'LeaveRequest__c';
    recordId = '';

    @wire(getMyLeaves)
    wiredLeaves({ error, data }) {
        console.log('Wire result:', { data, error });
        if (data) {
            this.myLeaves = data.map(a => ({
                ...a,
                cellClass: a.Status__c === 'Approved' ? 'slds-theme_success' : a.Status__c === 'Rejected' ? 'slds-theme_warning' : '',
                isEditDisabled: a.Status__c !== 'Pending'
            }));
            console.log('Fetched leaves:', this.myLeaves);
        } else if (error) {
            this.myLeaves = [];
            console.error('Error fetching my leaves', error);
        }
    }

    get noRecordsFound() {
        return this.myLeaves.length === 0;
    }

    popupCloseHandler() {
        this.showModalPopup = false;
    }

    rowActionHandler(event) {
        this.showModalPopup = true;
        this.recordId = event.detail.row.Id;
    }

    newRequestClickHandler() {
        this.showModalPopup = true;
        this.recordId = '';
    }

    successHandler() {
        this.showModalPopup = false;
        this.showToast('Leave request saved successfully');
    }

    showToast(message, title = 'Success', variant = 'success') {
        const event = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(event);
    }
}

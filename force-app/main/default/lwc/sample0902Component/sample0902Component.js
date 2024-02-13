import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { mapFields, mapFieldsContacts } from './sampleDataInfoApex';
import getContacts from '@salesforce/apex/lightningTableController.getContacts';
import contactUpdate from '@salesforce/apex/lightningTableController.contactUpdate';
import deleteUpdate from '@salesforce/apex/lightningTableController.deleteUpdate';
import createContact from '@salesforce/apex/lightningTableController.createContact'; 

export default class Sample0902Component extends LightningElement {


    displayModal=false;
    rowFields = {};
    title = "";
    data = [];
    messageData="";
    actions = [
        {
            label: "Edit",
            name: "edit"
        },
        {
            label: "Delete",
            name: "delete",
        }
    ];
    
    columns = [
        {
            label: "Id",
            fieldName: "Id"
        },
        {
            label: "Name",
            fieldName: "firstName"
        },
        {
            label: "Last Name",
            fieldName: "lastName"
        },
        {
            label: "Phone",
            fieldName: "phone"
        },
        {
            label: "Email",
            fieldName: "email"
        },
        {
            type: "action",
            typeAttributes: {rowActions: this.actions}//llamada a las acciones que tiene salesforce, botones que nombramos y damos un name que ya se tiene
        }
    ];
    
    async connectedCallback(){
        this.getandMapContacts();
    }

    
    handleRowActions (event) {
        const actionName = event.detail.action.name;
        const idfromtable = event.detail.row.Id;
        this.rowFields = event.detail.row;
        console.log(idfromtable)
        switch(actionName){
            case 'edit':
                this.handleOpenModal();
                this.title = "Edit";
                this.messageData = 'edit';

                
                break;
            case 'delete':
                this.handleDelete(idfromtable);
                this.title = "Delete";
                this.messageData = 'delete';
                this.showToast('Delete', 'deleted');
                break;
        }
    }


    handleOpenTitle(){
        this.title = 'New Contact';
        this.handleOpenModal();
        this.messageData = 'new'
    }
    handleOpenModal () {        
        this.displayModal = true;
    }
    handleCloseModal (event) {
        this.displayModal = false;
    }

    handleSave(event){

        //los nuevos datos son estos y es lo que hay que devolver a la bd
        const updatedData = event.detail;


        switch (this.messageData) {
            case 'edit':
                this.handleUpdateContact(updatedData.Id, updatedData.firstName, updatedData.lastName, updatedData.email, updatedData.phone);
                this.refreshData();
                this.handleCloseModal();
                this.showToast('Update', 'updated');
                break;

            case 'new': 
                this.handleCreateContact(updatedData.firstName, updatedData.lastName, updatedData.email, updatedData.phone);
                this.handleCloseModal();
                this.showToast('Create', 'created');
                break;
        }
        
        
    }
    //success message toast
    showToast(titleChange, messageChange){
        const event =  new ShowToastEvent({
            title: titleChange,
            message: 'The record was ' + messageChange,
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }
    async handleUpdateContact(IdRecord, FirstNameRecord, LastNameRecord, EmailRecord, PhoneRecord){
        try {
            record = await contactUpdate( {IdContact : IdRecord, FirstNameC : FirstNameRecord, LastNameC : LastNameRecord, EmailC : EmailRecord, PhoneC : PhoneRecord})
            console.log(record);
        } catch (error) {
            console.log(error)
        }
       
    }

    async handleCreateContact(FirstNameRecord, LastNameRecord, EmailRecord, PhoneRecord) {

        try {
            record = await createContact({firstName : FirstNameRecord, lastName:  LastNameRecord, email : EmailRecord, phone : PhoneRecord});
        } catch (error) {
            console.log(error);
        }
        

    }

    async handleDelete(IdRecord){
        try {
            record = await deleteUpdate({contactId : IdRecord});
        } catch (error) {
            console.log(error)
        }
    }


    async getandMapContacts (){
        const contacts = await getContacts();
        this.data = mapFields(contacts);
    }

    refreshData(){
        refreshApex(this.refreshTable);
    }
}
import { LightningElement, api } from 'lwc';
import getContacts from '@salesforce/apex/lightningTableController.getContacts'; 

export default class ExampleLightningTable extends LightningElement {
    data = [];
    lstcontacts;
    displayModal = false;
    title;
    @api record;

    async connectedCallback(){
        try {
            await this.obtainContacts();
        } catch (error) {
            console.error(error);
        }
    }
    actions = [
        {
            label: 'Edit',
            name: 'edit'
        },
        {
            label: 'Show Details',
            name: 'showDetails'
        }
    ];
    columns = [
        {
            label: 'Name',
            fieldName: 'FirstName'
        },
        {
            label: 'Last Name',
            fieldName: 'LastName'
        },
        {
            label: 'Email',
            fieldName: 'Email'
        },
        {
            label: 'Phone',
            fieldName: 'Phone'
        },
        {
            type: "action",
            typeAttributes: {rowActions: this.actions}
        }
    ];
    data = [
        {
            id : 1,
            name : 'Jhon',
            lastName : 'Smith'
        }
    ];

    handleRowAction (event) {
        const actionName = event.detail.action.name;
        const rowId = event.detail.row.Id;
        const name = event.detail.row.FirstName;
        console.log(actionName);
        switch(actionName){
            case 'edit':
                console.log('modal abierto desde edit');
                console.log('modal abierto desde Show Details' + rowId + name);
                this.record = rowId;
                this.title = 'Edit Record';
                this.handleOpenModal();
                
                break;
            case 'showDetails':
                this.handleOpenModal();
                this.title = 'Show Details'
                break;
        }
    }


    handleOpenModal () {        
        this.displayModal = true;
    }
    handleCloseModal (event) {
        const actionMessage = event.detail.message;
        const flag = event.detail.flag;
        console.log(actionMessage);
        this.displayModal = flag;
    }

    async obtainContacts () {
        try {
            const contacs = await getContacts();
            this.lstcontacts = contacs;
        } catch (error) {
            console.error(error);
        }
    }
    handleSucces (Modalevent) {
        try {
            const record = Modalevent.detail.record;
        console.log('record from form', record);
        console.log('list',this.lstcontacts);
        this.displayModal = false;
        const maprecord = {
            FirstName: record.FirstName.value,
            LastName: record.LastName.value,
            Email: record.Email.value,
            Phone: record.Phone.value,
            Id: "003ak000000PBxxAAG"
        }
        this.lstcontacts = this.lstcontacts.map(contact => (contact.Id == maprecord.Id) ? maprecord : contact);
        } catch (error) {
            console.error();
        }
    }

}
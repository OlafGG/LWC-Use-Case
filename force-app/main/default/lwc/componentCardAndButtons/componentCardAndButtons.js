import { LightningElement } from 'lwc';

export default class ComponentCardAndButtons extends LightningElement {

    handleOpenButton () {
        console.log('Open');
        this.handleOpenModal();
    }
    handleEditButton () {
        console.log('Edit');
        this.handleOpenModal();
    }
    handleUpdateButton () {
        console.log('Update');
        this.handleOpenModal();
    }
    displayModal = false;

    handleOpenModal () {
        this.displayModal = true;
    }

}
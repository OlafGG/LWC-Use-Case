import { LightningElement, api } from 'lwc';

export default class SampleLightningForm extends LightningElement {
    @api record;
    
    handleSuccess (event) {
        console.log('Registro actualizado ', event.detail.fields );
        const successEvent = new CustomEvent("success",{
            detail: {
                record: event.detail.fields
            }
        });
        this.dispatchEvent(successEvent);
    }
}
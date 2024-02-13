import { LightningElement, api } from 'lwc';

export default class SampleLightningModal extends LightningElement {
    @api record;
    @api modalTitle = "";
    handleCancelButton(){
        const event =  new CustomEvent("cancelmodalbutton", {
            detail: {
                message: 'Cancel from Modal',
                flag: false
            }
        });
        this.dispatchEvent(event);
    }

    handleSucces (event) {
        const successEvent = new CustomEvent("success",{
            detail: {
                record: event.detail.record
            }
        });
        this.dispatchEvent(successEvent);
    }
}
import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {

    _resource = {
        name: null
    };

    handleUpdate(event) {
        const selectedRecord = event.detail.selectedRecord;

        if (selectedRecord) {
            this._resource.name = selectedRecord.Id;
        } else {
            this._resource.name = null;
        }

        console.log(
            'Name: ',
            this._resource.name
        );
    }
}

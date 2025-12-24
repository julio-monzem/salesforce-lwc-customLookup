import { LightningElement, track } from 'lwc';

export default class ParentComponent extends LightningElement {

    @track _resource = {
        resourceId: null
    };

    accountName;
    accountId;

    get hasAccSelected() {
        return !!this.accountId;
    }

    handleUpdate(event) {
        const selectedRecord = event.detail.selectedRecord;
        if (selectedRecord) {
            this._resource.Id = selectedRecord.Id;
            this.accountId = selectedRecord.Id;
            this.accountName = selectedRecord.Name;
        } else {
            this._resource.Id = null;
            this.accountId = null;
            this.accountName = null;
        }
    }
}

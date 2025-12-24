import { LightningElement, api, wire, track } from 'lwc';
import fetchLookupData from '@salesforce/apex/CustomLookupController.fetchLookupData';
import fetchDefaultRecord from '@salesforce/apex/CustomLookupController.fetchDefaultRecord';

const DELAY = 300;

export default class CustomLookup extends LightningElement {

    @api label;
    @api placeholder = 'Pesquisar...';
    @api iconName = 'standard:account';
    @api sObjectApiName = 'Account';
    @api isDisabled = false;
    @api isRequired = false;
    @api isNotValid = false;

    @track _defaultRecordId;
    searchKey = '';
    lstResult = [];
    selectedRecord = {};
    hasRecords = true;
    isSearchLoading = false;
    delayTimeout;

    @api
    get defaultRecordId() {
        return this._defaultRecordId;
    }
    set defaultRecordId(value) {
        this._defaultRecordId = value;
        this.fetchDefaultRecord();
    }

    connectedCallback() {
        this.fetchDefaultRecord();
    }

    get formElementClass() {
        return this.isNotValid
            ? 'slds-form-element slds-has-error'
            : 'slds-form-element';
    }

    get hasMeta() {
        return new Set(['CustomObject__c'])
            .has(this.sObjectApiName);
    }

    get mediaClass() {
        return this.hasMeta
            ? 'slds-media slds-listbox__option slds-listbox__option_has-meta'
            : 'slds-media slds-listbox__option';
    }

    fetchDefaultRecord() {
        if (!this._defaultRecordId) {
            this.handleRemove();
            return;
        }

        this.isSearchLoading = true;
        fetchDefaultRecord({
            recordId: this._defaultRecordId,
            sObjectApiName: this.sObjectApiName
        })
        .then(result => {
            this.isSearchLoading = false;
            if (result) {
                this.selectedRecord = result;
                this.handelSelectRecordHelper();
            }
        })
        .catch(() => {
            this.isSearchLoading = false;
            this.selectedRecord = {};
        });
    }

    @wire(fetchLookupData, {
        searchKey: '$searchKey',
        sObjectApiName: '$sObjectApiName'
    })
    wiredSearch({ data }) {
        this.isSearchLoading = false;
        if (data) {
            this.hasRecords = data.length > 0;
            this.lstResult = data.map(item => {
                if (this.sObjectApiName === 'CustomObject__c') {
                    item.meta = item.CustomField__c;
                }
                return item;
            });
        }
    }

    handleKeyChange(event) {
        window.clearTimeout(this.delayTimeout);
        const value = event.target.value;
        this.isSearchLoading = true;
        this.delayTimeout = setTimeout(() => {
            this.searchKey = value;
        }, DELAY);
    }

    toggleResult(event) {
        const container = this.template.querySelector('.lookupInputContainer');
        const source = event.target.dataset.source;

        if (source === 'searchInputField') {
            container.classList.add('slds-is-open');
        } else {
            container.classList.remove('slds-is-open');
        }
    }

    handelSelectedRecord(event) {
        const recordId = event.currentTarget.dataset.recid;
        this.selectedRecord = this.lstResult.find(r => r.Id === recordId);
        this.lookupUpdateHandler(this.selectedRecord);
        this.handelSelectRecordHelper();
    }

    handleRemove() {
        this.selectedRecord = {};
        this.searchKey = '';
        this.lookupUpdateHandler(undefined);
    }

    handelSelectRecordHelper() {
        this.template.querySelector('.lookupInputContainer')
            .classList.remove('slds-is-open');
    }

    lookupUpdateHandler(value) {
        this.dispatchEvent(
            new CustomEvent('lookupupdate', {
                detail: { selectedRecord: value }
            })
        );
    }
}

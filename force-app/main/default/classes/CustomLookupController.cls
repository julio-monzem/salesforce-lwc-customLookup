public class CustomLookupController {

    @AuraEnabled(cacheable=true)
    public static List<sObject> fetchLookupData(String searchKey, String sObjectApiName) {
        Filters filters = addFilter(sObjectApiName);
        String wildcard = '%' + searchKey + '%';

        String query =
            'SELECT Id, Name ' + filters.addFields +
            ' FROM ' + sObjectApiName +
            ' WHERE (Name LIKE :wildcard ' + filters.addFilter +
            ' ORDER BY Name ASC LIMIT ' + filters.resultQty;

         query = 'SELECT Id, Name FROM ' + sObjectApiName + ' WHERE Name LIKE :wildcard ORDER BY Name ASC LIMIT 6';

        System.debug(query);
        return Database.query(query);
    }

    @AuraEnabled
    public static sObject fetchDefaultRecord(String recordId, String sObjectApiName) {
        if (String.isBlank(recordId)) return null;

        Filters filters = addFilter(sObjectApiName);
        String query =
            'SELECT Id, Name ' + filters.addFields +
            ' FROM ' + sObjectApiName +
            ' WHERE Id = :recordId LIMIT 1';

        List<sObject> result = Database.query(query);
        System.debug(query);
        return result.isEmpty() ? null : result[0];
    }

    private static Filters addFilter(String sObjectApiName) {
        Filters f = new Filters();
        f.addFields = '';
        f.addFilter = '';
        f.resultQty = '6';

        if (sObjectApiName == 'CustomObject__c') {
            f.addFields = ', CustomField__c';
            f.addFilter =
                ' OR CustomObject__c LIKE :wildcard)';
            f.resultQty = '10';
        }

        if (sObjectApiName == 'Opportunity') {
            f.addFields = ', StageName, Amount, CloseDate';
            f.addFilter =
                ' OR StageName LIKE :wildcard) ' +
                'AND IsClosed = false';
            f.resultQty = '10';
        }

        return f;
    }

    public class Filters {
        public String addFields;
        public String addFilter;
        public String resultQty;
    }

}
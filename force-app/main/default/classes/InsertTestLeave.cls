public with sharing class InsertTestLeave {
    public static void run() {
        LeaveRequest__c lr = new LeaveRequest__c(
            User__c = UserInfo.getUserId(),
            From_Date__c = Date.today(),
            To_Date__c = Date.today().addDays(1),
            Reason__c = 'Test leave',
            Status__c = 'Pending'
        );
        insert lr;
    }
}

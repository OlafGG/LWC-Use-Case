public with sharing class lightningTableController {
    @AuraEnabled
    public static List<Contact>  getContacts() {
        try {
            List<Contact> lstcontacts = [SELECT FirstName, LastName, Email, Phone FROM Contact LIMIT 20];
            System.debug(lstcontacts);
            return lstcontacts;
        } catch (Exception e) {
            System.debug(e.getMessage());
            throw e;
        }
    }

    @AuraEnabled
    public static Contact contactUpdate(String IdContact, String FirstNameC, String LastNameC, String EmailC, String PhoneC){
        try {
            
        
        //Contact contactToUpdate =  [SELECT FirstName, LastName, Email, Phone FROM Contact WHERE Id =: IdContact LIMIT 10];
            // Crear una nueva instancia de Contacto con el ID proporcionado
        //Contact contactToUpdate = [SELECT FirstName, LastName, Email, Phone FROM Contact WHERE Id =: IdContact];
         Contact contactToUpdate = new Contact(Id = IdContact);
        // Asignar los nuevos valores a los campos del contacto
        contactToUpdate.FirstName = FirstNameC;
        contactToUpdate.LastName = LastNameC;
        contactToUpdate.Email = EmailC;
        contactToUpdate.Phone = PhoneC;

        
        
        // Actualizar el contacto en Salesforce
        update contactToUpdate;
        return contactToUpdate;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    //FUNCIONA
    @AuraEnabled
    public static Contact createContact(String firstName, String lastName, String email, String phone){
        try {
            // Crear una nueva instancia de Contacto con los valores proporcionados
            Contact newContact = new Contact(
                FirstName = firstName,
                LastName = lastName,
                Email = email,
                Phone = phone
            );
            
            // Insertar el nuevo contacto en Salesforce
            insert newContact;
            return newContact;
            
            // Puedes agregar lógica adicional aquí, como mensajes de registro o manejo de excepciones
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


    //FUNCIONA
    @AuraEnabled
    public static Contact deleteUpdate(String contactId){
        try {
             // Crear una nueva instancia de Contacto con el ID proporcionado
            Contact contactToDelete = new Contact(Id = contactId);
            
            // Eliminar el contacto de Salesforce
            delete contactToDelete;
            return contactToDelete;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


}



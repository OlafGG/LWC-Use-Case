export function mapFields(contactList) {
    const data = contactList.map(contact => {
        const record = {
            "Id": contact.Id,
            "firstName": contact.FirstName,
            "lastName": contact.LastName,
            "email": contact.Email,
            "phone": contact.Phone
            };
            return record;
    });
    return data;
}

export function mapFieldsContacts(updatedData) {
    const record = {
        "Id": updatedData.Id,
        "FirstName": updatedData.firstName,
        "LastName": updatedData.lastName,
        "Email": updatedData.email,
        "Phone": updatedData.phone
        };
        return record;
}

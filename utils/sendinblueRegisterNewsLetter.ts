/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import SibApiV3Sdk from 'sib-api-v3-sdk'
const defaultClient: any = SibApiV3Sdk.ApiClient.instance

// Configure API key authorization: api-key
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const apiKey = defaultClient.authentications['api-key']
apiKey.apiKey = process.env.NEXT_PUBLIC_SENDINBLUE_API_KEY

console.log(apiKey);

const apiInstance = new SibApiV3Sdk.ContactsApi()
const createContact = new SibApiV3Sdk.CreateContact()

const sendinblue = (email: string) => {
  createContact.email = email
  apiInstance.createContact(createContact).then(function(data) {
      console.log(`${email} registered successfully`);
      return true;
    }, function(error) {
      console.error(error);
      return false;
    });
}

export default sendinblue
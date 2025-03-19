import { baseUrl } from '@/utils/baseUrl';
import { vendors } from '@/utils/routes';
import axios from 'axios';


export const createNewVendors = async () => {
   
    try {
        const url = `${baseUrl}${vendors}`
       const payload =  {
            "password": "stringst",
            "emailAddress": "string",
            "firstName": "string",
            "businessName": "string",
            "lastName": "string",
            "phoneNumber": "+.8(09 --745(3",
            "profilePicture": "string"
          };

          const response = axios.post(url, payload);
          console.log(response);
      }
      catch(err) {
        console.log(err);
      }


}
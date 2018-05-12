
async checkCreatedLeadName(version,receive_phone,numOfTries) {

           if(++numOfTries < 5){
             await this.api.useXpath();
             await this.setLeadData(`//*[contains(@id,"lead-gridview")]//tr[@data-key][1]//*[@class="grid-email"]`,'gottenEmail');
             switch(version){
               case 'v1':
                 var currentCheckedEmail = await store.get('lead_api_email_v1');
                 break;
               case 'v2':
                 var currentCheckedEmail = await store.get('lead_api_email_v2');
                 break;
               default:
                 var currentCheckedEmail = await store.get('lead_api_email');
                 break;
             }

             let sendedEmail = await store.get('gottenEmail');
             console.log(currentCheckedEmail);

             switch(currentCheckedEmail){
               case sendedEmail:
                 break;
               default:
                 await this.navigate();
                 await this.checkCreatedLeadName(version,receive_phone,numOfTries);
             }

             await this.api.useCss();
           }else{
             throw new Error ('  √ Connection with BO is absent!');
           }

         },
export const USER_INFORMATION_MOCK = {
    success: [{
      userId: '1',
      names: 'Mocked Name',
      lastName: 'Mocked Lastname',
      email: 'mocked@mock.com',
      mobileNumber: '******123',
      dateEnrollment: '26/08/2019',
      documentType: 'C',
      documentNumber: '84707052',
      homeAddress: 'Dirección',
      hashCode: '0e210c38-6f66-4a5a-9daf-17e2f0aa88b5'
    }],
    failures: [
      {
        code: 500,
        errorMessage: 'error'
      }
    ]
  };
  
  export const USER_HASH_INFORMATION_MOCK = {
      success: [
        {
          code: 1,
          errorMessage: 'OK'
        },
        {
          code: 0,
          errorMessage: 'FAILURE'
        },
      ],
      failures: [{
        code: 0,
        errorMessage: 'FAILURE'
      }],
  
  };
  
  export const HASH_USER_INFORMATION_MOCK = {
    success: [{
      email: 'Alex*************@gmail.com',
      mobileNumber: '987258***',
      hashCode: '09504859-8b15-4523-a79d-7e28a90fa81d'
    }],
    failures: [
      {
        code: 500,
        errorMessage: 'error'
      }
    ]
  
  };
  
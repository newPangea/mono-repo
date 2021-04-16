// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  fire: {
    apiKey: 'AIzaSyCbu9ZnwfPHamcF83bW29Bhvqwfc75mOqc',
    authDomain: 'newpangea-dev.firebaseapp.com',
    projectId: 'newpangea-dev',
    storageBucket: 'newpangea-dev.appspot.com',
    messagingSenderId: '589660899480',
    appId: '1:589660899480:web:8d774b0e73e6004c6328ed',
    measurementId: 'G-EFG3311SJH',
  },
  emulate: false,
  agmapKey: 'AIzaSyC9aRHf8SS9ZQ2kLESnX1RqJmbxFmkYZco&libraries=places',
  algolia: {
    apiKey: 'e5336aaf9c29f80fdebd97748ccfeb4c',
    appId: '97BKXDYV1A',
  },
  userAlgoliaIndex: 'qa_USER',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

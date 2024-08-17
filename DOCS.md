# Documentation

## Alerts
The alter system is a toast coming from the top of the page.
It's managed in ```@/components/Alert.tsx && @/components/AlertContext.tsx```.
**Alert.tsx** contains the actual styling of the Alert
**AlertContext.tsx** contains the behaviour information and the context item
The entire site is wrapped in alert context, so to show an alert, do the following:

```javascript
import {useContext} from 'react';
import {AlertContext} from '@/components/AlertContext';
const {showAlert} = useContext(AlertContext);

showAlert('warning', 'This is a warning!');
```

## Database
This section details information about each MongoDB collection
### accounts
auth.js generated collection containing information about each oauth and email auth account. Should never be directly editted.
### sessions
auth.js generated collection containing JWT's and other session information. Should never be directly editted.
### users
auth.js generated collection containing information about users provided by the login provider (ie linkedin, google). While this can be (and previously was) directly edited to contain profile information, it no longer is. This collection should not be directly editted, and extra information about the user should instead be stored in profiles
### profiles
Profiles contains all information about each user that is not authentication related.
### outreaches
Outreaches contains all outreach items for user profiles. Each document is a distinct outreach a user has entered.
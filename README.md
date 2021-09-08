# Assignment 2: Data Entry System

This app contains records on various people. Entries can be added, edited, or deleted via the frontend page. This app uses various CSS rules to make a cohesive, intuitive user experience. In particular, this app uses lots of `flexbox` rules to neatly order components on the screen.

## External Libraries

In addition to the starter code, this project uses two additional libraries.

- `uuid` is used to generate a unique code for each entry in the dataset. Since each entry has its own UUID, the user doesn't need to worry about things like duplicate names being confused by the server. Even 2 identical entries will be distinct on the server side.
- `url` is a handy library for parsing url strings. This is useful on the server side because the app uses 2 endpoints:
  - `/` for serving the frontend index.html
  - `/data` for the REST API (all data modifications go here)

## Technical Achievements

- The frontend allows for data entry, edits, and deletions. All changes are sent to the server immediately, and the page only updates when the server responds. The changes are NOT only UI -- any change to the data that is visible on the frontend will have been registered by the server

## Design/UX

- Jared Poulos and my roommate Zack both tested my app and gave important feedback on the user experience. In particular, my first iteration's editing system was counter-intuitive and got users stuck. With color coded buttons, the user now has clear control over the editing system, and has the option to exit at any time.

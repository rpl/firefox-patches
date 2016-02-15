# hybrid-addon-example

A skeleton hybrid addon based on Addon SDK and WebExtension APIs.

- ```install.rdf``` - embedded webextension enabled using the ```enableWebextensionTransitionContext``` property
- ```index.js``` - main legacy entry point (Addon SDK APIs)
- ```package.json``` - main legacy addon manifest
- ```manifest.json``` - new webextension addon manifest
- ```background-page.js``` - new webextension background page
- ```content-script.js``` - new webextension content script

- ```bootstrap.js``` - a unmodified copy of the Addon SDK manifest (needed to be able to add the addon from the about:debugging page)

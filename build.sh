#!/bin/bash

# Package chome extenstion
zip -r chrome-extension.zip chrome-extension-sample

# Package Firefox extension
cd firefox-extension-sample
zip firefox-screenshare.xpi bootstrap.js install.rdf
mv firefox-screenshare.xpi ..
cd ..
echo
echo
echo "*************************************************************************"
echo "********* DO NOT FORGET TO UPDATE firefoxExtensionHash IN settings.json "
echo "********* AFTER EXTENSION IS REVIEWED:"
echo "https://addons.mozilla.org/firefox/downloads/latest/669945/addon-669945-latest.xpi"
echo "sha1sum addon-669945-latest.xpi"
echo "*************************************************************************"

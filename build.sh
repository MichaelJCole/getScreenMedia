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
echo "********* OR SCREEN SHARING INSTALLATION WILL FAIL"
echo "*************************************************************************"

sha1sum *.xpi 

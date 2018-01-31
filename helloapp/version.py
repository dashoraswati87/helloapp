#!/usr/bin/python
print 'Content-type: text/html\n\n'

import sys
print '<b>This is a test Python Script</b><br>'
print 'The Python version is: ' + str(sys.version_info[0]) + '.' + str(sys.version_info[1]) + '.' + str(sys.version_info[2]) + '<br>'
print 'Loaded modules: <br>'
for i in sys.modules.keys():
 print i + '<br>'
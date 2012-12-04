# Import app
from flasknotes import app

# Import for operating system
# Mostly for compiling jade templates before running the application
import os

# Compile jade templates before starting/restarting the server
# Node.js command; run js script; template location dir; compiled template location dir
os.system("node utils/jade_compile.js flasknotes/templates/ flasknotes/static/js/") # WINDOWS
#os.system("nodejs utils/jade_compile.js flasknotes/templates/ flasknotes/static/js/") # LINUX
print "Generating templates completed."
# This script (jade_compile.js) is made by PaBa for converting jade templates
#  to js functions

# Run application with debugging enabled/disabled
app.run(debug=True)
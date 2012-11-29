# flasknotes

**Technology showcase for flask, sqlalchemy, marionette.js, jade templates, bootstrap and sqlite**.
This is a simple web application for creating notes. Users first have to register, then log in and start creating notes. This application is created for learing marionette.js.

# Quick notes

- this showcase contains highly commented source code, so you can easily find your way around the code
- read **Setup** part to correctly configure your environment


# Requirements

- **Python 2.7** (I think every 2.x version should work) [Download page](http://www.python.org/download/)
- **Python pip** (for installing required packages) [Installation instruction](http://flask.pocoo.org/docs/installation/#windows-easy-install)
- **Windows** or **Linux** operating system (different virtualenv activation command)

# Setup

Clone the project from github.
```
git clone https://github.com/mabasic/flasknotes.git
```

Install the following in exact order:

## Virtualenv

```
pip install virtualenv
```

Inside the cloned project directory:

### Virtualenv usage (Linux)

- Create virtualenv environment
- Activate virtualenv environment

```
virtualenv ENV
source ENV/bin/activate
```

- When you want to stop working on this project, just type:

```
deactivate
```

### Virtualenv usage (Windows)

- Create virtualenv environment
- Activate virtualenv environment

```
virtualenv venv
venv\scripts\activate
```

- When you want to stop working on this project, just type:

```
deactivate
```

## Installing requirements.txt using pip

Having virtualenv activated type the following:

```
pip install -r requirements.txt
```

This will install all neccessary requirements for this project except node.js.

## Installing node.js 

**Required for compiling jade templates**

[Download page](http://nodejs.org/download/)


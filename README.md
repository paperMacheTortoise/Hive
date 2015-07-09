# BizGram

> Collaboration and analytics platform

## Guidelines for usign waffle, making a commit and pull-request

Fork to your github repo
Clone to your local machine
Set upstream master: "git remote add upstream https://github.com/paperMacheTortoise/bizGram.git"


## Branch names
feat/ fix/ refactor/ cleanup/ doc/

## Commit msgs: start with () and close waffle issue accordingly
(feat) (fix) (refactor) (cleanup) (test) (doc)

## branching, commit, pull-request checklist
1) Create a new branch: 'git checkout -b 'doc/readme "
2) Review the waffle issues before making your commit: https://waffle.io/paperMacheTortoise/bizGram
3) Commit with waffle issue number (if applicable): "(doc) update readme close #8"
4) Make sure to rebase: "git pull --rebase upstream master"
5) Push to your fork: "git push origin doc/readme"
6) Make a pull request from your fork.
7) Notify the team on slack. Please don't merge your own pull request, let another team member review the change and merge.

## Team

  - __Product Owner__: Austin Worachet, Danielle Blank
  - __Scrum Master__: Liam Gallivan
  - __Development Team Members__: Richard Stanley, Karianne Burns


## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Setting up the database environemnt](#setting-up-the-database-environment)
    1. [Database development support](#database-development-support)
    1. [Working with the database](#working-with-the-database)
    1. [Emulating in the browser](#emulating-in-the-brower)
    1. [Emulating for iOS](#emulating-for-ios)
    1. [Emulating for Android](#emulating-for-android)
1. [Contributing](#contributing)
1. [API Documentation](#api-documentation)

## Usage

Platform for a team to collaborate.
Less email. More productivity.
Managers can generate report visualization from QuickBooks, social media.

## Requirements

- Node
- Express
- Firebase
- AngularJS
- React
- D3

## Development


### Installing Dependencies

From within the root directory:


### Database Development Support


### Roadmap

View the project roadmap [here](https://github.com/paperMacheTortoise/bizGram/issues)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

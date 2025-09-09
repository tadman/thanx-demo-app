# Thanx Demo App

A simple Rails 8 application with a React front-end that provides a small
proof of concept for a rewards redemption platform.


Using the seeded database you should be able to login in using:

* Username: `test@example.com`
* Password: `example`

Where these are defined in `db/seeds.rb`.

## Configuration

Begin by adapting the configuration files, though since this is a SQLite3
project by default, the examples should work fine as-is.

Then install pre-requisites for Ruby and Node:

```shell
bundle install
yarn install
```

### Server

```shell
bin/dev
```

## Development

To spin up a local database:

```shell
rails db:migrate db:seed db:test:prepare
```

### Testing

Use `rspec` to validate functionality:

```shell
rspec
```

### Linting

```shell
rubocop
yarn lint
```

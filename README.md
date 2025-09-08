# Thanx Demo App

A simple Rails 8 application with a React front-end that provides a small
proof of concept for a rewards redemption platform.

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

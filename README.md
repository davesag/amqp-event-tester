# amqp-event-tester

[![Greenkeeper badge](https://badges.greenkeeper.io/davesag/amqp-event-tester.svg)](https://greenkeeper.io/)

A simpleAMQP event listener that can be configured to listen for your event emitter's events and return a configurable test result. Use this for integration testing of your event emitters.

## Branches

| Branch | Tests | Code Coverage | Comments |
| ------ | ----- | ------------- | ---------|
| `develop` | [![CircleCI](https://circleci.com/gh/davesag/amqp-event-tester/tree/develop.svg?style=svg)](https://circleci.com/gh/davesag/amqp-event-tester/tree/develop) | [![codecov](https://codecov.io/gh/davesag/amqp-event-tester/branch/develop/graph/badge.svg)](https://codecov.io/gh/davesag/amqp-event-tester) | Latest Staging Release |
| `master` | [![CircleCI](https://circleci.com/gh/davesag/amqp-event-tester/tree/master.svg?style=svg)](https://circleci.com/gh/davesag/amqp-event-tester/tree/master) | [![codecov](https://codecov.io/gh/davesag/amqp-event-tester/branch/master/graph/badge.svg)](https://codecov.io/gh/davesag/amqp-event-tester) | Latest Production Release |

## Docker Image

* [`davesag/amqp-event-tester`](https://hub.docker.com/r/davesag/amqp-event-tester/)

## Configuration

Set the following environment variables

|Variable      |Default     |Notes     |
|--------------|------------|----------|
|`AMQP_URL`    |`amqp://127.0.0.1`|The url of the AMQP message queue to use.|
|`EXCHANGE`    | `amqp-test` |The name of the exchange.|
|`EVENTS`| `none`|Base64 encoded JSON object describing the events to listen for and the responses to emit.|

### Configuring events

Supply an environment variable as follows

```
EVENTS=xxx
```

Where `xxx` is a Base64 encoded JSON in the form:

```
{
  [eventKey]: {
    queue: 'Queue to listen on',
    response: 'event to respond with'
  },
  ...
}
```

#### Example

```
EVENTS=eyJyZWdpc3RlciI6eyJxdWV1ZSI6IlJFR0lTVFJBVElPTiIsInJlc3BvbnNlIjoicmVnaXN0ZXJlZCJ9LCJkaXNtaXNzIjp7InF1ZXVlIjoiRElTTUlTU0FMIiwicmVzcG9uc2UiOiJkaXNtaXNzZWQifX0=
```

Decodes to

```
{
  register: {
    queue: 'REGISTRATION',
    response: 'registered'
  },
  dismiss: {
    queue: 'DISMISSAL',
    response: 'dismissed'
  }
}
```

This tells the event tester to

* listen for `register` on queue `REGISTRATION` and, when it hears it, respond with key `registered`, and
* listen for `dismiss` on queue `DISMISSAL` and, when it hears it, respond with key `dismissed`

## Development

You may add environment variables to your local `.env` file

### Prerequisites

* [NodeJS](htps://nodejs.org), version 10+ (I use [`nvm`](https://github.com/creationix/nvm) to manage Node versions — `brew install nvm`.)
* [Docker](https://www.docker.com) (if on a Mac then use [Docker for Mac](https://docs.docker.com/docker-for-mac/), not the homebrew version)

### Initialisation

    npm install

### Starting the server

    npm start

### Test it

* `npm test` — runs the unit tests (quick)

or run `npm run backend` to start the essential services, then:

* `npm run test:integration` — runs the integration tests (not so quick)

### Lint it

    npm run lint

To auto-fix linting issues.

    npm run lint -- --fix

### Make the code prettier

This runs on every commit but you can do this manually as well via:

    npm run prettier

## Contributing

Please see the [contributing notes](CONTRIBUTING.md).

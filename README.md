# amqp-event-tester

An `AMQP` `topic` exchange event listener that can be configured to listen for your event emitter's events and, optionally, return a configurable test result. Use this for integration testing of your event emitters.

## Why?

When running integration tests of code that emits persistent messages to an `AMQP` message queue via a `topic` exchange, you don't want to leave messages in the queue, as that will cause confusion the next time you run your tests. Instead you need to be able to pull those messages from the queue.

A typical workflow often involves emitting a message designed to be consumed by another service, which will then emit a response message when it's done what it needs to do. To properly integration-test the entire round-trip it's desirable to have a mock service that emits a response message that your service listens for.

## Limitations of this tester.

I've built this to test some specific microservices I am working on, and so appreciate it's not useful for a range of other scenarios, such as `direct` or `fanout` exchanges, or services that look for a `replyTo` header to use to emit response messages to.

If you need this kind of flexibility feel free to fork this repo and contribute a PR. See the [contributing notes](CONTRIBUTING.md) for details.

## Docker Image

- [`davesag/amqp-event-tester`](https://hub.docker.com/r/davesag/amqp-event-tester/)

## Configuration

Set the following environment variables

<!-- prettier-ignore -->
|Variable  |Default           |Notes |
|----------|------------------|------|
|`NODE_ENV`|`development`     |Change this to `test` if using this to run against integration tests.|
|`AMQP_URL`|`amqp://127.0.0.1`|The url of the AMQP message queue to use.|
|`EXCHANGE`|`amqp-test`       |The name of the exchange.                |
|`EVENTS`  |`none`            |Base64 encoded JSON object describing the events to listen for and, optionally, the responses to emit.|

### Configuring events

Supply an environment variable as follows

```sh
EVENTS=xxx
```

Where `xxx` is a Base64 encoded JSON in the form:

```js
{
  [eventKey]: {
    queue: 'queue to listen to',
    response: 'event to respond with',
    data: { some: 'data to respond with' }
  },
  ...
}
```

#### Example

```sh
EVENTS=eyJyZWdpc3RlciI6eyJxdWV1ZSI6IlJFR0lTVFJBVElPTiIsInJlc3BvbnNlIjoicmVnaXN0ZXJlZCIsImRhdGEiOnsidXJsIjoiaHR0cDovL2xvY2FsaG9zdDo5MDkwIn19LCJkaXNtaXNzIjp7InF1ZXVlIjoiRElTTUlTU0FMIn19
```

Decodes to

```js
{
  register: {
    queue: 'REGISTRATION',
    response: 'registered',
    data: {
      url: 'http://localhost:9090'
    }
  },
  dismiss: {
    queue: 'DISMISSAL'
  }
}
```

This tells the event tester to

- listen for `register` on queue `REGISTRATION` and, when it hears it, respond with key `registered` and data `{ url: 'http://localhost:9090' }`, and
- listen for `dismiss` on queue `DISMISSAL`, but do not respond.

#### Events that do not require a response

If your event does not require any sort of response then you can simply leave out the `response` and `data` fields. This will tell the tester to just pull the message from the queue, so you don't end up with a load of stray messages littering your queue.

## Development

[![Greenkeeper badge](https://badges.greenkeeper.io/davesag/amqp-event-tester.svg)](https://greenkeeper.io/)

## Branches

<!-- prettier-ignore -->
| Branch | Tests | Code Coverage | Comments |
| ------ | ----- | ------------- | ---------|
| `develop` | [![CircleCI](https://circleci.com/gh/davesag/amqp-event-tester/tree/develop.svg?style=svg)](https://circleci.com/gh/davesag/amqp-event-tester/tree/develop) | [![codecov](https://codecov.io/gh/davesag/amqp-event-tester/branch/develop/graph/badge.svg)](https://codecov.io/gh/davesag/amqp-event-tester) | Latest Staging Release |
| `master` | [![CircleCI](https://circleci.com/gh/davesag/amqp-event-tester/tree/master.svg?style=svg)](https://circleci.com/gh/davesag/amqp-event-tester/tree/master) | [![codecov](https://codecov.io/gh/davesag/amqp-event-tester/branch/master/graph/badge.svg)](https://codecov.io/gh/davesag/amqp-event-tester) | Latest Production Release |

### Prerequisites

- [NodeJS](htps://nodejs.org), version 12.13.0 (LTS)+ (I use [`nvm`](https://github.com/creationix/nvm) to manage Node versions — `brew install nvm`.)
- [Docker](https://www.docker.com) (if on a Mac then use [Docker for Mac](https://docs.docker.com/docker-for-mac/), not the homebrew version)

### Initialisation

```sh
npm install
```

### Starting the server

You may add environment variables to a local `.env` file

```sh
npm start
```

**Note**: The Dockerised version will run the script `start.sh` to start the service, as this will wait for `RabbitMQ` to start. This is important when running this on a CI system.

### Test it

- `npm test` — runs the unit tests (quick)

or run `npm run backend` to start the essential services, then:

- `npm run test:integration` — runs the integration tests (not so quick)

### Lint it

```sh
npm run lint
```

To auto-fix linting issues.

```sh
npm run lint -- --fix
```

### Make the code prettier

This runs on every commit but you can do this manually as well via:

```sh
npm run prettier
```

## Contributing

Please see the [contributing notes](CONTRIBUTING.md).

# @suqingdong/use-eventsource

`@suqingdong/use-eventsource` is a custom React hook for managing Server-Sent Events (SSE) connections in React applications. This hook simplifies the process of establishing and handling SSE connections, allowing developers to easily integrate real-time data streaming into their React components.

## Installation

You can install `@suqingdong/use-eventsource` via npm:

```bash
npm install @suqingdong/use-eventsource
```

## Usage

```javascript
import { useEventSource } from '@suqingdong/use-eventsource';

const MyComponent = () => {
  const { data, reconnect, terminate } = useEventSource({ url: 'your-sse-endpoint' });

  return (
    <div>
      <p>Received data: {data}</p>
      <button onClick={reconnect}>Reconnect</button>
      <button onClick={terminate}>Terminate</button>
    </div>
  );
};

export default MyComponent;
```

Replace `'your-sse-endpoint'` with the URL of your Server-Sent Events endpoint.

## API

### useEventSource(options: EventSourceOptions): { data: string, reconnect: () => void, terminate: () => void }

#### Parameters

- `options` (EventSourceOptions): An object containing the following properties:
  - `url` (string): The URL of the Server-Sent Events endpoint.
  - `mode` (Mode): (optional) The mode of data reception. Can be `'chunk'` or `'add'`. Defaults to `'chunk'`.
  - `decodeData` (boolean): (optional) Whether to decode received data. Defaults to `true`.

#### Returns

An object containing the following properties:
- `data` (string): The received data.
- `reconnect` (function): A function to reconnect to the Server-Sent Events endpoint.
- `terminate` (function): A function to terminate the SSE connection.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

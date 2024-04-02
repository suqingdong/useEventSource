import { useState, useEffect } from 'react';

const base64DecodeAndUtf8Decode = (encodedStr: string): string => {
  const textDecoder = new TextDecoder();
  const bytes = Uint8Array.from(atob(encodedStr), c => c.charCodeAt(0));
  return textDecoder.decode(bytes);
}

type Mode = 'chunk' | 'normal';

interface EventSourceOptions {
  url: string;
  mode?: Mode;
  decodeData?: boolean;
}

const useEventSource = ({ url, mode = 'chunk', decodeData = true }: EventSourceOptions) => {
  const [data, setData] = useState<string>("");
  const [source, setSource] = useState<EventSource | null>(null);
  const [reconnectCounter, setReconnectCounter] = useState<number>(0);

  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onopen = () => {
      console.log(`Connected to ${url}.`);
    };

    eventSource.onmessage = event => {
      if (event.data === '[DONE]') {
        eventSource.close();
      } else {

        let decodedData: string = event.data;
        if (decodeData) {
          decodedData = base64DecodeAndUtf8Decode(event.data);
          console.log('>>> Decoded data:', decodedData);
        }

        if (mode === 'chunk') {
          setData(prevData => prevData + decodedData);
        } else {
          setData(decodedData);
        }
      }
    };

    eventSource.onerror = () => {
      console.log("An error occurred.");
    };

    eventSource.addEventListener('end', () => {
      console.log("Received end event, connection closed.");
      eventSource.close();
    });

    setSource(eventSource);

    return () => {
      eventSource.close();
    };
  }, [url, mode, decodeData, reconnectCounter]);

  const reconnect = () => {
    console.log("Reconnect request received.");
    setData("");
    setReconnectCounter(prevCounter => prevCounter + 1);
  };

  const terminate = () => {
    console.log('Terminate connection.');
    if (source) {
      source.close();
    }
  };

  return { data, reconnect, terminate };
}

export default useEventSource;

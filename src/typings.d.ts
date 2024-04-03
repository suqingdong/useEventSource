interface EventSourceOptions {
    url: string;
    mode?: 'chunk' | 'add';
    decodeData?: boolean;
}

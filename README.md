# b32

Base32 encoder and decoder for Deno

## Usage

```typescript
import { encode, decode } from 'https://deno.land/x/b32/b32.ts'

// encoding
encode('hello world') // NBSWY3DPEB3W64TMMQ

// encoding with padding
encode('hello world', true) // NBSWY3DPEB3W64TMMQ======

// decoding
decode('NBSWY3DPEB3W64TMMQ') // hello world

// decoding buffer format
decode('NBSWY3DPEB3W64TMMQ', 'buffer') // Uint8Array

// support emoji
encode('你好，🐒') // 4S62BZNFXXX3ZDHQT6IJE
```
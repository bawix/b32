// Copyright 2018-2020 @Orzv. All rights reserved. MIT license.

const dict = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'

/** Encoding source to Base32 */
export function encode(src: string | Uint8Array, padding: boolean = false): string {
	let arr: Array<number> = Array.from(
		typeof src === 'string' ? new TextEncoder().encode(src) : src
	)

	let str = arr.map(i => i.toString(2).padStart(8, '0')).join(''), res = ''
	for (let i = 0; i < Math.ceil(str.length / 5); i++) {
		let byte = str.slice(i * 5, i * 5 + 5)
		if (byte.length !== 5) byte = byte.padEnd(5, '0')
		let code = parseInt(byte, 2)
		res += dict[code]
	}
	return padding ? res.padEnd(Math.ceil(res.length / 8) * 8, '=') : res
}

/** Decoding Base32 to string or buffer. */
export function decode(src: string, output: OutputType = 'utf8'): string | Uint8Array {
	if (!/^[2-7a-z\=]*$/i.test(src)) throw new Error('Invalid format')
	let arr = Array.from(src.replace(/\=/g, '').toUpperCase()).map(i => dict.indexOf(i))
	let str = arr.map(i => i.toString(2).padStart(5, '0')).join(''), res = []
	for (let i = 0; i < Math.ceil(str.length / 8); i++) {
		res.push(parseInt(str.slice(i * 8, i * 8 + 8), 2))
	}
	if (output === 'buffer') return Uint8Array.from(res)
	else {
		let decoder = new TextDecoder
		return decoder.decode(Uint8Array.from(res).buffer)
	}
}

export type OutputType = 'utf8' | 'buffer'
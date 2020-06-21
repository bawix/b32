import { encode, decode } from './b32.ts'
import { assertThrows, equal } from 'https://deno.land/std/testing/asserts.ts'
import { runBenchmarks, bench } from 'https://deno.land/std/testing/bench.ts'

Deno.test('encode', (): void => {
	equal(encode('hello world'), 'NBSWY3DPEB3W64TMMQ')
})

Deno.test('decode', () => {
	equal(decode('NBSWY3DPEB3W64TMMQ'), 'hello world')
})

Deno.test('invalid decode format', () => {
	assertThrows(() => decode('12345'))
})

Deno.test('padding', (): void => {
	equal(encode('hello world', true), 'NBSWY3DPEB3W64TMMQ======')
})

Deno.test('decode padding format', () => {
	equal(decode('NBSWY3DPEB3W64TMMQ======'), 'hello world')
})

Deno.test('output buffer', (): void => {
	const res = '104,101,108,108,111,32,119,111,114,108,100,0'
	equal(new Array(decode('NBSWY3DPEB3W64TMMQ', 'buffer')).join(','), res)
})

Deno.test('CJK and emoji', (): void => {
	equal(encode('你好，世界，🐱😊'), '4S62BZNFXXX3ZDHEXCLOPFMM566IZ4E7SCY7BH4YRI')
	equal(decode('4S62BZNFXXX3ZDHEXCLOPFMM566IZ4E7SCY7BH4YRI'), '你好，世界，🐱😊')
})

bench({
	name: 'encoding benchmark',
	runs: 100,
	func(b): void {
		b.start()
		for (let i = 0; i < 10000; i++) encode('hello world')
		b.stop()
	}
})

bench({
	name: 'decoding benchmark',
	runs: 100,
	func(b): void {
		b.start()
		for (let i = 0; i < 10000; i++) decode('4S62BZNFXXX3ZDHEXCLOPFMM566IZ4E7SCY7BH4YRI')
		b.stop()
	}
})

console.log(await runBenchmarks())
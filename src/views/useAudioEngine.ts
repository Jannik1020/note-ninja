import { ref } from 'vue'

export function useAudioEngine() {
  const ctx = new AudioContext()
  const buffers = new Map<string, AudioBuffer>()

  async function load(name: string, url: string) {
    if (buffers.has(name)) return buffers.get(name)!

    const res = await fetch(url)
    const arr = await res.arrayBuffer()
    const buffer = await ctx.decodeAudioData(arr)
    buffers.set(name, buffer)
    return buffer
  }

  async function play(name: string) {
    if (ctx.state === 'suspended') {
      await ctx.resume()
    }

    const buffer = buffers.get(name)
    if (!buffer) return

    const src = ctx.createBufferSource()
    src.buffer = buffer
    src.connect(ctx.destination)
    src.start()
  }

  return { load, play }
}

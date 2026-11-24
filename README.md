# Pitch.io (Svelte)

A relative pitch and chord identification trainer. This is a Svelte rebuild of
[Pitch.io](https://pitch-io.vercel.app/), originally written in React at
HowdyHack 2021.

## Modes

- **Relative Pitch** (`/rp`): hear middle C as a reference, then name a mystery
  note within an octave either side of it.
- **Chords** (`/chords`): hear a C major reference, then name the root of a
  mystery major chord. Any octave of the root counts.
- **Sandbox** (`/sandbox`): play freely by clicking the keys or using the
  computer keyboard (`a w s e d f t g y h u j k o l p ;` run from C3 to E4).

## Running it

```sh
npm install
npm run dev
```

Then open http://localhost:5173.

| Command           | What it does                        |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start the dev server                |
| `npm run check`   | Type-check the project              |
| `npm run build`   | Build the static site into `build/` |
| `npm run preview` | Serve the built site locally        |

## How it is built

- SvelteKit 3 with Svelte 5 and TypeScript, prerendered with `adapter-static`.
- Sound comes from [WebAudioFont](https://github.com/surikov/webaudiofont), the
  wavetable player the original used through `midi-sounds-react`. The piano
  samples are downloaded from the WebAudioFont CDN when a page opens, so sound
  needs a network connection. WebAudioFont is GPL-3.0 licensed.
- `src/lib/audio.ts` loads the player and plays notes, `src/lib/music.ts` holds
  the note and chord logic, and `src/lib/keys.ts` holds the keyboard artwork.

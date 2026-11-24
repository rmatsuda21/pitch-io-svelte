// Sound comes from WebAudioFont, the wavetable player that the original
// app used through midi-sounds-react. The player is a classic script that
// defines globals, and each instrument is a script that defines one global
// preset, so both are loaded with script tags.
import playerUrl from 'webaudiofont/npm/dist/WebAudioFontPlayer.js?url';

interface Zone {
	buffer?: AudioBuffer;
}

interface Preset {
	zones: Zone[];
}

interface Player {
	adjustPreset(context: AudioContext, preset: Preset): void;
	queueChord(
		context: AudioContext,
		target: AudioNode,
		preset: Preset,
		when: number,
		pitches: number[],
		duration: number,
		volume?: number
	): unknown;
}

/** The two piano presets the original used (its instruments 4 and 3). */
export const INSTRUMENTS = {
	notes: '0000_GeneralUserGS_sf2_file',
	chords: '0000_FluidR3_GM_sf2_file'
} as const;

export type Instrument = keyof typeof INSTRUMENTS;

const PRESET_BASE = 'https://surikov.github.io/webaudiofontdata/sound/';
const VOLUME = 0.5;

let context: AudioContext | undefined;
let playerReady: Promise<Player> | undefined;
const presets = new Map<Instrument, Promise<Preset>>();

function globals(): Record<string, unknown> {
	return window as unknown as Record<string, unknown>;
}

function loadScript(src: string): Promise<void> {
	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = src;
		script.onload = () => resolve();
		script.onerror = () => reject(new Error(`Could not load ${src}`));
		document.head.appendChild(script);
	});
}

function getContext(): AudioContext {
	context ??= new AudioContext();
	return context;
}

function getPlayer(): Promise<Player> {
	playerReady ??= loadScript(playerUrl).then(() => {
		const PlayerClass = globals().WebAudioFontPlayer as new () => Player;
		return new PlayerClass();
	});
	return playerReady;
}

async function decoded(preset: Preset): Promise<void> {
	// adjustPreset decodes every zone in the background and reports nothing,
	// so wait until each zone has its buffer.
	while (!preset.zones.every((zone) => zone.buffer)) {
		await new Promise((resolve) => setTimeout(resolve, 50));
	}
}

function getPreset(instrument: Instrument): Promise<Preset> {
	let ready = presets.get(instrument);
	if (!ready) {
		const key = INSTRUMENTS[instrument];
		ready = Promise.all([getPlayer(), loadScript(`${PRESET_BASE}${key}.js`)]).then(
			async ([player]) => {
				const preset = globals()[`_tone_${key}`] as Preset;
				player.adjustPreset(getContext(), preset);
				await decoded(preset);
				return preset;
			}
		);
		// Let a later call try again if the download failed.
		ready.catch(() => presets.delete(instrument));
		presets.set(instrument, ready);
	}
	return ready;
}

/** Start downloading an instrument so the first note is not delayed. */
export function preload(instrument: Instrument): void {
	getPreset(instrument).catch((error) => console.error(error));
}

/**
 * Play MIDI pitches together for `duration` seconds.
 *
 * Browsers keep audio suspended until the user interacts with the page.
 * With `auto: true` (a sound nobody clicked for) the call is dropped while
 * audio is still suspended, so it does not pile up and play later.
 */
export async function play(
	instrument: Instrument,
	pitches: number[],
	duration: number,
	options: { auto?: boolean } = {}
): Promise<boolean> {
	const ctx = getContext();
	// resume() has to be called synchronously inside the click handler.
	const resumed = ctx.state === 'running' ? Promise.resolve() : ctx.resume();
	if (options.auto) {
		await Promise.race([resumed, new Promise((resolve) => setTimeout(resolve, 100))]);
		if (ctx.state !== 'running') return false;
	}
	try {
		const [player, preset] = await Promise.all([getPlayer(), getPreset(instrument)]);
		await resumed;
		player.queueChord(ctx, ctx.destination, preset, 0, pitches, duration, VOLUME);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}

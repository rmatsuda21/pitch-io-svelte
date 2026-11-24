/** MIDI number of the reference pitch, middle C (C4). */
export const REFERENCE = 60;

/** The keyboard and the questions span one octave either side of the reference. */
export const RANGE = 12;

const NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const;

export function noteName(midi: number): { name: string; octave: number } {
	return { name: NAMES[((midi % 12) + 12) % 12], octave: Math.floor(midi / 12) - 1 };
}

/** A random MIDI pitch within the keyboard, never the same as `previous`. */
export function randomPitch(previous: number | null): number {
	let pitch: number;
	do {
		pitch = Math.floor(Math.random() * (2 * RANGE + 1)) - RANGE + REFERENCE;
	} while (pitch === previous);
	return pitch;
}

export type ChordVariant = 'major' | 'minor';

export interface Chord {
	root: number;
	variant: ChordVariant;
}

const TRIADS: Record<ChordVariant, number[]> = {
	major: [0, 4, 7],
	minor: [0, 3, 7]
};

/**
 * The three pitches of a root-position triad. Roots above the reference are
 * dropped an octave so the chord stays within the keyboard.
 */
export function chordPitches(chord: Chord): number[] {
	const root = chord.root > REFERENCE ? chord.root - 12 : chord.root;
	return TRIADS[chord.variant].map((interval) => root + interval);
}

/** True when two pitches are the same note in any octave. */
export function samePitchClass(a: number, b: number): boolean {
	return (a - b) % 12 === 0;
}

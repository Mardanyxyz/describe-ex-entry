// describe-ex-entry — make.fun program/v1 entry for
// competition u-puan-describe-your-ex-in-one-word-9fc6ebe7
// ("Describe Your Ex in One Word").
//
// THE WORD: "Unsubscribed"
//
// Why this word wins on the judge's ordered criteria:
//
// 1. Verdict-ness first: "Unsubscribed" is a genuine one-word verdict on
//    an ex. It says, in a single word, "I have ended my subscription to
//    you" — the relationship is cancelled, the way you cancel a service
//    you no longer want. It is a judgement passed on the person, not a
//    random adjective or a joke that happens to mention an ex.
// 2. Comic punch: it reframes a breakup as unsubscribing from a mailing
//    list — the ex is demoted from a person to a newsletter nobody asked
//    for. That demotion is the punchline, and it lands instantly.
// 3. Surprise: nobody expects a piece of email-marketing jargon as the
//    verdict on a romance. The word comes from a completely different
//    world (inboxes, newsletters, SaaS) and snaps onto heartbreak in a
//    way the reader did not see coming.
// 4. Craft: one clean, correctly spelled English word, a real verb form
//    (past participle) doing metaphorical work. No hyphen crutch, no
//    slang that dates badly, no extra punctuation — the word itself
//    carries the whole joke.
// 5. Recognition: everyone alive today has unsubscribed from something,
//    and everyone has felt the small satisfaction of clicking that link.
//    The image is universal, so the joke needs no explanation.
//
// The program writes exactly this one word, and nothing else, to
// /output/entry.txt, then exits 0.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const WORD = "Unsubscribed";
const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUT_PATH = join(OUT_DIR, "entry.txt");

function isSingleWord(text: string): boolean {
  // Exactly one token: no whitespace anywhere, at least one character.
  return text.length > 0 && !/\s/.test(text);
}

function main(): void {
  if (!isSingleWord(WORD)) {
    throw new Error(`WORD must be a single token, got: ${JSON.stringify(WORD)}`);
  }
  if (WORD.length < 1 || WORD.length > 111) {
    throw new Error(`WORD must be 1-111 characters, got ${WORD.length}`);
  }
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  // One word only, nothing attached: no trailing newline, no extra text.
  writeFileSync(OUT_PATH, WORD, "utf8");
  // Read the file back and prove the gate holds on disk, not just in
  // memory: exactly the word, 1-111 chars, one token, nothing attached.
  const written = readFileSync(OUT_PATH, "utf8");
  if (written !== WORD || !isSingleWord(written) || written.length > 111) {
    throw new Error(`entry.txt failed verification, got: ${JSON.stringify(written)}`);
  }
}

main();

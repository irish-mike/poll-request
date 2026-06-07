import db from "./db.js";

type SeedPoll = {
    question: string;
    options: string[];
    voteCount: number;
};

const seedPolls: SeedPoll[] = [
    {
        question: "What is your favorite coding language?",
        options: ["Python", "TypeScript", "Go", "Rust"],
        voteCount: 25,
    },
    {
        question: "Which coding challenge makes you question your life choices?",
        options: [
            "FizzBuzz, but the rules keep changing",
            "Palindrome checker with cursed input",
            "Reverse a linked list from memory",
            "Binary search off-by-one nightmare",
            "Regex goblin mode",
        ],
        voteCount: 18,
    },
];

const insertPoll = db.prepare(`
    INSERT INTO polls (question)
    VALUES (?)
`);

const insertOption = db.prepare(`
    INSERT INTO options (poll_id, content)
    VALUES (?, ?)
`);

const insertVote = db.prepare(`
  INSERT INTO votes (poll_id, option_id, user_token)
  VALUES (?, ?, ?)
`);

const seed = db.transaction(() => {
    for (const poll of seedPolls) {
        const existingPoll = db.prepare("SELECT id FROM polls WHERE question = ?").get(poll.question) as
            | { id: number }
            | undefined;

        if (existingPoll) {
            console.log(`Skipped existing poll: ${poll.question}`);
            continue;
        }

        const pollResult = insertPoll.run(poll.question);
        const pollId = Number(pollResult.lastInsertRowid);

        const optionIds: number[] = [];

        for (const option of poll.options) {
            const optionResult = insertOption.run(pollId, option);
            optionIds.push(Number(optionResult.lastInsertRowid));
        }

        for (let i = 0; i < poll.voteCount; i++) {
            const randomOptionId = optionIds[Math.floor(Math.random() * optionIds.length)];

            insertVote.run(pollId, randomOptionId, `seed-user-${pollId}-${i + 1}`);
        }

        console.log(`Seeded poll: ${poll.question} with ${poll.options.length} options and ${poll.voteCount} votes`);
    }
});

seed();

console.log("Database seed complete.");

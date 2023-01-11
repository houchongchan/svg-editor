const { devices } = require("@playwright/test");

const config = {
	testDir: "./tests",
	outputDir: "./tests/artifacts",
	reporter: "line",
	timeout: 120000,
	retries: 3,
	workers: process.env.IS_CI ? 4 : 6,
	fullyParallel: true,
	expect: {
		toMatchSnapshot: {
			maxDiffPixels: 22600,
		},
	},
	projects: [
		{
			name: "blink",
			use: {
				...devices["Desktop Chrome"],
			},
		},
	],
	// Run server before starting tests
	webServer: {
		command: "npm start",
		port: 3000,
	},
};

module.exports = config;

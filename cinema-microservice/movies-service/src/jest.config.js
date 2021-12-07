module.exports = {
	clearMocks: true,

	collectCoverage: true,

	coverageDirectory: 'coverage',

	coveragePathIgnorePatterns: ['/node_modules/', 'logger.js'],

	coverageProvider: 'v8',

	coverageReporters: ['json', 'text', 'lcov', 'clover'],

	moduleDirectories: ['node_modules'],

	moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],

	// A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
	// moduleNameMapper: {},

	// An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
	// modulePathIgnorePatterns: [],

	rootDir: '.',

	// A list of paths to directories that Jest should use to search for files in
	// roots: [
	//   "<rootDir>"
	// ],

	// The paths to modules that run some code to configure or set up the testing environment before each test
	setupFiles: ['dotenv/config'],

	testEnvironment: 'node',

	testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],

	testPathIgnorePatterns: ['/node_modules/'],
};

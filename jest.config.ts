import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        },
    },
    maxWorkers: 1,
    projects: ['<rootDir>'],
    testEnvironment: "node",
    testMatch: ['**/__test__/**/*.[jt]s?(x)', '**/tess/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    testPathIgnorePatterns: ['/(?:production_)?node_modules/', '.d.ts$', 'const.ts'],
    transform: {
        '^.+\\.[jt]sx?$': 'ts-jest'
    },
    setupFilesAfterEnv: ['./jest.setup.ts'],
    slowTestThreshold: 30,
    reporters: [
        "default",
        [
            "jest-junit",
            {
                classNameTemplate: (vars: { classname: string; }) => vars.classname,
                titleTemplate: (vars: { title: string; }) => vars.title
            }
        ]
    ],
    verbose: true,
};

export default config;

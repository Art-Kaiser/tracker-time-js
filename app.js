#! /usr/bin/env node
const chokidar = require('chokidar');
const { program } = require('commander');
const fs = require("fs");
const TimeTracker = require('./src/TimeTracker');
require("./src/helpers");

program
    .command('watch <file>')
    .alias('w')
    .description('Watch for changes in a file')
    .action((file) => {
        if (!fs.existsSync(file)) throw new Error('file not found'.outputColor('red'));

        const tracker = new TimeTracker({});
        const watcher = chokidar.watch(file);

        watcher.on('change', (path) => tracker.watch(path));
        console.log('File monitoring:'.outputColor('cyan'), file);
    });

program
    .command('calc <file>')
    .alias('c')
    .description('Watch for changes in a file')
    .action((file) => {
            if (!fs.existsSync(file)) throw new Error('file not found'.outputColor('red'));

            const tracker = new TimeTracker({});
            tracker.calc(file);

            console.log('File statistics:'.outputColor('cyan'), file);
    });

program.parse(process.argv)
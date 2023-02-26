const fs = require('fs');
require("./helpers");

module.exports = class TimeTracker {
    #dayStatistic = {};
    #fileStatistics = {};

    constructor({ filePath, limitText = 50 }) {
        this.filePath = filePath;
        this.limitText = limitText;
    }

    printStatistics (data, message) {
        console.group('\n');
        console.group(
            `${message}:`.outputColor('gray'),
            `${this.#getAllTime(data)}h`.outputColor('white'),
            );
        console.table(data);
        console.groupEnd();
        console.groupEnd();
    }

    #makeComment (taskInfo) {
        const text = [...taskInfo].splice(3).join(" ");
        return `${taskInfo[0]}: ${text.length > this.limitText ? text.slice(0, this.limitText) + "..." : text}`;
    }

    #getDayList (data) {
        const dayList = [];
        for (const string of data.split('--')) {
            dayList.push(string.trim().split('\r\n'));
        }
        return dayList;
    }

    #getAllTime (data) {
        let time = 0;
        for (const project in data) {
            time += data[project].hours;
        }
        return time;
    }

    #projectName (name) {
        return name.replace('#', '').trim();
    }

    #clearDayStatistic () {
        this.#dayStatistic = {};
    }

    #calcStatisticsForLastDay (data) {
        let project = null;
        let comment = '-';

        for (const dayListElement of this.#getDayList(data).at(-1)) {
            if (dayListElement.includes('#')) {
                project = this.#projectName(dayListElement);
                comment = '-';
            } else {
                const taskInfo = dayListElement.split(' ');

                if (taskInfo.length > 1 && project) {
                    const { hours = 0, quantity = 0 } = this.#dayStatistic[project] || {};
                    const hour = !isNaN(taskInfo[2]) ? +taskInfo[2] : 0;

                    if (taskInfo[3]) comment = this.#makeComment(taskInfo);

                    this.#dayStatistic[project] = {
                        ...this.#dayStatistic[project],
                        hours: hours + hour,
                        quantity: quantity + 1,
                        comment,
                    }
                }
            }
        }
    }

    #calcFileStatistics (data) {
        for (const note of this.#getDayList(data)) {
            let project = null;
            for (const noteElement of note) {
                if (noteElement.includes('#')) project = this.#projectName(noteElement);

                const taskInfo = noteElement.split(' ');
                if (taskInfo.length > 1 && project) {
                    const { hours = 0, quantity = 0 } = this.#fileStatistics[project] || {};
                    const hour = !isNaN(taskInfo[2]) ? +taskInfo[2] : 0;

                    this.#fileStatistics = {
                        ...this.#fileStatistics,
                        [project]: {
                            ...this.#fileStatistics[project],
                            hours: hours + hour,
                            quantity: quantity + 1,
                        }
                    }
                }
            }
        }
    }

    /**
     * Метод watch(path) наблюдает за изменениями в последнем блоке файла и выводит статистику в консоль.
     * @param path - путь к файлу
     * */
    watch (path = this.filePath) {
        fs.readFile(path, {encoding: 'utf-8'}, (err, data) => {
            try {
                if (!err && data) {
                    this.#calcStatisticsForLastDay(data);
                    this.printStatistics(this.#dayStatistic, 'Total time per day');
                    this.#clearDayStatistic();
                } else {
                    this.#clearDayStatistic();
                    console.log(err);
                }
            } catch (err) {
                this.#clearDayStatistic();
                console.log(err);
            }
        });
    }

    /**
     * Метод calc(path) рассчитывает время и колличество закрытых задач на проектах
     * по всему файлу и выводит ввиде таблице в консоль.
     * @param path - путь к файлу
     * */
    calc (path = this.filePath) {
        fs.readFile(path, {encoding: 'utf-8'}, (err, data) => {
            try {
                if (!err && data) {
                    this.#calcFileStatistics(data);
                    this.printStatistics(this.#fileStatistics, "All the time");
                } else {
                    console.log(err);
                }
            } catch (err) {
                console.log(err);
            }
        });
    }
}
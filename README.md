drakemall-autotest
Requirements:

NodeJS 8.9.4 LTS
How to install:
cd autotests-drakemall
npm i
npm run selser_update //for update ChromeDriver

How to start test:
npm run test-start

## Mongo backup

```
mongodump --host dev.drakemall.testenv.io:27017 --db drakemall --out backups/`date +"%m-%d-%y"`
mongorestore  --host localhost:27017 --db drakemall --drop backups/02-13-18/drakemall/

```
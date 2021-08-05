#!/usr/bin/env node
'use strict';
const spawn = require('cross-spawn');
const program = require('commander');

process.on('unhandledRejection', err => {
   throw err;
 });

 const initAction = ()=> {
  const args = process.argv.slice(2);
  //  process.exit(1);
   
   const script = args.find(
     x => x === 'build' || x === 'dev'
   );
  
  if (['build', 'dev',].includes(script)) {
  
    spawn.sync(
      'node',
      [ require.resolve('../lib/' + script) ].concat(args.slice(args.findIndex(x=>x===script))),
      { stdio: 'inherit' }
    );

    } else {
      process.exit();
    }
 }


program.version(require('../package.json').version);
program.command('dev').description('开发').action(initAction)
program.command('build').description('构建').option('--analyzer', '开启分析器').action(initAction)
program.parse(process.argv)
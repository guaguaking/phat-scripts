#!/usr/bin/env node
'use strict';

process.on('unhandledRejection', err => {
   throw err;
 });
 
 const spawn = require('cross-spawn');
 const args = process.argv.slice(2);
//  process.exit(1);
 
 const script = args.find(
   x => x === 'build' || x === 'dev' || x === 'lint'
 );

if (['build', 'dev', 'lint',].includes(script)) {

  const result = spawn.sync(
    'node',
    [ require.resolve('../lib/' + script) ].concat(args.slice(args.findIndex(x=>x===script))),
    { stdio: 'inherit' }
  );
} else {
  console.log('找不到命令');
}
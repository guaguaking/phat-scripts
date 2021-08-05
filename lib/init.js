'use strict';

process.on('unhandledRejection', err => {
  throw err;
});

console.log('保留命令');

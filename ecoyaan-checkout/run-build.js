const { spawn } = require('child_process');
const fs = require('fs');

const child = spawn('npx', ['next', 'build'], {
  cwd: __dirname,
  shell: true,
  env: { ...process.env, FORCE_COLOR: '0', NO_COLOR: '1', NEXT_TELEMETRY_DISABLED: '1' }
});

let output = '';

child.stdout.on('data', (data) => {
  const clean = data.toString().replace(/[\x1b\x9b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
  output += clean;
});

child.stderr.on('data', (data) => {
  const clean = data.toString().replace(/[\x1b\x9b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
  output += '[STDERR] ' + clean;
});

child.on('close', (code) => {
  output += '\n\nEXIT_CODE: ' + code;
  fs.writeFileSync('build-full-log.txt', output, 'utf8');
  console.log('Build finished with code: ' + code);
  console.log('Full log saved to build-full-log.txt');
});

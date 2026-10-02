const { readFile } = require('node:fs/promises');
const path = require('node:path');

const files = {
  '/': ['index.html', 'text/html; charset=utf-8'],
  '/index.html': ['index.html', 'text/html; charset=utf-8'],
  '/styles.css': ['styles.css', 'text/css; charset=utf-8'],
  '/app.js': ['app.js', 'text/javascript; charset=utf-8']
};

module.exports = async (request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  const item = files[pathname];

  if (!item) {
    response.statusCode = 404;
    return response.end('Not found');
  }

  try {
    const [file, type] = item;
    const content = await readFile(path.join(process.cwd(), 'public', file));
    response.statusCode = 200;
    response.setHeader('Content-Type', type);
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.end(content);
  } catch {
    response.statusCode = 500;
    response.end('Unable to load page');
  }
};

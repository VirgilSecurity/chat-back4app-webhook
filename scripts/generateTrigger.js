const fs = require('fs');
const path = require('path');
const config = require('../config.json');

const paths = {
	src: path.resolve(__dirname, '../templates/createUserVirgilCard.tmpl'),
	dist: path.resolve(__dirname, '../cloud')
};

const template = fs.readFileSync(paths.src, 'utf8');
const main = replaceAll(template, config);

writeToDist(main, 'main.js');

console.log('\x1b[92m', '\n\n', 'Cloud Code Trigger generated.', '\x1b[0m');
console.log(
	'\n If you have Back4App cli installed, run',
	'\x1b[1m', 'b4a deploy', '\x1b[0m',
	'to add the trigger to your Back4App application.'
);
console.log(
	' Otherwise, upload the contents of the',
	'\x1b[4mcloud\x1b[0m',
	'folder to Back4App Cloud Code manually through dashboard.\n'
);

function replaceAll(content, replaces) {
	for (var key in replaces) if (replaces.hasOwnProperty(key)) {
		content = content.split('{{' + key + '}}').join('"' + replaces[key] + '"');
	}

	return content;
}

function writeToDist(data, filename) {
	if (!fs.existsSync(paths.dist)) {
		fs.mkdirSync(paths.dist);
	}

	fs.writeFileSync(path.join(paths.dist, filename), data);
}
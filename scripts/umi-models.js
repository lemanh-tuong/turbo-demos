const fs = require('fs-extra');

const sourceFolder = './packages/umi-models/src';
const destinationFolder = './apps/tcns/src/models';

fs.emptyDirSync(destinationFolder); // Clear the destination folder

fs.copy(sourceFolder, destinationFolder, (err) => {
	if (err) {
		console.error('Error copying files:', err);
	} else {
		console.log('Files copied successfully.');
	}
});

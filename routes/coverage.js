const express = require('express');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const uuid = require('uuid/v4');
const nyc = require('nyc');
const exec = require('child_process');
const nycPath = require.resolve('nyc/bin/nyc')
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('coverage', {title: 'Coverage'})
});

router.post('/', (req, res, next) => {
	// Grab contents of textarea
	const contents = req.body.jsFile;
	if (!contents) return res.status(400).send('Request must have javascript');

	const id = uuid();
	// Make temp directory
	mkdirp(path.resolve(process.cwd(), 'public/content', id), (err, dir) => {
		// If folder failed to get created send an error
		if (err != null) return res.status(500).send('Error making directory ' + err);
		
		// Create uuid for each request and write javascript in textarea to disk
		const jsFileName = path.resolve(__dirname, '../public/content',id)+'/index.js';
		fs.writeFileSync(jsFileName, contents, 'utf8');
		
		// Take contents and spawn nyc command
		const prevCWD = process.cwd();
		process.chdir(path.resolve(process.cwd(), 'public/content', id));
		const nycOutput = exec.spawnSync(process.execPath, [nycPath, '--reporter=html', 'node', jsFileName]);
		process.chdir(prevCWD);

		// Redirect to coverage output folder
		res.redirect(`/content/${id}/coverage`)
	});
});

// const a = () => console.log('This is A')
// const b = () => console.log('This is B')
// a();

module.exports = router;
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
		if (err != null) return res.status(400).send('Error making directory ' + err);
		
		// Create uuid for each request and write javascript in textarea to disk
		
		const jsFileName = path.resolve(__dirname, '../public/content',id, id)+'.js';
		fs.writeFileSync(jsFileName, contents, 'utf8');
		
		// TODO: REMOVE THIS AND REPLACE WITH BELOW.
			// Read contents of file and send it as response
			const file = fs.readFileSync(jsFileName, 'utf8');
			res.send(file)
		//

		// TODO: 
		// 1. Take contents and spawn nyc command

		// process.chdir(path.resolve(process.cwd(), 'public/content', id))
		// console.log(path.resolve(__dirname, '../node_modules/.bin/nyc'))
		// console.log(process.cwd())
		// const nycOutput = exec.spawnSync('nyc', ['--reporter=html', 'node', id+'.js']);
		// console.log(nycOutput)

		// console.log('NYC Path:', nycPath);
		// 2. Rename output of nyc from coverage to ${id}
		// 2. Move output of nyc to `public/coverages/${id}`
		// 3. res.redirect(`/public/coverages/${id}`)
	});
});

// const a = () => console.log('This is A')
// const b = () => console.log('This is B')
// a();

module.exports = router;
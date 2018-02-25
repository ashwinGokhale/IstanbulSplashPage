const express = require('express');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const uuid = require('uuid/v4');
const nyc = require('nyc');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('coverage', {title: 'Coverage'})
});

router.post('/', (req, res, next) => {
	// Grab contents of textarea
	const contents = req.body.jsFile;
	if (!contents) return res.status(400).send('Request must have javascript');

	// Make temp directory
	const err = mkdirp.sync(path.resolve(__dirname, 'temp'));
	if (err != null) return res.status(400).send('Error making directory ' + err);
	
	// Create uuid for each request and write javascript in textarea to disk
	const id = uuid();
	fs.writeFileSync(`${__dirname}/temp/${id}.js`, contents, 'utf8');
	
	// TODO: REMOVE THIS AND REPLACE WITH BELOW.
		// Read contents of file and send it as response
		const file = fs.readFileSync(`${__dirname}/temp/${id}.js`, 'utf8');
		res.send(file)
	//

	// TODO: 
	// 1. Take contents and spawn nyc command
	// 2. Rename output of nyc from coverage to ${id}
	// 2. Move output of nyc to `public/coverages/${id}`
	// 3. res.redirect(`/public/coverages/${id}`)
});

// const a = () => console.log('This is A')
// const b = () => console.log('This is B')
// a();

module.exports = router;
#!/usr/bin/env node
// I installed the trans command line tool and changed it - I disabled fribidi usage, it messed things by converting from logical to visual and this not used anymore in any editor

const fs = require('fs');
const { execSync } = require("child_process");

if(process.argv.length<3){
	console.error('USAGE: ./a.js moreEqualAnimals.01.txt > he01.txt');
	return;
}

const data = fs.readFileSync(process.argv[2], 'utf8');
const p = data.split('\r\n    ');
let pp = [p[0] ];
for(let i=1; i<p.length; i++){
	if(pp[pp.length-1].length + p[i].length<4800){
		pp[pp.length-1] += ' ' + p[i];
	}else{
		pp.push(p[i]);
	}
}
(async () => {
	for(let i=0; i<pp.length; i++){
		let he = execSync('trans -b en:he "' + pp[i].replace(/\r\n/g, '') + '"');
		console.log(he.toString());
		await new Promise(r => setTimeout(r, 4000));
	}
})();

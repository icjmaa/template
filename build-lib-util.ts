import { join, dirname, basename } from 'path';
import { copyFileSync, existsSync, readFileSync, renameSync, writeFileSync } from 'fs';
import { sync as removeSync }  from 'del' 
import { build } from 'ng-packagr';
import { homedir } from 'os';

async function main() {
	// let workdir = process.cwd();
	// let npm_cache_tmp_dir = dirname(workdir)
	// let id_git_clone = basename(workdir)
	// let new_id = "-" + Math.floor(Date.now() / 1000)
	// let valid_dir = workdir.indexOf( '_cacache/tmp' );
	// let new_folder = join(npm_cache_tmp_dir, id_git_clone) + new_id
	
	// let debug_file = join( homedir(), 'debug-script.txt') + "";
	// let data = JSON.stringify({ script: 'template', homedir: homedir(), workdir: workdir, valid_dir: valid_dir, new_folder: new_folder }, undefined, "\t")

	// writeFileSync( debug_file, data, { flag: 'a+' } )

	// if ( valid_dir != -1 ) {
	// 	removeSync( join( workdir, 'dist') );
	// 	// build package template
	await build({
		project: 'ng-package.json',
		config: 'tsconfig.lib.json'
	});
	// 	renameSync(
	// 		join(workdir, 'src/assets'),
	// 		join(workdir, 'dist/template/assets'),
	// 	);
	// 	renameSync( workdir, new_folder )
	// 	renameSync( join(new_folder, 'dist/template') , workdir )
	// 	removeSync( new_folder, { force: true } );
	// }else{
	// 	console.log("No es un directorio valido.");
	// }
}

main()
	.then(() => console.log('success'))
	.catch((e) => {
		console.error(e);
		process.exit(1);
	});

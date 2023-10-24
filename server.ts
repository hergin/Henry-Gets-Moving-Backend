/*
|--------------------------------------------------------------------------
| AdonisJs Server
|--------------------------------------------------------------------------
|
| The contents in this file is meant to bootstrap the AdonisJs application
| and start the HTTP server to accept incoming connections. You must avoid
| making this file dirty and instead make use of `lifecycle hooks` provided
| by AdonisJs service providers for custom code.
|
*/

import 'reflect-metadata'
import sourceMapSupport from 'source-map-support'
import { Ignitor } from '@adonisjs/core/build/standalone'
import { createServer } from "https";
import { readFileSync } from 'fs';

sourceMapSupport.install({ handleUncaughtExceptions: false })

new Ignitor(__dirname).httpServer().start((handle)=>{
  return createServer(
	    {
		    key:readFileSync("henrygetsmoving_community_bsu_edu.key","utf-8"),
		    cert:readFileSync("henrygetsmoving_community_bsu_edu_cert.cer","utf-8"),
	    },
	    handle
  );
})

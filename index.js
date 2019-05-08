import * as functions from 'firebase-functions';
import React from 'react';
import {renderToString} from 'react-dom/server';
import App from './src/App';

import getFacts from './src/facts';
import express from 'express';

const app = express();

app.get('**', (req, res) => {
	getFacts().then(facts => {
		const html = renderToString(<App facts={facts} />);
		res.set('Cache-Control', 'public., max-age=600, s-maxage=1200');
		res.send(html);
	})
});

export let ssrapp = functions.https.onRequest(app);
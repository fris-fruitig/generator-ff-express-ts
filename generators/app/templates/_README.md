# Server

Een express.js API server om bijvoorbeeld een Single Page App webclient te bedienen.

## Installeren met Yeoman

Installeer Yeoman
```
npm install -g yo
```

Installeer de `ff-express-ts` generator
```
npm install generator-ff-express-ts
```

Maak een nieuwe folder voor de server
```
mkdir server && cd server
```

Draai de `ff-express-ts` generator
```
yo ff-express-ts
```

## Getting started

Installeer alle dependencies.
```
npm install
```

Draai de server in development modus. In development modus wordt de server automatisch opnieuw gestart als je wijzigingen aanbrengt in de bestanden.
```
npm run dev
```

Standaard wordt er in development test data ingeladen in de database. Zo kan je direct beginnen met ontwikkelen. Je kan inloggen met user `test@test.com` en token `test`. Je logt dan in op een user die al wat data heeft. Als je de server herstart houd je dezelfde userID `test-user`, dus hoef je ook niet opnieuw in te loggen als je de database afsluit.

Draai de server in productie modus (zal je nauwelijks nodig hebben).
```
npm run build && npm start
```

## Nice to know

#### Express

De server is gebouwd met het [Express.js](https://expressjs.com) framework. We volgen ongeveer de bestandsstructuur zoals [hier](https://www.terlici.com/2014/08/25/best-practices-express-structure.html) en [hier](https://github.com/expressjs/express/tree/master/examples) aangegeven.

#### TypeScript

[TypeScript](https://github.com/Microsoft/TypeScript) voegt typing toe aan JavaScript. Het is een concurrent van [Flow](https://github.com/facebook/flow). Beide hebben we gebruikt en TypeScript is ons uiteindelijk toch een stukje beter bevallen. Het compileert uiteindelijk gewoon naar vanilla JavaScript.

Het voordeel is dat je code van hogere kwaliteit wordt en je productiever bent. Het is in het begin wennen, maar daarna zal je merken dat bijvoorbeeld je autocomplete van je IDE een stuk beter werkt omdat het met TypeScript de context veel beter snapt. Ook zul je veel minder vaak bugs krijgen als `cannot read property of undefined` omdat TypeScript je al heeft gewaarschuwd.

De code wordt met [TSLint](https://palantir.github.io/tslint/) eerst gecontroleerd, waarna je het compileert met TypeScript (in dit gebeurt dat geval via Webpack).

Dit wordt allemaal voor je geregeld met `npm run build`. Tijdens het ontwikkelen gebruiken we gewoon [ts-node](https://github.com/TypeStrong/ts-node) waarmee je direct .ts bestanden kan uitvoeren alsof het .js bestanden zijn. Dit wordt voor je geregeld met `npm run dev`.

TSLint stel je in met `tslint.config`. TypeScript stel je in met de verschillende `tsconfig.json` bestanden.

#### Jest, Supertest

Unit testen en integratie testen (en end-to-end testen) kan met [Jest](https://jestjs.io). We gebruiken in de implementatie van de testen vaak [supertest](https://github.com/visionmedia/supertest). Daarmee test je heel gemakkelijk of je API endpoint bij een bepaalde input de juiste output (HTTP status codes, body etc.) teruggeeft. Dan kan je ook al met meer zekerheid zeggen dat de implementatie achter de endpoint goed zit.

De configuratie van Jest gaat door middel van de `"jest"` sectie in de `package.json` file.

#### Nodemon

[Nodemon](https://github.com/remy/nodemon) is een handige tool om te gebruiken in development. Het houdt je bestanden in de gaten voor wijzigingen en herstart het node proces indien er wijzigingen zijn. Configureren kan met het bestand `nodemon.json`. Het commando `npm run dev` gebruikt nodemon, tijdens het ontwikkelen hoef je er dus verder niet meer over na te denken.

#### Webpack

[Webpack](https://webpack.js.org) is op zich niet nodig hier omdat de TypeScript compiler alles al omzet naar een serie JavaScript files die je zou kunnen uitvoeren. We gebruiken webpack om alle losse JavaScript bestandjes uiteindelijk samen te voegen in één groter `server.js` file. Hierdoor wordt `npm start` een stuk sneller. Dat is handig als er bij drukte op de applicatie extra servers aangezet worden, deze zijn dan sneller beschikbaar.

Webpack is een bundler. Het kan ontzettend veel en is erg interessant. In dit geval gebruiken we het alleen om TypeScript om te zetten naar JavaScript en het daarna samen te voegen in één bestand. Vooral op de client doet het een hoop meer.

#### Dotenv

[Dotenv](https://github.com/motdotla/dotenv) is een tool om de variabelen in je `.env` bestand in te laden in je `process.env` in Node. Hiermee kan je eenvoudig een lokale setup draaien. Het overschrijft nooit environment variabelen die al zijn ingesteld.

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

interface Promotion {
    code: string;
    dateExpiration: Date;
    description: string;
}

admin.initializeApp(functions.config().firebase);

//initialize express server
const app = express();
const main = express();

//add the path to receive request and set json as bodyParser to process the body
app.use(cors({origin: true}));
main.use(cors({origin: true}));
main.use('/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended: false}));

//initialize the database and the collection
const db = admin.firestore();
const userCollection = 'users';
const promoCollection = 'promotions';

//define google cloud function name
export const webServices = functions.region('europe-west1').https.onRequest(main);

app.get('/promotions/:promoId', (req, res) => {
    const promoId = req.params.promoId;
    db.collection(promoCollection).doc(promoId).get()
        .then(promo => {
            if (!promo.exists) {
                res.status(404).send('Promotion introuvable.');
            } else {
                res.status(200).json({
                    code: promo.data()?.code,
                    dateExpiration: promo.data()?.dateExpiration.toDate(),
                    description: promo.data()?.description
                });
            }
        })
        .catch(error => res.status(500).send(error));
});

app.post('/promotions', (req, res) => {
    const body = req.body;
    if (!body.hasOwnProperty('code') || !body.hasOwnProperty('dateExpiration') || !body.hasOwnProperty('description')) {
        return res.status(400).send('La requête doit contenir les valeurs suivantes : "code", "dateExpiration", "description"');
    }
    const dateExpiration = new Date(body.dateExpiration);
    if (isNaN(dateExpiration.getTime())) {  // d.valueOf() could also work
        return res.status(400).send('Argument "dateExpiration" erroné, ce n\'est pas un format de date valide.');
    }
    const promo: Promotion = {
        code: body.code,
        dateExpiration,
        description: body.description
    };
    return db.collection(promoCollection).doc(promo.code).get().then(doc => {
        if (doc.exists) {
            res.status(400).send('Cette promotion existe déjà.');
        } else {
            db.collection(promoCollection).doc(body.code).set(promo)
                .then(() => res.status(201).send(`Promotion crée avec succès : ${body.code}`))
                .catch(error => res.status(500).send(error));

        }
    }).catch(error => res.status(500).send(error));
});

app.delete('/promotions/:promoId', async (req, res) => {
    await db.collection(promoCollection).doc(req.params.promoId).delete();
    res.status(204).send({});
});

app.get('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    db.collection(userCollection).doc(userId).get()
        .then(user => {
            if (!user.exists) {
                res.status(404).send('Utilisateur introuvable.');
            }
            res.status(200).json({
                uid: user.id,
                name: user.data()?.name,
                firstname: user.data()?.firstname
            });
        }).catch(error => res.status(500).send(error));
});

app.get('/users/:userId/promotions', (req, res) => {
    const userId = req.params.userId;
    db.collection(userCollection).doc(userId).get()
        .then(user => {
            if (!user.exists) {
                res.status(404).send('Utilisateur introuvable.');
            }
            const promises = Object.keys(user.data()?.ownedPromos).map(promoId => db.collection(promoCollection).doc(promoId).get());
            Promise.all(promises).then(promosSnapshot => {
                const promotions: Promotion[] = [];
                promosSnapshot.forEach(promo => {
                    if (promo.exists) {
                        promotions.push({
                            code: promo.data()?.code,
                            dateExpiration: promo.data()?.dateExpiration.toDate(),
                            description: promo.data()?.description
                        });
                    }
                });
                res.status(200).json(promotions);
            }).catch(error => res.status(500).send(error));
        }).catch(error => res.status(500).send(error));
});

app.put('/users/:userId', async (req, res) => {
    const body = req.body;
    if (!body.hasOwnProperty('promo')) {
        res.status(418).send('La requête doit contenir la valeur suivante : "promo"');
    } else {
        db.collection(promoCollection).doc(body.promo).get().then(promo => {
            if (!promo.exists) {
                res.status(400).send('La promotion que vous réclamez n\'existe pas.');
            } else {
                const dateExpiration = promo.data()?.dateExpiration.toDate();
                const dateNow = new Date();
                if (dateNow > dateExpiration) {
                    res.status(418).send('La promotion que vous réclamez est expirée.');
                } else {
                    db.collection(userCollection).doc(req.params.userId).get().then(user => {
                        if (!user.exists) {
                            res.status(404).send('Utilisateur introuvable.');
                        } else {
                            const promos = Object.keys(user.data()?.ownedPromos);
                            if (promos.includes(body.promo)) {
                                res.status(418).send('Vous détenez déjà cette promotion.');
                            } else {
                                db.collection(userCollection).doc(req.params.userId).set({
                                    ownedPromos: {
                                        [body.promo]: {range: null, used: false}
                                    }
                                }, {merge: true})
                                    .then(() => res.json({id: req.params.userId}))
                                    .catch((error) => res.status(500).send(error));
                            }
                        }
                    }).catch(error => res.status(500).send(error));
                }
            }
        }).catch(error => res.status(500).send(error));
    }
});

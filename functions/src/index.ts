import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";

admin.initializeApp(functions.config().firebase);

//initialize express server
const app = express();
const main = express();

//add the path to receive request and set json as bodyParser to process the body
main.use('/api', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

//initialize the database and the collection
const db = admin.firestore();
const userCollection = 'users';
const promoCollection = 'promotions';

//define google cloud function name
export const webServices = functions.region('europe-west1').https.onRequest(main);

// https://europe-west1-mspr-gostyleapp.cloudfunctions.net/webServices/api/promotions/Extra10
app.get('/promotions/:promoId', (req,res) => {

    const promoId = req.params.promoId;
    db.collection(promoCollection).doc(promoId).get()
        .then(promo => {
            if(!promo.exists) throw new Error('Promotion introuvable.');
            res.status(200).json({
                id:promo.id,
                data:{
                    code: promo.data()?.code,
                    dateExpiration: promo.data()?.dateExpiration.toDate(),
                    description: promo.data()?.description
                }
            })
        })
        .catch(error => res.status(500).send(error));
});

// https://europe-west1-mspr-gostyleapp.cloudfunctions.net/webServices/api/users/goEdwr6nOpN0oyiAGWvs9vFWaSj1
app.get('/users/:userId', (req,res) => {
    const userId = req.params.userId;
    db.collection(userCollection).doc(userId).get()
        .then(user => {
            if(!user.exists) throw new Error('Utilisateur introuvable.');
            res.status(200).json({
                id:user.id,
                data: {
                    uid: user.id,
                    name: user.data()?.name,
                    firstname: user.data()?.firstname,
                }
            })
        }).catch(error => res.status(500).send(error));
});

// https://europe-west1-mspr-gostyleapp.cloudfunctions.net/webServices/api/users/goEdwr6nOpN0oyiAGWvs9vFWaSj1/promotions
app.get('/users/:userId/promotions', (req,res) => {
    const userId = req.params.userId;
    db.collection(userCollection).doc(userId).get()
        .then(user => {
            if(!user.exists) throw new Error('Utilisateur introuvable.');
            const promises = Object.keys(user.data()?.ownedPromos).map(promoId => db.collection(promoCollection).doc(promoId).get());
            Promise.all(promises).then(promosSnapshot => {
                const promotions: any[] = [];
                promosSnapshot.forEach(promo => {
                    if(promo.exists) {
                        promotions.push({
                            id:promo.id,
                            data:{
                                code: promo.data()?.code,
                                dateExpiration: promo.data()?.dateExpiration.toDate(),
                                description: promo.data()?.description
                            }
                        });
                    }
                });
                res.status(200).json(promotions);
            }).catch(error => res.status(500).send(error));
        }).catch(error => res.status(500).send(error));
});

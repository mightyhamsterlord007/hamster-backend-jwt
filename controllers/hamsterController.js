var Hamster = require('../models/Hamster');
var methods = require('../utils/methods');
const jwt = require('jsonwebtoken');


module.exports = {

    find: (params) => {
        return new Promise( (resolve, reject) => {
            Hamster.find(params)
                .then(hamsters => {
                    resolve(hamsters);
                })
                .catch(err => {
                    reject(err);
                })
        });  
    },
    create: (params) => {

        params.votes = methods.generateVoteCount();

        return new Promise( (resolve, reject) => {
            Hamster.create(params)
                .then(hamster => {

                    const payload = {
                        title: hamster.title,
                        id: hamster._id
                    }

                    jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 3600
                    }, (err, token) => {

                        if (err) {
                            reject(err);
                        } else {
                            let success = {};
                            success.confirmation = true;
                            success.token = `Bearer ${token}`;
                            resolve(success);
                        }
                    });
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    updateVoteCount: (id) => {
        return new Promise((resolve, reject) => {          
            Hamster.findById(id)
                .then(foundHamster => {

                    let currentHamsterVote = foundHamster.votes;

                    let hamsterVoteObject = {}

                    hamsterVoteObject.votes = currentHamsterVote += 1;
  
                    Hamster.findByIdAndUpdate(id, hamsterVoteObject, {new: true})
                    .then(hamster => {
                        resolve(hamster)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(id)
                    })

                })
                .catch(err => {
                    reject(err);
                })

        })

    }
}
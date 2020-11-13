import app from "firebase/app"
import "firebase/database"

const config = {
  apiKey: "AIzaSyDtmRbkXIiGdNy3RBF5tsCTMYykkMMduoY",
  authDomain: "pruebas-3cc6d.firebaseapp.com",
  databaseURL: "https://pruebas-3cc6d.firebaseio.com",
  projectId: "pruebas-3cc6d",
  storageBucket: "pruebas-3cc6d.appspot.com",
  messagingSenderId: "693053082630",
  appId: "1:693053082630:web:944f806f3db9230dd2c787",
  measurementId: "G-NBVQSP35FF",
}

class FirebaseClass {
  database: app.database.Database
  // database: any
  constructor() {
    app.initializeApp(config)
    this.database = app.database()
  }
}
const Firebase = new FirebaseClass()

export default Firebase

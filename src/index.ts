// npm i types/express
// npm i express
// npm i ejs
// npm i @types/express 
// npm i @types/node
// npm i -D typescript @types/express @types/node
import express, {Request, Response} from 'express'
const app = express()
app.set('view engine', 'ejs')
import queryString from 'node:querystring'

import bodyParser from 'body-parser'
app.use(bodyParser.urlencoded({extended: true}))

function verifyToken(token: string): boolean {
    if(token === "qwer") {
        return true
    }

    return false   
}

function verifyUserPassword(user: string, password: string): boolean {
    if(user == 'root' && password == '1234') {
        return true
    }
    return false
}

function genareteToken(user: string, password: string): string {
    if(user == 'root' && password == '1234') {
        return 'qwer'
    }
    return ''
}


// main function of login and auto login (redirect)
function login(method: 'GET' | 'POST',
                res: Response,
                url: string,
                queryObj: {token?:string, user?:string, password?:string}, 
                postObj: {token?:string, user?:string, password?:string}
                ) : boolean{

    let Obj: any;
    if(method === 'GET') {
        Obj = queryObj
    }
    else {
        Obj = postObj
    }

    
    if(!verifyToken(Obj.token!)) {
                
        if(verifyUserPassword(Obj.user!, Obj.password!)) {
            queryObj.token = genareteToken(Obj.user!, Obj.password!)

            delete Obj.user
            delete Obj.password

            const queryStr = queryString.stringify(queryObj)
            const urlWithQuery: string = url + (queryStr? '?'+queryStr: '')
     
            res.render('login_auto.ejs', {method: method, url: urlWithQuery, queryObj: queryObj, postObj: postObj})
            return false
        }
        else {
            delete Obj.user
            delete Obj.password

            const queryStr = queryString.stringify(queryObj)

            const urlWithQuery: string = url + (queryStr? '?'+queryStr: '')
            res.render('login.ejs', {method: method, url: urlWithQuery, queryObj: queryObj, postObj: postObj})
            return false
        }        
    }
    //token is Ok! render your page
    return true
}

app.get('/task', (req,res) => {
    if(login('GET', res, '/task', req.query, req.body)) {
        res.render('main.ejs', {queryObj: req.query,  postObj: req.body})
    }
})

app.post('/task', (req,res) => {
    if(login('POST', res, '/task', req.query, req.body)) {
        res.render('main.ejs', {queryObj: req.query,  postObj: req.body})
    }
})

app.get('/sendPost', (req:Request, res:Response) => {
    res.render('sendPost.ejs', {url: '/task'})
})

// app.get('/sendPut', (req,res) => {
//     res.render('sendPut.ejs', {url: '/mytask'})
// })

// app.put('/mytask', (req,res) => {
//     // if(login('PUT', res, '/mytask', req.query, req.body)) {
//         res.send('put')
//     // }
// })

app.listen(8000)


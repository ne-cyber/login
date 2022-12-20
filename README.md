# login
its just simple function that you call in your get/post method and its redirect with saving get/post params
for NodeJS express \
i have some problem with github, switch to master branche\
\
So in code:\
...\
app.get('/task', (req,res) => {\
    if(login('GET', res, '/task', req.query, req.body)) {\
        res.render('main.ejs', {queryObj: req.query,  postObj: req.body})\
    }\
})\
...\
login(...) returns true only if token is valid, and token will be valid if user&password is valid.\
first param in login is method GET or POST\
second param is res object, its need for rendering login.ejs page and login_auto.ejs\
third param is same first param in app.get() or app.post\
fourth and fifth param is query string object and post params\
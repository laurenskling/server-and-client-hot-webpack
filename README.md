# server-and-client-hot-webpack
Hot Module Replacement server bundle, that builds a universal/isomorphic/SSR React Hot frontend. 
Allowing you to develop Hot both frontend and backend at the same time.

# Todo:
* get rid of BUILD=true, how do we know the root folder, when webpack gets called from different folders?
* properly set the different Babel env's?
* use something different to Grunt. I use it now because we need both the webpack watch and nodemon as different node's, otherwise nodemon won't catch the HMR changes for some reason.

# inspired by:
http://jlongster.com/Backend-Apps-with-Webpack--Part-I

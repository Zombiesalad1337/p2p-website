# p2p-website
B.E. Minor Project 

A P2P Digital Warehouse for Video Games


Running: Requires a UNIX like OS like Linux or MacOS

1. clone the 'razorpay' branch of this repository.
2. cd p2p-website
3. create a .env file in current directory and add your mongodb uri and jwt secret to the two variables 'MONGOURI' and 'JWT_SECRET' respectively. Example:
MONGOURI=mongodb+srv://YourUsernameHere:h@p2pwebsitedb.i53pd.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=ksdfjskfksfjsdfksdfkjsfkskfksyklkllklesdflkslfljksdklfsdf134891941
4. run 'npm install'
5. cd into client
6. create another .env file and add to it:
REACT_APP_API_URL="http://localhost:5000/api"
7. run 'npm install' in the client directory
8. 'cd ..' to go back to root repo directory
9. run 'npm run dev' to start the frontend and backend servers
10. Access webpage at localhost:3000


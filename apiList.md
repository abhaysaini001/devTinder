#DEVTINDER APIs

## authRouter:
- POST /signUp
- POST /logIn
- POST /logOut

## profileRouter:
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password


## connectionsRequestRouter
- POST /request/send/:status/:userId

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

 ## userRouter
- GET /user/connections
- GET /user/request/ recieved
- GET /user/feed - gets you the profile of other users of the platforms

Status: ignore, interested, accepted, rejected 



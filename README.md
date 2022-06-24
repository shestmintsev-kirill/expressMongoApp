# Start backend app

#### Node version
v16.15.1

#### Project setup
```
yarn install
```
###### First terminal:
```

yarn watch
```
###### Second terminal:
```
yarn dev
```

## Backend API docs

##### Get element count in the DB
```
Method: 'GET'
Endpoint: '/count'
Response: { count: number }
```

##### Get user by name
```
Method: 'GET'
Endpoint: '/users/{userName}'
Response: {
	_id: string,
	name: string,
	age: number,
	posts: Array<{ title: string }>
}
```

##### Create user
```
Method: 'POST'
Endpoint: '/users'
Request payload: {
	name: string*,
	age: number,
	posts: Array<{ title: string }>
}
Response: {
	_id: string,
	name: string,
	age: number,
	posts: Array<{ title: string }>,
	status: string
}
```

##### Remove user by name
```
Method: 'DELETE'
Endpoint: '/users/{userName}'
Response: {
	status: string
}
```

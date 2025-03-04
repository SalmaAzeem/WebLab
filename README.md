## Developing a RESTful API for managing books using MongoDB and Express.js

### Installing the program
1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2. Install all Modules
    ```bash
    npm install
    ```
3. Install the dependencies:
    ```bash
    npm install mongoose express
    ```
4. Start the server:
    ```bash
    node server.js
    ```

### Technologies used
- Node.js
- Express.js
- MongoDB
- Mongoose
- Imported data from data.json into LabTaskDB database using MongoDB Compass.

### Postman output
1. Fetching Data Without Token

![Invalid Token](images/image-7.png)

1. Fetching all Books

![Fetching Books](images/image.png)

2. Fetching Book by ISBN

![Fetching Book by ISBN](images/image-1.png) 

3. Creating Book

![Create Book](images/image-2.png)

4. Updating Book

![Update Book](images/image-3.png)

5. Deleting Book

![Delete Book](images/image-4.png)

6. Returning Book

![Return Book](images/image-5.png)

7. Borrowing Book

![Borrow Book](images/image-6.png)

### Resources
- [Node.js MongoDB tutorial](https://www.w3schools.com/nodejs/nodejs_mongodb_find.asp)
- [Retrieve Data from MongoDB](https://www.geeksforgeeks.org/how-to-retrieve-data-from-mongodb-using-nodejs/)
- [How to create GET and POST endpoints in NodeJS using ExpressJS?](https://medium.com/@anshmunjal/how-to-create-get-and-post-endpoints-in-nodejs-using-expressjs-77fd3953ec38)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
